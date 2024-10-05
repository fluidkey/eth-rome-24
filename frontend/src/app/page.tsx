"use client";
import { FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useReadAaveUiPoolDataProviderGetReservesData, useReadAaveUiPoolDataProviderGetUserReservesData, useReadErc20BalanceOf } from "@/generated";
import { formatUnits } from "viem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Raleway } from "next/font/google";
import { usePrivy } from "@privy-io/react-auth";
import { useGetCustomerInfo, createNewCustomer, createOnrampTransfer } from "@/lib/api";
const raleway = Raleway({ subsets: ["latin"] });
import countries from "i18n-iso-countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type Stage = "getStarted" | "userInfo" | "tos" | "kyc" | "pending" | "approved"

export default function Home() {
  const [ethCollateral, setEthCollateral] = useState<string>();
  const [usdcBorrowed, setUsdcBorrowed] = useState<string>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [iban, setIban] = useState<string>('');
  const [bic, setBic] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('')
  const [privyAuthToken, setPrivyAuthToken] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("getStarted");
  const [instructions, setInstructions] = useState<any>();
  const { login, logout, user, getAccessToken } = usePrivy();
  const { data: customerInfoData, isLoading: customerInfoIsLoading, error: customerInfoError } = useGetCustomerInfo({
    privyAuthToken: privyAuthToken as string,
    refreshInterval: stage === "approved" ? 0 : 5000
  });
  const { data: userReservesData, refetch: refetchUserReservesData, error: userReservesError } = useReadAaveUiPoolDataProviderGetUserReservesData({
    args: ["0xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D",
      customerInfoData?.fluidLoanSafe ?? '0x78262B0C7f879be5F97a1138EFE1F60df3bd7d20'],
  });
  const { data: reservesData, refetch: refetchReservesData, error: reservesError } = useReadAaveUiPoolDataProviderGetReservesData({
    args: ["0xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D"]
  });
  const { data: erc20Data, refetch: refetchErc20Data } = useReadErc20BalanceOf({
    address: "0x59dca05b6c26dbd64b5381374aAaC5CD05644C28",
    args: [customerInfoData?.fluidLoanSafe ?? '0x78262B0C7f879be5F97a1138EFE1F60df3bd7d20'],
  });

  console.log(userReservesError, reservesError, userReservesData, reservesData)

  useEffect(() => {
    if (customerInfoData != null && user != null) {
      if (Object.keys(customerInfoData).length === 0) {
        setStage("userInfo")
      } else if (customerInfoData?.tosStatus === "pending") {
        setStage("tos");
      } else if (customerInfoData?.kycStatus === "not_started" || customerInfoData?.kycStatus === "incomplete") {
        setStage("kyc");
      } else if (customerInfoData?.kycStatus === "approved") {
        if (customerInfoData?.fluidLoanSafe != null) {
          setStage("approved");
        } else {
          setStage("pending");
        }
      }
    } else {
      setStage("getStarted")
    }
  }, [customerInfoData]);

  const countryObj = countries.getNames('en', { select: 'official' });
  const alpha3Codes = countries.getAlpha2Codes();
  const options = Object.keys(countryObj).map(alpha2Code => ({
    value: alpha3Codes[alpha2Code],
    label: countryObj[alpha2Code]
  }));

  const getToken = async () => {
    const token = await getAccessToken();
    setPrivyAuthToken(token);
  }

  console.log(user)
  useEffect(() => {
    getToken();
  }, [user])

  // Call the refetch functions every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchUserReservesData();
      refetchReservesData();
      refetchErc20Data();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });

  useEffect(() => {
    if (userReservesData && reservesData) {
      console.log(userReservesData);
      const unformattedEthCollateral = userReservesData[0].find(balance => balance.underlyingAsset === "0x4200000000000000000000000000000000000006")?.scaledATokenBalance ?? BigInt(0);
      const ethLiquidityIndex = reservesData[0].find(reserve => reserve.underlyingAsset === "0x4200000000000000000000000000000000000006")?.liquidityIndex ?? BigInt(0);
      const finalEthCollateral = unformattedEthCollateral * ethLiquidityIndex;
      const formattedEthCollateral = formatUnits(finalEthCollateral, 45);
      const finalFormattedEthCollateral = formatter.format(Number(formattedEthCollateral));
      setEthCollateral(finalFormattedEthCollateral);
      const formattedUsdcBorrowed = formatUnits(erc20Data ?? BigInt(0), 6);
      const finalFormattedUsdcBorrowed = formatter.format(Number(formattedUsdcBorrowed));
      setUsdcBorrowed(finalFormattedUsdcBorrowed);
    }
  }, [userReservesData, reservesData]);

  useEffect(() => {
    if (user?.farcaster?.username != null) {
      setUsername(user?.farcaster?.username)
    } else if (user?.email?.address != null) {
      setUsername(user?.email?.address)
      setEmail(user?.email?.address)
    } else if (user?.wallet?.address != null) {
      setUsername(user?.wallet?.address)
    } else if (user == null) {
      setUsername("")
    }
  }, [user])

  async function handleCreateNewCustomer() {
    setLoading(true);
    await createNewCustomer({firstName, lastName, email, type: "individual", bankName, iban, bic, country, privyAuthToken: privyAuthToken as string})
    setLoading(false);
  }

  async function handleCreateOnrampTransfer() {
    const instructions = await createOnrampTransfer({amount: parseFloat(usdcBorrowed as string), privyAuthToken: privyAuthToken as string})
    setInstructions(instructions)
    console.log(instructions)
  }

  console.log(stage)

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-4 sm:px-16">
      <div className="flex justify-between items-center w-full px-8 max-w-4xl">
        <h1 className={`text-2xl font-semibold ${raleway.className}`}>fluid.loan</h1>
        <div className="flex gap-6 items-center">
          <p>{username.length > 15 ? `${username.slice(0, 15)}...` : username}</p>
          <Button variant={user == null ? "default" : "outline"} className={user == null ? "bg-[#4D8A8F] hover:bg-[#84B9BD]" : ""} size="sm" onClick={() => {
            if (user) {
              logout(); 
            } else {
              login(); 
            }
          }}>{user != null ? 'Log out' : 'Get started →'}</Button>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center">
      {(stage === "getStarted" || stage === "approved") ?
        <div className="flex justify-center flex-wrap w-full mt-8 sm:mt-16 gap-4">
          <Card className="sm:min-w-[40%] sm:w-[40%] min-w-[70%] relative flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-4xl text-primary">💎 Hold ETH</CardTitle>
              <CardDescription>
                Keep the ETH upside and optimize taxable events.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-row justify-center gap-16 items-center mt-5">
              <div className="flex flex-col items-center">
                <p className="text-2xl sm:text-4xl text-primary">{ethCollateral} ETH</p>
                <p className="text-lg text-primary mb-8">deposited</p>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:min-w-[40%] sm:w-[40%] min-w-[70%] relative flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-4xl text-primary">💵 Spend Dollars</CardTitle>
              <CardDescription>
                Borrow USDC against your ETH to pay for your next
                vacation, car, or any other expense.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col justify-center items-center mt-5 h-max flex-grow">
              <p className="text-2xl sm:text-4xl text-primary">{usdcBorrowed} USDC</p>
              <p className="text-lg text-primary mb-8">borrowed</p>
            </CardContent>
          </Card>
        </div>
        : null}
        {stage === "userInfo" ?
        <div className="w-full max-w-lg mt-8 sm:mt-24 justify-center flex flex-col gap-4">
          <Input type="text" placeholder="First name" onChangeCapture={e => {setFirstName(e.currentTarget.value)}} />
          <Input type="text" placeholder="Last name" onChangeCapture={e => {setLastName(e.currentTarget.value)}} />
          {user?.email?.address != null ? null : <Input type="text" placeholder="Your email" onChangeCapture={e => {setEmail(e.currentTarget.value)}} />}
          <Input type="text" placeholder="Bank name" onChangeCapture={e => {setBankName(e.currentTarget.value)}} />
          <Input type="password" placeholder="IBAN" onChangeCapture={e => {setIban(e.currentTarget.value)}} />
          <Input type="text" placeholder="BIC (SWIFT code)" onChangeCapture={e => {setBic(e.currentTarget.value)}} />
          <Select onValueChange={(value) => setCountry(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => {void handleCreateNewCustomer()}} className="bg-[#4D8A8F] hover:bg-[#84B9BD]" disabled={loading}>{loading ? "Loading..." : "Create account →"}</Button>
        </div> 
        : null}
        {stage === "tos" ?
        <div className="w-full max-w-lg mt-8 sm:mt-24 justify-center flex flex-col gap-4">
          <iframe
            src={customerInfoData?.kycLinks?.tos}
            title="Bridge Terms of Service"
            width="100%"
            height="400px"
            style={{
              border: 'none',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          />
        </div>
        : null}
        {stage === "kyc" ?
          <iframe
            allow="camera;"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation"
            src={customerInfoData?.kycLinks?.kyc.replace('verify', 'widget') +
              `&iframe-origin=${encodeURIComponent(window.location.origin)}`}
            title="Bridge KYC"
            width="100%"
            height="700px"
            style={{
              border: 'none',
              borderRadius: '10px',
              overflow: 'hidden',
              }}
          />
        : null}
        {customerInfoData != null && customerInfoData?.fluidLoanSafe != null ? 
          <div className="w-full max-w-2xl mt-8 sm:mt-16 items-center flex flex-col">
            <p className="flex flex-wrap justify-center w-full max-w-4xl gap-2 items-center font-light text-muted-foreground text-lg">Deposit address</p>
            <p className="font-semibold text-primary ml-4 text-lg mt-1">base:{customerInfoData?.fluidLoanSafe}</p>
            {usdcBorrowed != null && parseFloat(usdcBorrowed) > 0 ? 
                <Accordion type="single" className="w-full mt-2 max-w-sm text-muted-foreground font-light" collapsible onValueChange={(value) => {
                  if (value) {
                    void handleCreateOnrampTransfer()
                  }
                }}>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-muted-foreground font-light">Repayment instructions</AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Amount</TableCell>
                          <TableCell className="text-right">{instructions?.source_deposit_instructions?.amount}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Currency</TableCell>
                          <TableCell className="text-right">EUR</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Reference</TableCell>
                          <TableCell className="text-right">{instructions?.source_deposit_instructions?.deposit_message}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Account Holder Name</TableCell>
                          <TableCell className="text-right">{instructions?.source_deposit_instructions?.account_holder_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">IBAN</TableCell>
                          <TableCell className="text-right">{instructions?.source_deposit_instructions?.iban}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">BIC (SWIFT code)</TableCell>
                          <TableCell className="text-right">{instructions?.source_deposit_instructions?.bic}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Bank Name</TableCell>
                          <TableCell className="text-right">{instructions?.source_deposit_instructions?.bank_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Bank Address</TableCell>
                          <TableCell className="text-right">{instructions?.source_deposit_instructions?.bank_address}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            : null}
          </div> 
        : null}
        {stage === "pending" ? <div className="w-full max-w-4xl mt-8 sm:mt-24"><p className="flex flex-wrap justify-center w-full max-w-4xl gap-2 items-center font-semibold">Getting your deposit address ready...</p></div> : null}
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center w-full mt-16 mb-4 sm:mt-24 gap-4 sm:gap-12 flex-wrap">
            <p className="text-2xl">✅ Zero clicks</p>
            <p className="text-2xl">✅ Self-custodial</p>
          </div>
          <p className="max-w-2xl mt-2 text-muted-foreground">The fluid.loan module automatically borrows USDC on your behalf when ETH is deposited and automatically repays your loan when USDC is sent. The deposit address is a self-custodial Safe smart account controlled by the account connected to this page.</p>
        </div>
      </div>
    </main>
  );
}

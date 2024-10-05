'use client'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => 
    fetch(...args).then(res => res.json())

export async function createNewCustomer({firstName, lastName, email, type, bankName, iban, bic, country, privyAuthToken}: {firstName: string, lastName: string, email: string, type: string, bankName: string, iban: string, bic: string, country: string, privyAuthToken: string}) {
    const response = await fetch(`https://kenk4pbulddvfu6sznpbtooo4y0qtrqv.lambda-url.eu-west-1.on.aws/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${privyAuthToken}`
        },
        body: JSON.stringify({ 
            fullName: `${firstName} ${lastName}`,
            email,
            type,
            offrampAccount:{
                firstName,
                lastName,
                bankName,
                ibanDetails: {
                    iban,
                    bic,
                    country
                }
            }
        })
    })
    return response.json()
}

export async function createOnrampTransfer({amount,privyAuthToken}: {amount: string, privyAuthToken: string}) {
    const response = await fetch(`https://r6mtlwmbxsdn53ygjrgg5owgeu0auhrz.lambda-url.eu-west-1.on.aws/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${privyAuthToken}`
        },
        body: JSON.stringify({ amount })
    })
    return response.json()
}
        
export function useGetCustomerInfo({privyAuthToken}: {privyAuthToken: string}) {
    const { data, error, isLoading } = useSWR(
        `https://sqvnnfjhgahnruj4adg5daxd3a0msibc.lambda-url.eu-west-1.on.aws/`,
        () => fetcher(`https://sqvnnfjhgahnruj4adg5daxd3a0msibc.lambda-url.eu-west-1.on.aws/`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${privyAuthToken}`
            }
        }),
        {
            refreshInterval: 3000,
        }
    )
    return {
        data,
        error,
        isLoading
    }
}


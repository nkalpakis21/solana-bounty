'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useClipboard } from 'use-clipboard-copy'
import { CheckIcon, CopyIcon, ExternalLinkIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PayPalLinkGenerator() {
  const [paypalName, setPaypalName] = useState("")
  const [amount, setAmount] = useState("5.00")
  const [currency, setCurrency] = useState("USD")
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)
  const clipboard = useClipboard()

  const handleGenerateLink = () => {
    if (paypalName) {
      const link = `https://paypal.me/${paypalName}/${amount}${currency}`
      setGeneratedLink(link)
    }
  }

  const handleCopyLink = () => {
    if (generatedLink) {
      clipboard.copy(generatedLink)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">PayPal Link Generator</CardTitle>
          <CardDescription className="text-blue-100">Create custom payment links in seconds</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paypal-name">Your PayPal.Me Name</Label>
              <Input
                id="paypal-name"
                placeholder="e.g. JohnDoe"
                value={paypalName}
                onChange={(e) => setPaypalName(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full"
                min="0.01"
                step="0.01"
              />
            </div>
            <div className="space-y-2 bg-white">
              <Label htmlFor="currency">Currency</Label>
              <Select onValueChange={(value) => setCurrency(value)} defaultValue={currency}>
                <SelectTrigger id="currency" className="w-full bg-white">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button 
            onClick={handleGenerateLink}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={!paypalName}
          >
            Generate Link
          </Button>
          {generatedLink && (
            <div className="w-full">
              <p className="text-sm font-medium text-gray-700 mb-2">Your PayPal.Me Link:</p>
              <div className="flex items-center gap-2">
                <Input type="text" value={generatedLink} readOnly className="flex-1" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleCopyLink} size="icon" variant="outline">
                        {clipboard.copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{clipboard.copied ? 'Copied!' : 'Copy to clipboard'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" asChild>
                        <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open link</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
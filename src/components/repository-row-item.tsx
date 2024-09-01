'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, GitFork, AlertCircle, Code, DollarSign } from 'lucide-react'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"

// Replace with your actual Client ID from PayPal
const PAYPAL_CLIENT_ID = "YOUR_PAYPAL_CLIENT_ID"

interface Repository {
  id?: number;
  name?: string;
  full_name?: string;
  description?: string | null;
  html_url?: string;
  stargazers_count?: number;
  open_issues_count?: number;
  forks_count?: number;
  language?: string | null;
  owner?: {
    login?: string;
    avatar_url?: string;
  };
  topics?: string[];
  license?: {
    name?: string;
  } | null;
}

interface RepositoryItemProps {
  repository: Repository;
}

export function RepositoryRowItem({ repository }: RepositoryItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState("5.00")
  const [currency, setCurrency] = useState("USD")

  if (!repository) {
    return <Card className="w-full p-4">No repository data available</Card>;
  }

  const {
    name = 'Unknown Repository',
    full_name = name,
    description,
    html_url = '#',
    stargazers_count = 0,
    open_issues_count = 0,
    forks_count = 0,
    language,
    owner,
    topics = [],
    license
  } = repository;

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleCurrencyChange = (value: string) => {
    setCurrency(value)
  }

  return (
    <Card className="w-full hover:shadow-lg hover:shadow-indigo-200 transition-shadow duration-300 ease-in-out rounded-sm">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            {owner && owner.avatar_url ? (
              <AvatarImage src={owner.avatar_url} alt={owner.login || 'Repository owner'} />
            ) : (
              <AvatarFallback>{(owner?.login || name)[0].toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <CardTitle className="text-lg font-bold">
              <a href={html_url} className="hover:underline" target="_blank" rel="noopener noreferrer">
                {full_name}
              </a>
            </CardTitle>
            {language && (
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <Code className="w-4 h-4 mr-1" />
                {language}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center text-sm text-muted-foreground hover:text-yellow-600 p-2 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            <span>{stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground ml-4 hover:text-gray-900 transition-transform duration-200 ease-in-out transform hover:scale-105">
            <GitFork className="w-4 h-4 mr-1 text-gray-900" />
            <span>{forks_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground ml-4 hover:text-red-500 transition-transform duration-200 ease-in-out transform hover:scale-105">
            <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
            <span>{open_issues_count.toLocaleString()} issues</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {description || 'No description provided.'}
        </p>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Badge key={topic} variant="secondary" className="px-2 py-1 text-xs bg-primary/10 text-primary">
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center py-4 bg-gray-50 rounded-b-lg">
        {license && license.name && (
          <Badge variant="outline" className="text-xs px-2 py-1 rounded-lg bg-white border-gray-300">
            {license.name}
          </Badge>
        )}
        <Button onClick={handleOpenModal} className="ml-auto bg-blue-500 hover:bg-blue-600 text-white">
          <DollarSign className="w-4 h-4 mr-2" />
          Donate
        </Button>
      </CardFooter>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Donate to {full_name}</DialogTitle>
            <DialogDescription>
              Support this project by making a donation via PayPal.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="col-span-3"
                min="0.01"
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency" className="text-right">
                Currency
              </Label>
              <Select onValueChange={handleCurrencyChange} defaultValue={currency}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount,
                        currency_code: currency
                      },
                      description: `Donation to ${full_name}`
                    },
                  ],
                })
              }}
              onApprove={(data, actions) => {
                return actions.order!.capture().then((details) => {
                  const name = details.payer.name!.given_name
                  alert(`Thank you, ${name}! Your donation to ${full_name} was successful.`)
                  handleCloseModal()
                })
              }}
            />
          </PayPalScriptProvider>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
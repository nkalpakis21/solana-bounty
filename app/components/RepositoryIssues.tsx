'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitHubLogoIcon, MagnifyingGlassIcon, StarIcon } from '@radix-ui/react-icons'
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { Repository } from 'app/types/github/types'
import { Issue } from 'app/types/types'

interface RepositoryIssuesProps {
  repo?: Repository;
  issues?: Issue[];
}

export default function RepositoryIssues({ repo, issues }: RepositoryIssuesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [donationAmounts, setDonationAmounts] = useState<{[key: number]: string}>({})
  const issuesPerPage = 10
  const router = useRouter()

  const handleDonate = async (repositoryFullName='', issueNumber: number) => {
    try {
      const amount = parseFloat(donationAmounts[issueNumber] || '5')
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Invalid donation amount')
      }

      // Convert the dollar amount to cents
      const amountInCents = Math.round(amount * 100)

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repositoryFullName, issueNumber, amountInCents }),
      });

      if (!response.ok) {
        console.error(repositoryFullName);
        console.error(issueNumber)
        throw new Error('Failed to create donation session');
      }

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error(error);
      alert('Failed to initiate donation process. Please ensure you entered a valid amount.');
    }
  };

  const handleDonationAmountChange = (issueNumber: number, amount: string) => {
    // Allow only numbers and one decimal point
    const sanitizedAmount = amount.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setDonationAmounts(prev => ({...prev, [issueNumber]: sanitizedAmount}))
  }

  if (!repo || !issues) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
        </Card>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastIssue = currentPage * issuesPerPage
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue)

  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-bold flex items-center">
              <GitHubLogoIcon className="w-6 h-6 mr-2" />
              {repo.full_name}
            </CardTitle>
            <CardDescription>{repo.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{repo.stargazers_count?.toLocaleString()}</span>
            </div>
            <Badge variant="outline">{repo.language}</Badge>
          </div>
        </CardHeader>
      </Card>
      <div className="mb-6 flex sm:flex-row gap-4 items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-semibold">Open Issues ({repo.open_issues_count})</h2>
        <div className="relative w-full sm:w-auto">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentIssues.map((issue) => (
          <Card key={issue.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">
                <a href={issue.html_url} className="hover:underline flex items-center">
                  #{issue.number} {issue.title}
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </CardTitle>
              <CardDescription>
                Opened on {new Date(issue.created_at).toLocaleDateString()} by {issue.user.login}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                {issue.labels.map((label) => (
                  <Badge key={label.id} style={{backgroundColor: `#${label.color}`}}>
                    {label.name}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Donations</span>
                  <span className="font-semibold text-green-600">${issue.donationAmount?.toFixed(2) || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Donators</span>
                  <span className="text-sm">{issue.donatorCount || 0}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-stretch space-x-2">
                <div className="relative flex-grow-0 flex items-stretch">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">$</span>
                  <Input
                    type="text"
                    inputMode="decimal"
                    placeholder="5.00"
                    value={donationAmounts[issue.number] || '5'}
                    onChange={(e) => handleDonationAmountChange(issue.number, e.target.value)}
                    className="pl-7 w-28 h-full"
                  />
                </div>
                <Button
                  onClick={() => handleDonate(repo.full_name, issue.number)}
                  className="bg-green-500 hover:bg-green-600 text-white flex-grow"
                  disabled={parseFloat(donationAmounts[issue.number] || '5') <= 0}
                >
                  Donate
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center space-x-2">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
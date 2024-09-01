'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GitHubLogoIcon, MagnifyingGlassIcon, StarIcon } from '@radix-ui/react-icons'
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import PayPalLinkGenerator from './PaypalLinkGenerator'

// Replace with your actual Client ID from PayPal
const PAYPAL_CLIENT_ID = "AT42DBUEBrktRK6_BvTo_Sltbct_3Hx0wyz3GtpNueZY5P89TWULO1J6t81XYVqyMPyaQdd0YOHZyzYg"

// Define types locally
interface User {
  login: string;
  avatar_url: string;
}

interface Label {
  id: number;
  name: string;
  color: string;
}

interface Issue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  user: User;
  created_at: string;
  labels: Label[];
  comments: number;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  open_issues_count: number;
}

interface RepositoryIssuesProps {
  repo?: Repository;
  issues?: Issue[];
}

export default function RepositoryIssues({ repo, issues }: RepositoryIssuesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState("5.00")
  const [currency, setCurrency] = useState("USD")
  const issuesPerPage = 10

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

  // Filter issues based on search term
  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Paginate issues
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
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>
            <Badge variant="outline">{repo.language}</Badge>
          </div>
        </CardHeader>
      </Card>
      <PayPalLinkGenerator/>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
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

      <div className="space-y-4">
        {currentIssues.map((issue) => (
          <Card key={issue.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                <a href={issue.html_url} className="hover:underline">#{issue.number} {issue.title}</a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={issue.user.avatar_url} alt={issue.user.login} />
                  <AvatarFallback>{issue.user.login[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-500">
                  Opened on {new Date(issue.created_at).toLocaleDateString()} by {issue.user.login}
                </span>
              </div>
              <div className="mt-2 space-x-2">
                {issue.labels.map((label) => (
                  <Badge key={label.id} style={{backgroundColor: `#${label.color}`}}>
                    {label.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-gray-500">{issue.comments} comments</span>
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
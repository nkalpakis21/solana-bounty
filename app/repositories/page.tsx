'use client'

import React, { useEffect, useState } from 'react'
import useGithubRepositories from '../hooks/useGithubRepositories'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import RepositoryRowItem from 'app/components/RespositoryRowItem'
import SearchBar from 'app/components/SearchBar'

export default function RepositoryList() {
  const [searchTerm, setSearchTerm] = useState('react')
  const [page, setPage] = useState(1)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

  useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm)
        setPage(1)
    }, 1000) // 1000ms debounce time
    return () => {
        clearTimeout(handler)
    }
  }, [searchTerm])

  const queryTerm = searchTerm.trim() === '' ? 'all' : debouncedSearchTerm
  const { repositories, totalCount, isLoading, isError } = useGithubRepositories(queryTerm, page)

  const perPage = 30
  const totalPages = Math.ceil((totalCount || 0) / perPage)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPage(1)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-sm my-4">
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-4">Top Open Source Repositories</CardTitle>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}/>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Error loading repositories</p>
        ) : (
          <ul className="space-y-6">
            {repositories?.map(repo => (
              <RepositoryRowItem key={repo.id} repository={repo} />
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1 || isLoading}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages || isLoading}
          variant="outline"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}
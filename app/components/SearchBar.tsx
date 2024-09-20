'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const suggestions = [
  { text: "AI tools", color: "bg-blue-100 hover:bg-blue-200 text-blue-800" },
  { text: "Web3", color: "bg-purple-100 hover:bg-purple-200 text-purple-800" },
  { text: "Node.js", color: "bg-green-100 hover:bg-green-200 text-green-800" },
  { text: "ML guides", color: "bg-red-100 hover:bg-red-200 text-red-800" },
  { text: "Full-stack", color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800" },
  { text: "DevOps", color: "bg-indigo-100 hover:bg-indigo-200 text-indigo-800" },
  { text: "Data viz", color: "bg-pink-100 hover:bg-pink-200 text-pink-800" },
  { text: "Mobile dev", color: "bg-teal-100 hover:bg-teal-200 text-teal-800" }
]

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }: SearchBarProps) {
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-0 mx-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 transition-transform duration-300 ease-in-out hover:text-primary" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search repositories..."
            className="pl-8 pr-24 py-2 w-full border-b-2 rounded-md border-input focus:border-primary focus:outline-none transition-all duration-300"
          />
          <Button 
            type="submit" 
            variant="link"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:no-underline hover:text-primary hover:scale-105 focus:outline-none"
          >
            Search
          </Button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleSuggestionClick(suggestion.text)}
            className={`rounded-full transition-colors duration-300 ${suggestion.color}`}
          >
            {suggestion.text}
          </Button>
        ))}
      </div>
    </div>
  )
}
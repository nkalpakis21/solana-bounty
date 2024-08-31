import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }: SearchBarProps) {
  return (
    <form onSubmit={onSearch} className="relative">
      <div className="relative">
        <Search className="absolute left-0 mx-2 top-1/2 transform -translate-y-1/2 text-indigo-800 w-4 h-4 transition-transform duration-300 ease-in-out hover:text-primary" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search repositories..."
          className="pl-8 pr-24 py-2 w-full border-b-2 rounded-md border-gray-300 focus:border-primary focus:outline-none transition-all duration-300"
        />
        <Button 
            type="submit" 
            variant="link"
            className="text-indigo-800 absolute right-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:no-underline hover:text-primary-dark hover:scale-105 focus:outline-none"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
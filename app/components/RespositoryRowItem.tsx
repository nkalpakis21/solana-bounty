import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, GitFork, AlertCircle, Code } from 'lucide-react'

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

export default function RepositoryRowItem({ repository }: RepositoryItemProps) {
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
              <a href={`/repositories/${full_name}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
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
      </CardFooter>

    </Card>
  )
}
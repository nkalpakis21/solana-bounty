import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, GitFork, AlertCircle, Code, ExternalLink } from 'lucide-react'

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
  onDonate: (repositoryFullName: string, issueNumber: number) => Promise<void>;
}

export default function RepositoryRowItem({ repository, onDonate }: RepositoryItemProps) {
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

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg focus-within:shadow-lg hover:scale-105 focus-within:scale-105 group">
      <a href={`/discover/${full_name}`} className="block outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg">
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
              <CardTitle className="text-lg font-bold flex items-center text-blue-600">
                {full_name}
                <ExternalLink className="w-4 h-4 ml-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
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
            <div className="flex items-center text-sm text-muted-foreground hover:text-yellow-600 p-2 rounded-lg transition-colors duration-200 ease-in-out">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              <span>{formatNumber(stargazers_count)}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground hover:text-gray-900 p-2 rounded-lg transition-colors duration-200 ease-in-out">
              <GitFork className="w-4 h-4 mr-1 text-gray-900" />
              <span>{formatNumber(forks_count)}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground hover:text-red-500 p-2 rounded-lg transition-colors duration-200 ease-in-out">
              <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
              <span>{formatNumber(open_issues_count)} issues</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {description || 'No description provided.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Badge key={topic} variant="secondary" className="px-2 py-1 text-xs bg-blue-50 text-blue-600 sm:bg-transparent sm:group-hover:bg-blue-50 transition-colors">
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
      </a>
    </Card>
  )
}
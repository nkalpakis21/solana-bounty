import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, GitFork, AlertCircle, Code, ExternalLink, Users, Trophy } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Repository } from 'app/types/github/types'

interface RepositoryItemProps {
  repository: Repository;
  // onDonate: (repositoryFullName: string, issueNumber: number) => Promise<void>;
}

export default function RepositoryRowItem({ repository }: RepositoryItemProps) {
  const [activeIndex, setActiveIndex] = useState(0);

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
    license,
    contributors = []
  } = repository;

  const formatNumber = (num: number) => num.toLocaleString();


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg focus-within:shadow-lg hover:scale-105 focus-within:scale-105 group">
      <Link href={`/discover/${full_name}`} className="block outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg">
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
          <div className="flex flex-wrap gap-2 mb-4">
            {topics.map((topic) => (
              <Badge key={topic} variant="secondary" className="px-2 py-1 text-xs bg-blue-50 text-blue-600 sm:bg-transparent sm:group-hover:bg-blue-50 transition-colors">
                {topic}
              </Badge>
            ))}
          </div>
          {contributors.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Top Devs 🚀
            </h4>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 h-64 hidden md:block">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contributors.slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="contributions"
                      onMouseEnter={onPieEnter}
                    >
                      {contributors.slice(0, 5).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2">
                {contributors.slice(0, 5).map((contributor, index) => (
                  <div key={contributor.login} className={`flex items-center space-x-2 p-2 ${index === activeIndex ? 'bg-gray-100 rounded' : ''}`}>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <Link href={contributor.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:underline">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contributor.avatar_url} alt={contributor.login} />
                        <AvatarFallback>{contributor.login[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="flex-grow">{contributor.login}</span>
                    </Link>
                    <span>{contributor.contributions} contributions</span>
                    {getRankBadge(index)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </CardContent>
        <CardFooter className="flex justify-between items-center py-4 bg-gray-50 rounded-b-lg">
          {license && license.name && (
            <Badge variant="outline" className="text-xs px-2 py-1 rounded-lg bg-white border-gray-300">
              {license.name}
            </Badge>
          )}
        </CardFooter>
      </Link>
    </Card>
  )
}
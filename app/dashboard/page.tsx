'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGitHubUser } from "app/hooks/useGithubUser"
import { DollarSign, GitBranch, GitCommit, GitPullRequest, Star, Users, Calendar, MapPin, Building, ExternalLink } from "lucide-react"
import PayPalLinkGenerator from "app/components/PaypalLinkGenerator"

export default function DashboardPage() {
  const { userData, loading, error } = useGitHubUser()
  const [activeTab, setActiveTab] = useState('overview')

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">Error: {error}</div>
  }

  const { user, events } = userData

  const contributionData = [
    { label: 'Commits', value: 75, color: 'bg-blue-500' },
    { label: 'Pull Requests', value: 40, color: 'bg-purple-500' },
    { label: 'Issues', value: 60, color: 'bg-green-500' },
  ]

  // Mock earnings data
  const earningsData = {
    totalEarned: 0,
    projectsContributed: 0,
    averageEarningPerProject: 0,
    recentEarnings: [
      { project: 'react', amount: 0, date: '2023-07-15' },
      { project: 'vue', amount: 0, date: '2023-07-10' },
      { project: 'angular', amount: 0, date: '2023-07-05' },
      { project: 'svelte', amount: 0, date: '2023-06-30' },
    ]
  }
  return (
    <div className="container mx-auto p-6 space-y-6 min-h-screen">
      <Card className="w-full backdrop-blur-lg bg-white/50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32 border-4 border-gray-100">
              <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
              <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{user.name || user.login}</h1>
              <p className="text-xl text-gray-600">{user.login}</p>
              <p className="text-lg text-gray-700">{user.bio || ""}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                {user.company && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <Building className="w-4 h-4" />
                    <span>{user.company}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild className="bg-black hover:bg-gray-800 text-white flex">
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { title: 'Repos', value: user.public_repos, icon: GitBranch },
          { title: 'Followers', value: user.followers, icon: Users },
          { title: 'Following', value: user.following, icon: Users },
          { title: 'Gists', value: user.public_gists, icon: Star },
        ].map((item, index) => (
          <Card key={index} className="backdrop-blur-lg bg-white/50 border-0 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
              <item.icon className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white/50 backdrop-blur-lg p-1 rounded-lg shadow-md">
          {['overview', 'activity', 'earnings', 'donate'].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="backdrop-blur-lg bg-white/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Contribution Overview</CardTitle>
              <CardDescription className="text-gray-600">Your open-source impact this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {contributionData.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                        <span className="font-medium text-gray-700">{item.label}</span>
                      </div>
                      <span className="font-bold text-gray-900">{item.value}</span>
                    </div>
                    <Progress value={item.value} className={`h-2 ${item.color}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card className="backdrop-blur-lg bg-white/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600">Your latest GitHub events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {events.map((event: any) => (
                  <div key={event.id} className="flex items-start gap-4">
                    <div className="mt-1">
                      {event.type === "PushEvent" && <GitCommit className="w-5 h-5 text-blue-500" />}
                      {event.type === "PullRequestEvent" && <GitPullRequest className="w-5 h-5 text-purple-500" />}
                      {event.type === "IssuesEvent" && <GitBranch className="w-5 h-5 text-green-500" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-gray-900">{event.type} on {event.repo.name}</p>
                      <p className="text-xs text-gray-600">
                        {event.payload.commits?.[0]?.message || "No commit message"}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(event.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="earnings" className="space-y-4">
          <Card className="backdrop-blur-lg bg-white/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Earnings Overview</CardTitle>
              <CardDescription className="text-gray-600">Your open-source contribution earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="text-sm text-green-600 mb-1">Total Earned</p>
                  <p className="text-2xl font-bold text-green-700">${earningsData.totalEarned}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 mb-1">Projects Contributed</p>
                  <p className="text-2xl font-bold text-blue-700">{earningsData.projectsContributed}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 mb-1">Avg. Earning/Project</p>
                  <p className="text-2xl font-bold text-purple-700">${earningsData.averageEarningPerProject.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Earnings</h3>
                <div className="space-y-4">
                  {earningsData.recentEarnings.map((earning, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-900">{earning.project}</p>
                          <p className="text-sm text-gray-500">{new Date(earning.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">${earning.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="donate">
          <PayPalLinkGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGitHubUser } from "app/hooks/useGithubUser"
import { GitBranch, GitCommit, GitPullRequest, Star, Users } from "lucide-react"

// Mock data to simulate the response from useGitHubUser hook
const mockUserData = {
  user: {
    login: "nkalpakis21",
    id: 46637702,
    avatar_url: "https://avatars.githubusercontent.com/u/46637702?v=4",
    html_url: "https://github.com/nkalpakis21",
    name: "Nick Kalpakis",
    company: "Sune",
    location: "New York, NY",
    email: null,
    bio: "Software Engineer passionate about open source",
    public_repos: 21,
    public_gists: 0,
    followers: 2,
    following: 1,
    created_at: "2019-01-13T01:05:27Z",
    updated_at: "2024-08-30T23:35:10Z",
  },
  events: [
    {
      id: "41525642343",
      type: "PushEvent",
      actor: {
        id: 46637702,
        login: "nkalpakis21",
        avatar_url: "https://avatars.githubusercontent.com/u/46637702?"
      },
      repo: {
        id: 850133181,
        name: "nkalpakis21/solana-bounty",
        url: "https://api.github.com/repos/nkalpakis21/solana-bounty"
      },
      payload: {
        commits: [
          {
            message: "Add github oauth login.",
          }
        ]
      },
      created_at: "2024-09-01T16:00:38Z"
    },
    // Add more mock events here for demonstration
  ]
}

export default function DashboardPage() {

  const { userData, loading, error } = useGitHubUser();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">Error: {error}</div>
  }

  const { user, events } = userData

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
              <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name || user.login}</CardTitle>
              <CardDescription>{user.bio || "No bio available"}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{user.followers} followers</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{user.following} following</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>{user.public_repos} repositories</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                <span>{user.public_gists} gists</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Member since {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <Button className="w-full mt-4" asChild>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a>
            </Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest GitHub events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
            {/* TODO add type to event */}
              {events.map((event :any) => (
                <div key={event.id} className="flex items-center gap-4">
                  {event.type === "PushEvent" && <GitCommit className="w-6 h-6 text-green-500" />}
                  {event.type === "PullRequestEvent" && <GitPullRequest className="w-6 h-6 text-blue-500" />}
                  {event.type === "IssuesEvent" && <GitBranch className="w-6 h-6 text-yellow-500" />}
                  <div className="flex-1">
                    <p className="font-medium">{event.type} on {event.repo.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.payload.commits?.[0]?.message || "No commit message"}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(event.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Contribution Overview</CardTitle>
            <CardDescription>Your open-source impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2">Commits</h3>
                <Progress value={75} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">75 commits this month</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Pull Requests</h3>
                <Progress value={40} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">8 PRs opened this month</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Issues</h3>
                <Progress value={60} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">12 issues resolved this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
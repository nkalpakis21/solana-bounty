'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from 'lucide-react'

export default function AppLoginPage() {
  const handleLogin = () => {
    // Replace with your GitHub OAuth App's client ID and redirect URI
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || ''
    const redirectUri = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL
    : 'http://localhost:3000/api/auth/callback';
    const scope = 'read:user user:email'
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
    
    window.location.href = githubAuthUrl
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogin} className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Login with GitHub
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account? Sign up on GitHub
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
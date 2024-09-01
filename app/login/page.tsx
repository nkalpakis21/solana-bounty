'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function AppLoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || ''
    const redirectUri = process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL
      : 'http://localhost:3000/api/auth/callback';
    const scope = 'read:user user:email'
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
    
    window.location.href = githubAuthUrl
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white">
      <Card className="w-[360px] shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <CardHeader className="text-center pt-8 pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className='text-6xl'>
              🌟
            </div>
            {/* <div className="relative w-20 h-20">
              <Image 
                src="/placeholder.svg?height=80&width=80" 
                alt="Logo" 
                layout="fill" 
                className="rounded-full border-4 border-white shadow-md"
              />
            </div> */}
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-800">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600">Sign in to your account using GitHub</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-6">
          <Button 
            onClick={handleLogin} 
            className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-4 text-lg font-medium flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Github className="mr-2 h-6 w-6" />
                <span>Login with GitHub</span>
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="px-4 pb-6 flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">
            By signing in, you agree to our 
            <br />
            <a href="#" className="font-medium text-blue-600 hover:underline">Terms of Service</a> and 
            <a href="#" className="font-medium text-blue-600 hover:underline">Privacy Policy</a>
          </p>
          <p className="text-sm text-gray-500">
            Don’t have a GitHub account?{' '}
            <a href="https://github.com/join" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

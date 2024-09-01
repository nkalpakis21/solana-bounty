import React from 'react'
import Link from 'next/link'
import { ArrowRight, Code, Coins, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white">
      <main className="container mx-auto px-6 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
            Dev Incentive Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-200 animate-fade-in-up animation-delay-200">
            Contribute to open-source projects and earn rewards!
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-400">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8 animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="w-full sm:w-auto bg-white text-indigo-800 px-3 hover:bg-indigo-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
              <Link href="/dashboard" className="flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {/* <Button asChild size="lg" className="w-full sm:w-auto bg-white text-indigo-800 px-3 hover:bg-indigo-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
              <Link href="/about" className="flex items-center justify-center">
                Learn More
              </Link>
            </Button> */}
          </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            icon={<Code className="h-12 w-12 text-indigo-400" />}
            title="Contribute Code"
            description="Work on exciting open-source projects and make a real impact."
          />
          <FeatureCard
            icon={<Coins className="h-12 w-12 text-indigo-400" />}
            title="Earn Rewards"
            description="Get compensated for your contributions with cryptocurrency rewards."
          />
          <FeatureCard
            icon={<Github className="h-12 w-12 text-indigo-400" />}
            title="Build Your Portfolio"
            description="Showcase your skills and grow your professional network."
          />
        </div>
      </main>

      <footer className="bg-indigo-900 py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-indigo-200">
          <p>&copy; 2024 Blockchain Incentive Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Define the types for the props
interface FeatureCardProps {
  icon: React.ReactNode;    // This can be any React element (e.g., an SVG icon or an image)
  title: string;            // Title should be a string
  description: string;      // Description should also be a string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-indigo-800 border-indigo-700 text-white">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-indigo-200">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
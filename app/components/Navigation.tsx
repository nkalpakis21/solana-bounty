'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, Home, LayoutDashboard, Gavel, User, FileText, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/governance', label: 'Governance', icon: Gavel },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/submission', label: 'Submission', icon: FileText },
  { href: '/repositories', label: 'Repositories', icon: Github },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              <Link href="/" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
                <span className="rounded-full p-1">
                  🌟
                </span>
                <span>n0va</span>
              </Link>
            </h1>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} pathname={pathname} />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-purple-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-purple-800"
          >
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <NavItem key={item.href} {...item} pathname={pathname} mobile />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

interface NavItemProps {
  href: string
  label: string
  icon: React.ElementType
  pathname: string
  mobile?: boolean
}

function NavItem({ href, label, icon: Icon, pathname, mobile }: NavItemProps) {
  const isActive = pathname === href
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out",
        isActive
          ? "bg-indigo-600 text-white shadow-md transform scale-95"
          : "text-purple-100 hover:bg-indigo-600 hover:text-white hover:shadow-md hover:scale-95",
        mobile && "justify-start w-full"
      )}
    >
      <Icon className={cn("h-5 w-5", mobile ? "mr-3" : "mr-2")} />
      {label}
    </Link>
  )
}
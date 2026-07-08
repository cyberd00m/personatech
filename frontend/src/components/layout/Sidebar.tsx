'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  LayoutDashboard, 
  FolderKanban, 
  User, 
  FileText, 
  Clock, 
  Network, 
  Map, 
  FileBarChart, 
  Settings,
  Brain,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Cases', href: '/cases', icon: FolderKanban },
  { name: 'Profiles', href: '/profiles', icon: User },
  { name: 'Evidence', href: '/evidence', icon: FileText },
  { name: 'Timeline', href: '/timeline', icon: Clock },
  { name: 'Graph', href: '/graph', icon: Network },
  { name: 'Maps', href: '/maps', icon: Map },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
  { name: 'AI Analysis', href: '/ai-analysis', icon: Brain },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900/80 border border-blue-500/30 text-white hover:bg-blue-500/20 transition-colors"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r border-blue-500/30 bg-gray-900/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-blue-500/30 px-6">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.jpg" 
                alt="PersonaForge AI Logo" 
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-5 py-3 text-base font-medium transition-all",
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                      : "text-gray-400 hover:bg-blue-500/10 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-blue-500/30 p-4">
            <div className="rounded-lg bg-blue-500/10 p-3 border border-blue-500/20">
              <p className="text-xs text-gray-400">System Status</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-green-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
        />
      )}
    </>
  )
}

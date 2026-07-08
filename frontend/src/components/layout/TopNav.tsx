'use client'

import { Search, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function TopNav() {
  return (
    <div className="fixed right-0 top-0 z-40 h-16 border-b border-blue-500/30 bg-gray-900/80 backdrop-blur-xl" style={{ left: '16rem' }}>
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search cases, profiles, evidence..."
              className="pl-10 bg-gray-900/50 border-blue-500/30 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pl-4 border-l border-blue-500/30">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">System Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

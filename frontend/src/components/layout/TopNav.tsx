'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { User as UserIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

const AVATAR_STORAGE_KEY = 'personatech-admin-avatar'

export function TopNav() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarImage, setAvatarImage] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null
    }

    return localStorage.getItem(AVATAR_STORAGE_KEY)
  })

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file || !file.type.startsWith('image/')) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const imageData = reader.result

      if (typeof imageData === 'string') {
        localStorage.setItem(AVATAR_STORAGE_KEY, imageData)
        setAvatarImage(imageData)
      }
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  return (
    <div className="fixed right-0 top-0 z-40 h-16 border-b border-blue-500/30 bg-gray-900/80 backdrop-blur-xl" style={{ left: '16rem' }}>
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search cases, profiles, evidence..."
            className="bg-gray-900/50 border-blue-500/30 text-white placeholder:text-gray-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pl-4 border-l border-blue-500/30">
            <button
              type="button"
              onClick={handleAvatarClick}
              className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center"
              aria-label="Upload admin image"
            >
              {avatarImage ? (
                <span
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${avatarImage})` }}
                />
              ) : (
                <UserIcon className="h-4 w-4 text-white" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

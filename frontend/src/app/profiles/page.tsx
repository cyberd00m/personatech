'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockProfiles, type Profile } from '@/data'
import { 
  User, 
  Plus,
  MapPin,
  Briefcase,
  Calendar,
  Building2,
  GraduationCap
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProfiles = mockProfiles.filter((profile: Profile) => {
    return profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           profile.alias?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           profile.location.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 min-h-screen flex justify-center px-5 pb-8 pt-32 lg:px-8 lg:pb-10 lg:pt-32">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Profiles</h1>
            <p className="text-gray-400 mb-4">View and manage intelligence profiles</p>
            <Link href="/profiles/new">
              <Button variant="neon-blue" className="glow-blue">
                <Plus className="mr-2 h-4 w-4" />
                New Profile
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="max-w-md">
              <Input
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>

          {filteredProfiles.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No profiles found matching your search</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function ProfileCard({ profile }: { profile: Profile }) {
  const confidenceColor = profile.confidence >= 80 ? 'text-green-400' : 
                          profile.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'

  return (
    <Card className="border-blue-500/20 bg-gray-900/30 hover:border-cyan-400/50 hover:bg-gray-900/50 hover:scale-105 transition-all duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-white text-lg truncate">{profile.name}</CardTitle>
            {profile.alias && (
              <p className="text-sm text-cyan-400">@{profile.alias}</p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-400 truncate">{profile.location}</span>
          </div>
          {profile.occupation && (
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <span className="text-gray-400">{profile.occupation}</span>
            </div>
          )}
          {profile.ageRange && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-400">{profile.ageRange}</span>
            </div>
          )}
          
          {profile.organizations.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-gray-500" />
              <span className="text-gray-400 truncate">{profile.organizations[0]}</span>
              {profile.organizations.length > 1 && (
                <span className="text-gray-500">+{profile.organizations.length - 1}</span>
              )}
            </div>
          )}

          {profile.jobExperiences && profile.jobExperiences.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <span className="text-gray-400">{profile.jobExperiences.length} job{profile.jobExperiences.length > 1 ? 's' : ''}</span>
            </div>
          )}

          {profile.education && profile.education.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-gray-500" />
              <span className="text-gray-400">{profile.education.length} education{profile.education.length > 1 ? 's' : ''}</span>
            </div>
          )}

          <div className="pt-3 border-t border-blue-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Confidence</span>
              <span className={`text-sm font-medium ${confidenceColor}`}>
                {profile.confidence}%
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-gray-800">
              <div 
                className={`h-full rounded-full ${profile.confidence >= 80 ? 'bg-green-400' : profile.confidence >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                style={{ width: `${profile.confidence}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

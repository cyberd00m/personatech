'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { mockTimelineEvents, type TimelineEvent } from '@/data'
import { 
  Clock, 
  Calendar,
  Filter,
  Plus,
  User,
  MapPin,
  Building2,
  Network
} from 'lucide-react'
import { useState } from 'react'

export default function TimelinePage() {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'event' as 'profile' | 'evidence' | 'location' | 'event' | 'connection',
    date: '',
    importance: 'medium' as 'low' | 'medium' | 'high'
  })

  const handleCreateEvent = () => {
    const event: TimelineEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      type: newEvent.type,
      date: newEvent.date,
      caseId: '1',
      importance: newEvent.importance,
      relatedIds: []
    }
    mockTimelineEvents.push(event)
    setIsDialogOpen(false)
    setNewEvent({ title: '', description: '', type: 'event', date: '', importance: 'medium' })
  }

  const filteredEvents = mockTimelineEvents.filter((event: TimelineEvent) => {
    return typeFilter === 'all' || event.type === typeFilter
  })

  const typeIcons: Record<string, React.ReactNode> = {
    profile: <User className="h-4 w-4" />,
    evidence: <Clock className="h-4 w-4" />,
    location: <MapPin className="h-4 w-4" />,
    event: <Calendar className="h-4 w-4" />,
    connection: <Network className="h-4 w-4" />
  }

  const typeColors: Record<string, string> = {
    profile: 'text-cyan-400',
    evidence: 'text-purple-400',
    location: 'text-green-400',
    event: 'text-yellow-400',
    connection: 'text-pink-400'
  }

  const typeLabels: Record<string, string> = {
    profile: 'Profile',
    evidence: 'Evidence',
    location: 'Location',
    event: 'Event',
    connection: 'Connection'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 pt-16 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Timeline</h1>
            <p className="text-gray-400 mb-4">Chronological event tracking and pattern analysis</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="neon-blue" className="glow-blue">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="event-title">Title</Label>
                    <Input
                      id="event-title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Enter event title"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea
                      id="event-description"
                      value={newEvent.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Enter event description"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-type">Type</Label>
                    <select
                      id="event-type"
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'profile' | 'evidence' | 'location' | 'event' | 'connection' })}
                      className="mt-2 w-full bg-gray-800 border border-blue-500/30 rounded-md px-3 py-2 text-white"
                    >
                      <option value="profile">Profile</option>
                      <option value="evidence">Evidence</option>
                      <option value="location">Location</option>
                      <option value="event">Event</option>
                      <option value="connection">Connection</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="event-date">Date</Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-importance">Importance</Label>
                    <select
                      id="event-importance"
                      value={newEvent.importance}
                      onChange={(e) => setNewEvent({ ...newEvent, importance: e.target.value as 'low' | 'medium' | 'high' })}
                      className="mt-2 w-full bg-gray-800 border border-blue-500/30 rounded-md px-3 py-2 text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <Button onClick={handleCreateEvent} className="w-full glow-blue mt-6">
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="border-blue-500/30 bg-gray-900/50 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 rounded-md border border-blue-500/30 bg-gray-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="all">All Event Types</option>
                  <option value="profile">Profiles</option>
                  <option value="evidence">Evidence</option>
                  <option value="location">Locations</option>
                  <option value="event">Events</option>
                  <option value="connection">Connections</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400" />

            {/* Events */}
            <div className="space-y-6 pl-16">
              {filteredEvents.map((event, index) => (
                <TimelineEventCard 
                  key={event.id} 
                  event={event} 
                  typeIcons={typeIcons}
                  typeColors={typeColors}
                  typeLabels={typeLabels}
                  isLast={index === filteredEvents.length - 1}
                />
              ))}
            </div>
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No events found matching your filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function TimelineEventCard({ event, typeIcons, typeColors, typeLabels, isLast }: {
  event: TimelineEvent
  typeIcons: Record<string, React.ReactNode>
  typeColors: Record<string, string>
  typeLabels: Record<string, string>
  isLast: boolean
}) {
  const importanceColors: Record<string, string> = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-400 border-green-500/30'
  }

  return (
    <div className="relative">
      {/* Timeline Dot */}
      <div className="absolute -left-12 top-6 h-4 w-4 rounded-full bg-cyan-400 border-4 border-gray-900 glow-blue" />

      {/* Event Card */}
      <Card className="border-blue-500/30 bg-gray-900/50 hover:border-cyan-400/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-800 ${typeColors[event.type]}`}>
                {typeIcons[event.type]}
              </div>
              <div>
                <h3 className="font-semibold text-white">{event.title}</h3>
                <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full border ${typeColors[event.type]} bg-gray-800`}>
                {typeLabels[event.type]}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full border ${importanceColors[event.importance]}`}>
                {event.importance}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-4">{event.description}</p>

          {event.relatedIds.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Network className="h-3 w-3" />
              <span>{event.relatedIds.length} related item{event.relatedIds.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

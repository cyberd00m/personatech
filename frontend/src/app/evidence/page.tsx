'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { mockEvidence, type Evidence } from '@/data'
import { 
  FileText, 
  Plus,
  Image as ImageIcon,
  File,
  Link as LinkIcon,
  Music,
  Video,
  Tag
} from 'lucide-react'
import { useState } from 'react'

export default function EvidencePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEvidence, setNewEvidence] = useState({
    title: '',
    description: '',
    type: 'note' as 'note' | 'image' | 'document' | 'link' | 'audio' | 'video',
    source: '',
    tags: ''
  })

  const handleCreateEvidence = () => {
    const evidence: Evidence = {
      id: Date.now().toString(),
      title: newEvidence.title,
      description: newEvidence.description,
      type: newEvidence.type,
      source: newEvidence.source,
      date: new Date().toISOString().split('T')[0],
      caseId: '1',
      tags: newEvidence.tags.split(',').map(t => t.trim()).filter(t => t)
    }
    mockEvidence.push(evidence)
    setIsDialogOpen(false)
    setNewEvidence({ title: '', description: '', type: 'note', source: '', tags: '' })
  }

  const filteredEvidence = mockEvidence.filter((evidence: Evidence) => {
    const matchesSearch = evidence.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || evidence.type === typeFilter
    return matchesSearch && matchesType
  })

  const typeIcons: Record<string, React.ReactNode> = {
    note: <FileText className="h-4 w-4" />,
    image: <ImageIcon className="h-4 w-4" />,
    document: <File className="h-4 w-4" />,
    link: <LinkIcon className="h-4 w-4" />,
    audio: <Music className="h-4 w-4" />,
    video: <Video className="h-4 w-4" />
  }

  const typeColors: Record<string, string> = {
    note: 'text-cyan-400',
    image: 'text-purple-400',
    document: 'text-blue-400',
    link: 'text-green-400',
    audio: 'text-yellow-400',
    video: 'text-pink-400'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 min-h-screen flex justify-center px-5 pb-8 pt-32 lg:px-8 lg:pb-10 lg:pt-32">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Evidence</h1>
            <p className="text-gray-400 mb-4">Organize and manage collected evidence</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="neon-blue" className="glow-blue">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Evidence
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Evidence</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="evidence-title">Title</Label>
                    <Input
                      id="evidence-title"
                      value={newEvidence.title}
                      onChange={(e) => setNewEvidence({ ...newEvidence, title: e.target.value })}
                      placeholder="Enter evidence title"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="evidence-description">Description</Label>
                    <Textarea
                      id="evidence-description"
                      value={newEvidence.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewEvidence({ ...newEvidence, description: e.target.value })}
                      placeholder="Enter evidence description"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="evidence-type">Type</Label>
                    <select
                      id="evidence-type"
                      value={newEvidence.type}
                      onChange={(e) => setNewEvidence({ ...newEvidence, type: e.target.value as 'note' | 'image' | 'document' | 'link' | 'audio' | 'video' })}
                      className="mt-2 w-full bg-gray-800 border border-blue-500/30 rounded-md px-3 py-2 text-white"
                    >
                      <option value="note">Note</option>
                      <option value="image">Image</option>
                      <option value="document">Document</option>
                      <option value="link">Link</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="evidence-source">Source</Label>
                    <Input
                      id="evidence-source"
                      value={newEvidence.source}
                      onChange={(e) => setNewEvidence({ ...newEvidence, source: e.target.value })}
                      placeholder="Enter source"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="evidence-tags">Tags (comma-separated)</Label>
                    <Input
                      id="evidence-tags"
                      value={newEvidence.tags}
                      onChange={(e) => setNewEvidence({ ...newEvidence, tags: e.target.value })}
                      placeholder="tag1, tag2, tag3"
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={handleCreateEvidence} className="w-full glow-blue mt-6">
                    Add Evidence
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="border-blue-500/30 bg-gray-900/50 mb-8">
            <CardContent className="p-5" style={{ padding: '1.25rem' }}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search evidence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 rounded-md border border-blue-500/30 bg-gray-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="all">All Types</option>
                  <option value="note">Notes</option>
                  <option value="image">Images</option>
                  <option value="document">Documents</option>
                  <option value="link">Links</option>
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvidence.map((evidence) => (
              <EvidenceCard key={evidence.id} evidence={evidence} typeIcons={typeIcons} typeColors={typeColors} />
            ))}
          </div>

          {filteredEvidence.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No evidence found matching your filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function EvidenceCard({ evidence, typeIcons, typeColors }: { 
  evidence: Evidence
  typeIcons: Record<string, React.ReactNode>
  typeColors: Record<string, string>
}) {
  return (
    <Card className="border-blue-500/20 bg-gray-900/30 hover:border-cyan-400/50 hover:bg-gray-900/50 hover:scale-105 transition-all duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-gray-800 ${typeColors[evidence.type]}`}>
            {typeIcons[evidence.type]}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-white text-lg truncate">{evidence.title}</CardTitle>
            <p className="text-xs text-gray-500 capitalize mt-1">{evidence.type}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-gray-400 line-clamp-2">{evidence.description}</p>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Source: {evidence.source}</span>
          </div>

          {evidence.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {evidence.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
              {evidence.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{evidence.tags.length - 3}</span>
              )}
            </div>
          )}

          <div className="pt-3 border-t border-blue-500/20">
            <p className="text-xs text-gray-500">
              {new Date(evidence.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { mockInvestigations, Investigation, OSINTEntity } from '@/data/osint'
import { useState } from 'react'
import { Plus, Search, FolderOpen, Archive, CheckCircle, Clock, Tag, MoreVertical, Edit, Trash2, Play } from 'lucide-react'

export default function InvestigationsPage() {
  const [investigations, setInvestigations] = useState<Investigation[]>(mockInvestigations)
  const [selectedInvestigation, setSelectedInvestigation] = useState<Investigation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newInvestigation, setNewInvestigation] = useState({
    name: '',
    description: '',
    tags: ''
  })

  const filteredInvestigations = investigations.filter(inv =>
    inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4 text-green-400" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-400" />
      case 'archived':
        return <Archive className="w-4 h-4 text-gray-400" />
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-green-500/30 bg-green-500/10'
      case 'completed':
        return 'border-blue-500/30 bg-blue-500/10'
      case 'archived':
        return 'border-gray-500/30 bg-gray-500/10'
      default:
        return 'border-yellow-500/30 bg-yellow-500/10'
    }
  }

  const createInvestigation = () => {
    if (!newInvestigation.name.trim()) return

    const investigation: Investigation = {
      id: `inv-${Date.now()}`,
      name: newInvestigation.name,
      description: newInvestigation.description,
      status: 'active',
      entities: [],
      relationships: [],
      transforms: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: newInvestigation.tags.split(',').map(t => t.trim()).filter(t => t)
    }

    setInvestigations([...investigations, investigation])
    setNewInvestigation({ name: '', description: '', tags: '' })
    setIsCreateDialogOpen(false)
  }

  const deleteInvestigation = (id: string) => {
    setInvestigations(investigations.filter(inv => inv.id !== id))
    if (selectedInvestigation?.id === id) {
      setSelectedInvestigation(null)
    }
  }

  const updateStatus = (id: string, status: 'active' | 'archived' | 'completed') => {
    setInvestigations(investigations.map(inv =>
      inv.id === id ? { ...inv, status, updatedAt: new Date().toISOString() } : inv
    ))
    if (selectedInvestigation?.id === id) {
      setSelectedInvestigation({ ...selectedInvestigation, status, updatedAt: new Date().toISOString() })
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="min-h-screen px-5 pb-8 pt-[17.5rem] lg:px-8 lg:pb-10 lg:pt-[17.5rem] lg:pl-64">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Investigations</h1>
              <p className="text-gray-400">Manage your OSINT investigations and cases</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="neon-blue" className="glow-blue">
                  <Plus className="w-4 h-4 mr-2" />
                  New Investigation
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-blue-500/30">
                <DialogHeader>
                  <DialogTitle className="text-white">Create Investigation</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Name</Label>
                    <Input
                      value={newInvestigation.name}
                      onChange={(e) => setNewInvestigation({ ...newInvestigation, name: e.target.value })}
                      placeholder="e.g., Phishing Campaign Analysis"
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Description</Label>
                    <Textarea
                      value={newInvestigation.description}
                      onChange={(e) => setNewInvestigation({ ...newInvestigation, description: e.target.value })}
                      placeholder="Describe the investigation objectives..."
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Tags (comma-separated)</Label>
                    <Input
                      value={newInvestigation.tags}
                      onChange={(e) => setNewInvestigation({ ...newInvestigation, tags: e.target.value })}
                      placeholder="e.g., phishing, malware, urgent"
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Button onClick={createInvestigation} className="w-full glow-blue">
                    Create Investigation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search investigations..."
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Investigations List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">All Investigations</h2>
              {filteredInvestigations.length === 0 ? (
                <Card className="border-gray-700 bg-gray-900/50">
                  <CardContent className="p-6 text-center">
                    <FolderOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No investigations found</p>
                  </CardContent>
                </Card>
              ) : (
                filteredInvestigations.map((investigation) => (
                  <Card
                    key={investigation.id}
                    className={`cursor-pointer transition-all hover:border-cyan-500/50 ${getStatusColor(investigation.status)} ${selectedInvestigation?.id === investigation.id ? 'border-cyan-500 ring-1 ring-cyan-500' : ''}`}
                    onClick={() => setSelectedInvestigation(investigation)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(investigation.status)}
                          <CardTitle className="text-white text-base">{investigation.name}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteInvestigation(investigation.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{investigation.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {investigation.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{investigation.entities.length} entities</span>
                          <span>{new Date(investigation.updatedAt).toISOString().split('T')[0]}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Investigation Details */}
            <div className="lg:col-span-2">
              {selectedInvestigation ? (
                <div className="space-y-6">
                  {/* Header */}
                  <Card className="border-blue-500/30 bg-gray-900/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(selectedInvestigation.status)}
                            <h2 className="text-2xl font-bold text-white">{selectedInvestigation.name}</h2>
                          </div>
                          <p className="text-gray-400">{selectedInvestigation.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateStatus(selectedInvestigation.id, 'active')}
                            disabled={selectedInvestigation.status === 'active'}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Active
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateStatus(selectedInvestigation.id, 'completed')}
                            disabled={selectedInvestigation.status === 'completed'}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Complete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateStatus(selectedInvestigation.id, 'archived')}
                            disabled={selectedInvestigation.status === 'archived'}
                          >
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="w-4 h-4 text-gray-400" />
                        {selectedInvestigation.tags.map((tag) => (
                          <span key={tag} className="text-sm px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-blue-500/30 bg-gray-900/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">Entities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-white">{selectedInvestigation.entities.length}</div>
                      </CardContent>
                    </Card>
                    <Card className="border-blue-500/30 bg-gray-900/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">Relationships</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-white">{selectedInvestigation.relationships.length}</div>
                      </CardContent>
                    </Card>
                    <Card className="border-blue-500/30 bg-gray-900/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-400">Transforms Used</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-white">{selectedInvestigation.transforms.length}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Entities */}
                  <Card className="border-blue-500/30 bg-gray-900/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Entities</CardTitle>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Entity
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedInvestigation.entities.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-400">No entities in this investigation</p>
                          <Button variant="outline" className="mt-4">
                            Add your first entity
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selectedInvestigation.entities.map((entity) => (
                            <div key={entity.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                              <div>
                                <div className="text-white font-medium">{entity.label}</div>
                                <div className="text-sm text-gray-400 capitalize">{entity.type}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-cyan-400 text-sm">{entity.confidence}% confidence</div>
                                <div className="text-xs text-gray-500">{entity.source}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Timeline */}
                  <Card className="border-blue-500/30 bg-gray-900/50">
                    <CardHeader>
                      <CardTitle className="text-white">Activity Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                            <div className="w-0.5 h-full bg-gray-700" />
                          </div>
                          <div>
                            <div className="text-white font-medium">Investigation created</div>
                            <div className="text-sm text-gray-400">{new Date(selectedInvestigation.createdAt).toISOString()}</div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                            <div className="w-0.5 h-full bg-gray-700" />
                          </div>
                          <div>
                            <div className="text-white font-medium">Last updated</div>
                            <div className="text-sm text-gray-400">{new Date(selectedInvestigation.updatedAt).toISOString()}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-gray-700 bg-gray-900/50">
                  <CardContent className="p-12 text-center">
                    <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Select an Investigation</h3>
                    <p className="text-gray-400">Choose an investigation from the list to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { mockCases, type Case } from '@/data'
import { 
  FolderKanban, 
  User, 
  FileText, 
  Plus,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCase, setNewCase] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'archived' | 'pending',
    priority: 'medium' as 'low' | 'medium' | 'high'
  })

  const handleCreateCase = () => {
    const case_: Case = {
      id: Date.now().toString(),
      name: newCase.name,
      description: newCase.description,
      status: newCase.status,
      priority: newCase.priority,
      profiles: 0,
      evidence: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    mockCases.push(case_)
    setIsDialogOpen(false)
    setNewCase({ name: '', description: '', status: 'active', priority: 'medium' })
  }

  const filteredCases = mockCases.filter((case_: Case) => {
    const matchesSearch = case_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || case_.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 pt-16 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Cases</h1>
            <p className="text-gray-400 mb-4">Manage and track your intelligence cases</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="neon-blue" className="glow-blue">
                  <Plus className="mr-2 h-4 w-4" />
                  New Case
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Case</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="case-name">Case Name</Label>
                    <Input
                      id="case-name"
                      value={newCase.name}
                      onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
                      placeholder="Enter case name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="case-description">Description</Label>
                    <Textarea
                      id="case-description"
                      value={newCase.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewCase({ ...newCase, description: e.target.value })}
                      placeholder="Enter case description"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="case-status">Status</Label>
                    <select
                      id="case-status"
                      value={newCase.status}
                      onChange={(e) => setNewCase({ ...newCase, status: e.target.value as 'active' | 'archived' | 'pending' })}
                      className="mt-2 w-full bg-gray-800 border border-blue-500/30 rounded-md px-3 py-2 text-white"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="case-priority">Priority</Label>
                    <select
                      id="case-priority"
                      value={newCase.priority}
                      onChange={(e) => setNewCase({ ...newCase, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="mt-2 w-full bg-gray-800 border border-blue-500/30 rounded-md px-3 py-2 text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <Button onClick={handleCreateCase} className="w-full glow-blue mt-6">
                    Create Case
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="border-blue-500/30 bg-gray-900/50 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 rounded-md border border-blue-500/30 bg-gray-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="archived">Archived</option>
                  </select>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-4 py-2 rounded-md border border-blue-500/30 bg-gray-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="all">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((case_) => (
              <CaseCard key={case_.id} case={case_} />
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <FolderKanban className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No cases found matching your filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function CaseCard({ case: case_ }: { case: Case }) {
  const statusColors: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }

  const priorityColors: Record<string, string> = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400'
  }

  return (
    <Card className="border-blue-500/20 bg-gray-900/30 hover:border-cyan-400/50 hover:bg-gray-900/50 hover:scale-105 transition-all duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-white text-lg">{case_.name}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[case_.status]}`}>
            {case_.status}
          </span>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2">{case_.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <User className="h-4 w-4" />
              Profiles
            </span>
            <span className="text-white font-medium">{case_.profiles}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Evidence
            </span>
            <span className="text-white font-medium">{case_.evidence}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Priority
            </span>
            <span className={`font-medium ${priorityColors[case_.priority]}`}>
              {case_.priority}
            </span>
          </div>
          <div className="pt-3 border-t border-blue-500/20">
            <p className="text-xs text-gray-500">
              Updated: {new Date(case_.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

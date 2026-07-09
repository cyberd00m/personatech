'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { mockCases, mockProfiles, type Case } from '@/data'
import { 
  FileBarChart, 
  Download,
  Eye,
  Calendar,
  User,
  FileText,
  CheckCircle,
  Clock,
  Loader2,
  Sparkles
} from 'lucide-react'

type Report = {
  id: string
  title: string
  caseId: string
  caseName: string
  createdAt: string
  status: 'completed' | 'draft' | 'generating'
  confidence: number
  profiles: number
  evidence: number
  timelineEvents: number
  executiveSummary: string
  keyFindings: string[]
  recommendations: string[]
  usedAI: boolean
}

type GeneratedReportResponse = {
  report: Pick<Report, 'executiveSummary' | 'keyFindings' | 'recommendations' | 'confidence'>
  usedAI: boolean
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isCaseDialogOpen, setIsCaseDialogOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationError, setGenerationError] = useState('')

  const generateReport = async () => {
    if (!selectedCase) return

    setIsGenerating(true)
    setGenerationError('')

    try {
      const apiKey = window.localStorage.getItem('personatech-ai-api-key') ?? ''
      const provider = window.localStorage.getItem('personatech-ai-provider') ?? 'OpenAI'
      const response = await fetch('/api/ai/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider,
          apiKey,
          caseData: selectedCase,
        }),
      })

      if (!response.ok) {
        throw new Error('Report generation failed')
      }

      const generated = await response.json() as GeneratedReportResponse
      const newReport: Report = {
        id: Date.now().toString(),
        title: `${selectedCase.name} - Intelligence Summary`,
        caseId: selectedCase.id,
        caseName: selectedCase.name,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'completed',
        confidence: generated.report.confidence,
        profiles: selectedCase.profiles,
        evidence: selectedCase.evidence,
        timelineEvents: Math.floor(Math.random() * 10) + 1,
        executiveSummary: generated.report.executiveSummary,
        keyFindings: generated.report.keyFindings,
        recommendations: generated.report.recommendations,
        usedAI: generated.usedAI,
      }

      setReports((currentReports) => [...currentReports, newReport])
      setSelectedReport(newReport)
      setIsCaseDialogOpen(false)
      setSelectedCase(null)
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : 'Report generation failed')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateClick = () => {
    setIsCaseDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 min-h-screen flex justify-center px-5 pb-8 pt-32 lg:px-8 lg:pb-10 lg:pt-32">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
            <p className="text-gray-400 mb-4">Generate and export intelligence reports</p>
            <Button variant="neon-blue" className="glow-blue" onClick={handleGenerateClick}>
              <FileBarChart className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>

          {/* Reports Grid */}
          {reports.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <FileBarChart className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No reports yet</h3>
              <p className="text-gray-400">Click &quot;Generate Report&quot; to create your first intelligence report</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {reports.map((report) => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                  onSelect={() => setSelectedReport(report)}
                  isSelected={selectedReport?.id === report.id}
                />
              ))}
            </div>
          )}

          {/* Report Preview Section */}
          {selectedReport && (
            <Card variant="neon-purple" className="glow-purple">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Report Preview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Full Preview
                  </Button>
                  <Button variant="neon-blue" size="sm" className="glow-blue">
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Report Header */}
                <div className="border-b border-purple-400/20 pb-4">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">{selectedReport.title}</h2>
                    {selectedReport.usedAI && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
                        <Sparkles className="h-3 w-3" />
                        AI Generated
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Generated: {new Date(selectedReport.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileBarChart className="h-4 w-4" />
                      Case: {selectedReport.caseName}
                    </span>
                  </div>
                </div>

                {/* Executive Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Executive Summary</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedReport.executiveSummary}</p>
                </div>

                {/* Key Findings */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Key Findings</h3>
                  <ul className="space-y-2">
                    {selectedReport.keyFindings.map((finding) => (
                      <li key={finding} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Statistics */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Profiles" value={selectedReport.profiles.toString()} icon={<User className="h-4 w-4" />} />
                    <StatCard label="Evidence" value={selectedReport.evidence.toString()} icon={<FileText className="h-4 w-4" />} />
                    <StatCard label="Timeline Events" value={selectedReport.timelineEvents.toString()} icon={<Clock className="h-4 w-4" />} />
                    <StatCard label="Confidence" value={`${selectedReport.confidence}%`} icon={<CheckCircle className="h-4 w-4" />} />
                  </div>
                </div>

                {/* Profile Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Profile Summary</h3>
                  <div className="space-y-3">
                    {mockProfiles.slice(0, 3).map((profile) => (
                      <div key={profile.id} className="flex items-center gap-3 p-3 rounded-lg border border-purple-400/20 bg-purple-500/5">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{profile.name}</h4>
                          <p className="text-sm text-gray-400">{profile.location}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-cyan-400">{profile.confidence}%</span>
                          <p className="text-xs text-gray-500">confidence</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Timeline Summary</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-cyan-400" />
                      <span className="text-gray-400">Feb 15, 2024</span>
                      <span className="text-white">Anime Convention Attendance</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-purple-400" />
                      <span className="text-gray-400">Mar 1, 2024</span>
                      <span className="text-white">Music Festival - Metal Night</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                      <span className="text-gray-400">Mar 10, 2024</span>
                      <span className="text-white">New Location Added - Tech Hub</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {selectedReport.recommendations.map((recommendation) => (
                      <li key={recommendation} className="flex items-start gap-2 text-sm text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Case Selection Dialog */}
          <Dialog open={isCaseDialogOpen} onOpenChange={setIsCaseDialogOpen}>
            <DialogContent className="bg-gray-900 border-blue-500/30">
              <DialogHeader>
                <DialogTitle className="text-white">Select Case for Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-4">
                {mockCases.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No cases available. Create a case first.</p>
                ) : (
                  mockCases.map((case_) => (
                    <div
                      key={case_.id}
                      onClick={() => setSelectedCase(case_)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedCase?.id === case_.id
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : 'border-blue-500/30 bg-gray-800/50 hover:border-cyan-400/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-white">{case_.name}</h4>
                          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{case_.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <span className={`text-xs px-2 py-1 rounded-full border ${
                            case_.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            case_.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          }`}>
                            {case_.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-3 text-sm text-gray-400">
                        <span>{case_.profiles} profiles</span>
                        <span>{case_.evidence} evidence</span>
                        <span className={`capitalize ${
                          case_.priority === 'high' ? 'text-red-400' :
                          case_.priority === 'medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {case_.priority} priority
                        </span>
                      </div>
                    </div>
                  ))
                )}
                {generationError && (
                  <p className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{generationError}</p>
                )}
                <Button 
                  onClick={generateReport} 
                  disabled={!selectedCase || isGenerating}
                  className="w-full glow-blue mt-4"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating with AI...
                    </>
                  ) : (
                    'Generate Report'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}

function ReportCard({ report, onSelect, isSelected }: { report: Report; onSelect: () => void; isSelected: boolean }) {
  const statusColors: Record<string, string> = {
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    generating: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  }

  return (
    <Card 
      className={`border-blue-500/30 bg-gray-900/50 hover:border-cyan-400/50 transition-colors cursor-pointer ${
        isSelected ? 'border-cyan-400/50 ring-2 ring-cyan-400/30' : ''
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-white text-base line-clamp-2">{report.title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[report.status]} flex-shrink-0 ml-2`}>
            {report.status}
          </span>
        </div>
        <p className="text-sm text-gray-400">{report.caseName}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <User className="h-3 w-3" />
              {report.profiles} profiles
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <FileText className="h-3 w-3" />
              {report.evidence} evidence
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</span>
            <span className="text-sm font-medium text-cyan-400">{report.confidence}% confidence</span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
              <Eye className="mr-1 h-3 w-3" />
              Preview
            </Button>
            <Button variant="neon-blue" size="sm" className="flex-1 glow-blue">
              <Download className="mr-1 h-3 w-3" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-3 rounded-lg border border-purple-400/20 bg-purple-500/5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-purple-400">{icon}</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  )
}

'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockProfiles } from '@/data'
import { 
  Brain, 
  Sparkles,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Loader2
} from 'lucide-react'
import { useState } from 'react'

export default function AIAnalysisPage() {
  const [selectedProfile, setSelectedProfile] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        summary: 'The available information suggests participation in alternative music and gaming communities with strong digital presence. Subject shows consistent patterns in location and social interactions.',
        confidence: 82,
        informationGaps: [
          'Occupation details beyond current role',
          'Additional locations outside Brighton area',
          'Timeline events from past 6 months',
          'Family connections and background',
          'Financial information sources'
        ],
        patterns: [
          'Regular attendance at music venues',
          'Active in online gaming communities',
          'Consistent social media activity patterns',
          'Member of multiple tech-related organizations'
        ],
        recommendations: [
          'Gather additional social media evidence',
          'Monitor location patterns over extended period',
          'Investigate professional network connections',
          'Cross-reference with similar profiles'
        ]
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 pt-16 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Brain className="h-8 w-8 text-cyan-400" />
              <h1 className="text-3xl font-bold text-white">AI Analysis</h1>
            </div>
            <p className="text-gray-400 mb-2">AI-powered intelligence analysis and pattern detection</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30">
              <AlertTriangle className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-yellow-400">Simulation / Demo Data</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="border-blue-500/30 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">Analysis Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Profile</label>
                  <select
                    value={selectedProfile}
                    onChange={(e) => setSelectedProfile(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-blue-500/30 bg-gray-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="">Choose a profile...</option>
                    {mockProfiles.map((profile) => (
                      <option key={profile.id} value={profile.id}>
                        {profile.name} {profile.alias && `(${profile.alias})`}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProfile && (
                  <>
                    <div className="p-4 rounded-lg border border-blue-500/20 bg-gray-900/30">
                      <h4 className="font-semibold text-white mb-3">Profile Summary</h4>
                      {(() => {
                        const profile = mockProfiles.find(p => p.id === selectedProfile)
                        if (!profile) return null
                        return (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Name:</span>
                              <span className="text-white">{profile.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Location:</span>
                              <span className="text-white">{profile.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Interests:</span>
                              <span className="text-white">{profile.interests.slice(0, 3).join(', ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Organizations:</span>
                              <span className="text-white">{profile.organizations.length}</span>
                            </div>
                          </div>
                        )
                      })()}
                    </div>

                    <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      variant="neon-blue"
                      className="glow-blue w-full"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Run AI Analysis
                        </>
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card variant="neon-purple" className="glow-purple">
              <CardHeader>
                <CardTitle className="text-white">Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                {!analysisResult ? (
                  <div className="text-center py-12">
                    <Brain className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Select a profile and run analysis to see results</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-400" />
                        Summary
                      </h4>
                      <p className="text-sm text-gray-300">{analysisResult.summary}</p>
                    </div>

                    {/* Confidence */}
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-400" />
                        Confidence Score
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-cyan-400">{analysisResult.confidence}%</div>
                        <div className="flex-1 h-3 rounded-full bg-gray-800">
                          <div
                            className={`h-full rounded-full ${analysisResult.confidence >= 80 ? 'bg-green-400' : analysisResult.confidence >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                            style={{ width: `${analysisResult.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Information Gaps */}
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        Information Gaps
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.informationGaps.map((gap: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                            <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                            {gap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Detected Patterns */}
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        Detected Patterns
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.patterns.map((pattern: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                            {pattern}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

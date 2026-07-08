'use client'

import { useState } from 'react'
import { KeyRound, Save, Settings, ShieldCheck } from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window === 'undefined') {
      return ''
    }

    return window.localStorage.getItem('personatech-ai-api-key') ?? ''
  })
  const [provider, setProvider] = useState(() => {
    if (typeof window === 'undefined') {
      return 'OpenAI'
    }

    return window.localStorage.getItem('personatech-ai-provider') ?? 'OpenAI'
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    window.localStorage.setItem('personatech-ai-api-key', apiKey)
    window.localStorage.setItem('personatech-ai-provider', provider)
    setSaved(true)

    window.setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />

      <main className="lg:ml-64 pt-16 min-h-screen p-4 lg:p-8">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Settings className="h-8 w-8 text-cyan-400" />
              <h1 className="text-3xl font-bold text-white">Settings</h1>
            </div>
            <p className="text-gray-400">Manage your AI provider and API access for PersonaTech.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="border-blue-500/30 bg-gray-900/50 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <KeyRound className="h-5 w-5 text-cyan-400" />
                  AI API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">AI Provider</label>
                  <select
                    value={provider}
                    onChange={(event) => setProvider(event.target.value)}
                    className="h-12 w-full rounded-md border border-blue-500/30 bg-gray-900/50 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="OpenAI">OpenAI</option>
                    <option value="Anthropic">Anthropic</option>
                    <option value="Google Gemini">Google Gemini</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">AI API Key</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(event) => setApiKey(event.target.value)}
                    placeholder="Enter your AI API key"
                    autoComplete="off"
                  />
                  <p className="mt-2 text-xs text-gray-500">Your key is stored locally in this browser.</p>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={!apiKey.trim()}
                  variant="neon-blue"
                  className="w-full glow-blue"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saved ? 'Saved' : 'Save AI API Settings'}
                </Button>
              </CardContent>
            </Card>

            <Card variant="neon-purple" className="glow-purple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                  API Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-blue-500/20 bg-gray-900/30 p-4">
                  <p className="text-xs text-gray-400">Provider</p>
                  <p className="mt-1 text-sm font-medium text-white">{provider}</p>
                </div>

                <div className="rounded-lg border border-blue-500/20 bg-gray-900/30 p-4">
                  <p className="text-xs text-gray-400">Key Status</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${apiKey ? 'bg-green-400' : 'bg-yellow-400'}`} />
                    <span className={`text-sm ${apiKey ? 'text-green-400' : 'text-yellow-400'}`}>
                      {apiKey ? 'Configured' : 'Not configured'}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-400">Add your own AI API key to enable user-provided AI integrations across the app.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

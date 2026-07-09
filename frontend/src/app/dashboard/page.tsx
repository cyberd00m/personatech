'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockCases, mockProfiles, mockEvidence, type Case } from '@/data'
import { 
  FolderKanban, 
  User, 
  FileText, 
  TrendingUp, 
  Activity,
  Clock,
  AlertCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const totalCases = mockCases.length
  const activeCases = mockCases.filter((c: Case) => c.status === 'active').length
  const totalProfiles = mockProfiles.length
  const totalEvidence = mockEvidence.length

  const recentActivity = [
    { id: 1, type: 'profile', message: 'New profile created: Alex Chen', time: '2 hours ago' },
    { id: 2, type: 'evidence', message: 'Evidence added to Brighton Research', time: '4 hours ago' },
    { id: 3, type: 'case', message: 'Case status updated: Network Analysis', time: '6 hours ago' },
    { id: 4, type: 'ai', message: 'AI analysis completed for Sarah Mitchell', time: '8 hours ago' },
    { id: 5, type: 'timeline', message: 'Timeline event added: Anime Convention', time: '12 hours ago' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 min-h-screen flex justify-center px-5 pb-8 pt-32 lg:px-8 lg:pb-10 lg:pt-32">
        <motion.div 
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back. Here's your intelligence overview.</p>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatCard
              title="Cases"
              value={totalCases}
              icon={<FolderKanban className="h-4 w-4 text-cyan-400" />}
              trend="+2"
              color="cyan"
            />
            <StatCard
              title="Active"
              value={activeCases}
              icon={<Activity className="h-4 w-4 text-purple-400" />}
              trend="2 high"
              color="purple"
            />
            <StatCard
              title="Profiles"
              value={totalProfiles}
              icon={<User className="h-4 w-4 text-cyan-400" />}
              trend="+5"
              color="cyan"
            />
            <StatCard
              title="Evidence"
              value={totalEvidence}
              icon={<FileText className="h-4 w-4 text-purple-400" />}
              trend="+12"
              color="purple"
            />
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Active Cases */}
            <Card className="border-blue-500/20 bg-gray-900/30 hover:border-cyan-400/30 transition-colors">
              <CardHeader className="pb-4" style={{ padding: '1.25rem 1.25rem 1rem' }}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">Active Cases</CardTitle>
                  <Link href="/cases">
                    <Button variant="ghost" size="sm" className="text-cyan-400 text-xs hover:bg-cyan-400/10">
                      View All
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent style={{ padding: '0 1.25rem 1.25rem' }}>
                <div className="space-y-3">
                  {mockCases.filter((c: Case) => c.status === 'active').slice(0, 2).map((case_: Case, index: number) => (
                    <motion.div
                      key={case_.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <CaseCard case={case_} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-blue-500/20 bg-gray-900/30 hover:border-cyan-400/30 transition-colors">
              <CardHeader className="pb-4" style={{ padding: '1.25rem 1.25rem 1rem' }}>
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent style={{ padding: '0 1.25rem 1.25rem' }}>
                <div className="space-y-2">
                  {recentActivity.slice(0, 4).map((activity, index: number) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <ActivityItem activity={activity} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-blue-500/20 bg-gray-900/30 hover:border-cyan-400/30 transition-colors">
              <CardHeader className="pb-4" style={{ padding: '1.25rem 1.25rem 1rem' }}>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent style={{ padding: '0 1.25rem 1.25rem' }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: <FolderKanban className="h-4 w-4" />, label: "New Case", href: "/cases" },
                    { icon: <User className="h-4 w-4" />, label: "Add Profile", href: "/profiles/new" },
                    { icon: <FileText className="h-4 w-4" />, label: "Add Evidence", href: "/evidence" },
                    { icon: <Clock className="h-4 w-4" />, label: "View Timeline", href: "/timeline" }
                  ].map((action, index: number) => (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    >
                      <QuickActionButton icon={action.icon} label={action.label} href={action.href} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

function StatCard({ title, value, icon, trend, color }: {
  title: string
  value: number
  icon: React.ReactNode
  trend: string
  color: 'cyan' | 'purple'
}) {
  const borderClass = color === 'cyan' ? 'border-cyan-400/20' : 'border-purple-400/20'
  
  return (
    <Card className={`border ${borderClass} bg-gray-900/20`}>
      <CardContent className="p-4" style={{ padding: '1rem' }}>
        <div className="flex items-center justify-between mb-2">
          {icon}
          <span className="text-xs text-gray-500">{trend}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-xs text-gray-400">{title}</p>
      </CardContent>
    </Card>
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
    <div className="p-4 rounded-lg border border-blue-500/10 bg-gray-900/20 hover:bg-gray-900/30 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-white text-sm">{case_.name}</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[case_.status]}`}>
          {case_.status}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-2 line-clamp-1">{case_.description}</p>
      <div className="flex items-center gap-3 text-xs">
        <span className="text-gray-500">
          <User className="h-3 w-3 inline mr-1" />
          {case_.profiles}
        </span>
        <span className="text-gray-500">
          <FileText className="h-3 w-3 inline mr-1" />
          {case_.evidence}
        </span>
        <span className={`text-xs ${priorityColors[case_.priority]}`}>
          {case_.priority}
        </span>
      </div>
    </div>
  )
}

function ActivityItem({ activity }: { activity: any }) {
  const iconColors = {
    profile: 'text-cyan-400',
    evidence: 'text-purple-400',
    case: 'text-green-400',
    ai: 'text-pink-400',
    timeline: 'text-yellow-400'
  }

  const icons = {
    profile: <User className="h-3 w-3" />,
    evidence: <FileText className="h-3 w-3" />,
    case: <FolderKanban className="h-3 w-3" />,
    ai: <TrendingUp className="h-3 w-3" />,
    timeline: <Clock className="h-3 w-3" />
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded hover:bg-gray-900/20 transition-colors">
      <div className={`mt-0.5 ${iconColors[activity.type as keyof typeof iconColors]}`}>
        {icons[activity.type as keyof typeof icons]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white truncate">{activity.message}</p>
        <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
      </div>
    </div>
  )
}

function QuickActionButton({ icon, label, href }: {
  icon: React.ReactNode
  label: string
  href: string
}) {
  return (
    <Link href={href}>
      <Button variant="outline" className="w-full h-14 flex-col gap-1 border-blue-500/20 hover:bg-blue-500/10 hover:border-cyan-400/30 bg-gray-900/20">
        <span className="text-cyan-400">{icon}</span>
        <span className="text-xs">{label}</span>
      </Button>
    </Link>
  )
}

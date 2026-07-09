'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockProfiles, mockRelationships } from '@/data'
import { useCallback, useState } from 'react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  NodeTypes
} from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { label: 'Alex Chen', type: 'profile', confidence: 85 }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 100, y: 300 },
    data: { label: 'Sarah Mitchell', type: 'profile', confidence: 78 }
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 300 },
    data: { label: 'James Wilson', type: 'profile', confidence: 72 }
  },
  {
    id: 'anime-club',
    type: 'organization',
    position: { x: 150, y: 500 },
    data: { label: 'Anime Club', type: 'organization' }
  },
  {
    id: 'metal-venue',
    type: 'location',
    position: { x: 350, y: 500 },
    data: { label: 'Metal Venue', type: 'location' }
  },
  {
    id: 'anime-convention',
    type: 'event',
    position: { x: 250, y: 650 },
    data: { label: 'Anime Convention', type: 'event' }
  }
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', label: 'friend', style: { stroke: '#00c8ff', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', label: 'friend', style: { stroke: '#00c8ff', strokeWidth: 2 } },
  { id: 'e1-anime', source: '1', target: 'anime-club', label: 'member', style: { stroke: '#a855f7', strokeWidth: 2 } },
  { id: 'e2-anime', source: '2', target: 'anime-club', label: 'member', style: { stroke: '#a855f7', strokeWidth: 2 } },
  { id: 'e3-metal', source: '3', target: 'metal-venue', label: 'frequent', style: { stroke: '#00ff88', strokeWidth: 2 } },
  { id: 'e1-convention', source: '1', target: 'anime-convention', label: 'attended', style: { stroke: '#ff006e', strokeWidth: 2 } }
]

function CustomNode({ data }: any) {
  const getNodeStyle = () => {
    switch (data.type) {
      case 'profile':
        return 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/50'
      case 'organization':
        return 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50'
      case 'location':
        return 'bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-green-400/50'
      case 'event':
        return 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/50'
      default:
        return 'bg-gray-800 border-gray-600'
    }
  }

  return (
    <div className={`px-4 py-2 rounded-lg border-2 ${getNodeStyle()} backdrop-blur-sm min-w-[120px]`}>
      <div className="text-white font-semibold text-sm">{data.label}</div>
      {data.confidence && (
        <div className="text-xs text-cyan-400 mt-1">{data.confidence}% confidence</div>
      )}
    </div>
  )
}

const nodeTypes: NodeTypes = {
  custom: CustomNode,
  organization: CustomNode,
  location: CustomNode,
  event: CustomNode
}

export default function GraphPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="min-h-screen px-5 pb-8 pt-[17.5rem] lg:px-8 lg:pb-10 lg:pt-[17.5rem] lg:pl-64 flex justify-center items-center">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Relationship Graph</h1>
            <p className="text-gray-400 mb-4">Visualize connections between profiles, organizations, and events</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline">
                Reset View
              </Button>
              <Button variant="neon-blue" className="glow-blue">
                Add Node
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Graph */}
            <div className="lg:col-span-3">
              <Card className="border-blue-500/30 bg-gray-900/50">
                <CardContent className="p-0">
                  <div style={{ width: '100%', height: '600px' }}>
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      onConnect={onConnect}
                      onNodeClick={onNodeClick}
                      nodeTypes={nodeTypes}
                      fitView
                      style={{ background: '#0a0a0f' }}
                    >
                      <Controls />
                      <MiniMap 
                        nodeColor={(node) => {
                          switch (node.data.type) {
                            case 'profile': return '#00c8ff'
                            case 'organization': return '#a855f7'
                            case 'location': return '#00ff88'
                            case 'event': return '#ff006e'
                            default: return '#666'
                          }
                        }}
                        style={{ background: '#1a1a2e', border: '1px solid #00c8ff' }}
                      />
                      <Background color="#00c8ff" gap={16} />
                    </ReactFlow>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-1">
              <Card className="border-blue-500/30 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Node Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedNode ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{selectedNode.data.label}</h3>
                        <p className="text-sm text-cyan-400 capitalize">{selectedNode.data.type}</p>
                      </div>

                      {selectedNode.data.confidence && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Confidence</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-gray-800">
                              <div 
                                className="h-full rounded-full bg-cyan-400"
                                style={{ width: `${selectedNode.data.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm text-cyan-400">{selectedNode.data.confidence}%</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-sm text-gray-500 mb-2">Connections</p>
                        <div className="space-y-2">
                          {edges
                            .filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id)
                            .map((edge) => {
                              const connectedNodeId = edge.source === selectedNode.id ? edge.target : edge.source
                              const connectedNode = nodes.find(n => n.id === connectedNodeId)
                              return (
                                <div key={edge.id} className="flex items-center gap-2 text-sm">
                                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                                  <span className="text-gray-300">{connectedNode?.data.label}</span>
                                  <span className="text-gray-500">({edge.label})</span>
                                </div>
                              )
                            })}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        View Full Profile
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-sm">Click on a node to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Legend */}
              <Card className="border-blue-500/30 bg-gray-900/50 mt-4">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-cyan-400" />
                      <span className="text-gray-300">Profile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-400" />
                      <span className="text-gray-300">Organization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                      <span className="text-gray-300">Location</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <span className="text-gray-300">Event</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

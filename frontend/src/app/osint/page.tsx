'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { mockOSINTEntities, mockTransforms, OSINTEntity, OSINTEntityType, Transform } from '@/data/osint'
import { createTransformEngine } from '@/lib/transformEngine'
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
  NodeTypes,
  MarkerType
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Search, Plus, Play, Database, Settings, Network, Shield, MapPin, User, Mail, Globe, Smartphone, Building2, FileText, Bitcoin, Server, Lock, Image as ImageIcon } from 'lucide-react'

const transformEngine = createTransformEngine(mockTransforms)

// OSINT Entity Node Component
function OSINTNode({ data }: any) {
  const getIcon = () => {
    switch (data.type) {
      case 'person': return <User className="w-4 h-4" />
      case 'email': return <Mail className="w-4 h-4" />
      case 'domain': return <Globe className="w-4 h-4" />
      case 'ip-address': return <Server className="w-4 h-4" />
      case 'phone': return <Smartphone className="w-4 h-4" />
      case 'company': return <Building2 className="w-4 h-4" />
      case 'location': return <MapPin className="w-4 h-4" />
      case 'social-account': return <User className="w-4 h-4" />
      case 'website': return <Globe className="w-4 h-4" />
      case 'document': return <FileText className="w-4 h-4" />
      case 'crypto-address': return <Bitcoin className="w-4 h-4" />
      case 'asn': return <Network className="w-4 h-4" />
      case 'certificate': return <Lock className="w-4 h-4" />
      case 'image': return <ImageIcon className="w-4 h-4" />
      case 'device': return <Server className="w-4 h-4" />
      default: return <Shield className="w-4 h-4" />
    }
  }

  const getNodeStyle = () => {
    switch (data.type) {
      case 'person':
        return 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/50'
      case 'email':
        return 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50'
      case 'domain':
        return 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50'
      case 'ip-address':
        return 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/50'
      case 'phone':
        return 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-400/50'
      case 'company':
        return 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-indigo-400/50'
      case 'location':
        return 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-teal-400/50'
      case 'social-account':
        return 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-400/50'
      case 'website':
        return 'bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-400/50'
      case 'document':
        return 'bg-gradient-to-br from-gray-500/20 to-slate-500/20 border-gray-400/50'
      case 'crypto-address':
        return 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-400/50'
      case 'asn':
        return 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/50'
      case 'certificate':
        return 'bg-gradient-to-br from-lime-500/20 to-green-500/20 border-lime-400/50'
      case 'image':
        return 'bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 border-fuchsia-400/50'
      case 'device':
        return 'bg-gradient-to-br from-slate-500/20 to-gray-500/20 border-slate-400/50'
      default:
        return 'bg-gray-800 border-gray-600'
    }
  }

  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${getNodeStyle()} backdrop-blur-sm min-w-[140px]`}>
      <div className="flex items-center gap-2 mb-1">
        {getIcon()}
        <div className="text-white font-semibold text-sm">{data.label}</div>
      </div>
      {data.confidence !== undefined && (
        <div className="text-xs text-cyan-400">{data.confidence}% confidence</div>
      )}
      {data.source && (
        <div className="text-xs text-gray-400 mt-1">via {data.source}</div>
      )}
    </div>
  )
}

const nodeTypes: NodeTypes = {
  osint: OSINTNode
}

// Convert OSINT entities to ReactFlow nodes
function entitiesToNodes(entities: OSINTEntity[]): Node[] {
  return entities.map((entity, index) => ({
    id: entity.id,
    type: 'osint',
    position: { 
      x: 100 + (index % 4) * 200, 
      y: 100 + Math.floor(index / 4) * 150 
    },
    data: {
      label: entity.label,
      type: entity.type,
      confidence: entity.confidence,
      source: entity.source,
      value: entity.value,
      properties: entity.properties
    }
  }))
}

// Convert relationships to ReactFlow edges
function relationshipsToEdges(relationships: any[]): Edge[] {
  return relationships.map(rel => ({
    id: rel.id,
    source: rel.sourceId,
    target: rel.targetId,
    label: rel.label,
    style: { stroke: '#00c8ff', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00c8ff' }
  }))
}

export default function OSINTPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(entitiesToNodes(mockOSINTEntities))
  const [edges, setEdges, onEdgesChange] = useEdgesState(relationshipsToEdges([
    {
      id: 'rel-1',
      sourceId: 'ent-1',
      targetId: 'ent-2',
      label: 'resolves to',
      confidence: 100
    }
  ]))
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [selectedTransforms, setSelectedTransforms] = useState<string[]>([])
  const [isTransforming, setIsTransforming] = useState(false)
  const [newEntityType, setNewEntityType] = useState<OSINTEntityType>('domain')
  const [newEntityValue, setNewEntityValue] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    const availableTransforms = transformEngine.getAvailableTransforms(node.data.type as OSINTEntityType)
    setSelectedTransforms(availableTransforms.map(t => t.id))
  }, [])

  const executeTransform = async (transformId: string) => {
    if (!selectedNode) return
    
    setIsTransforming(true)
    try {
      const entity: OSINTEntity = {
        id: selectedNode.id,
        type: selectedNode.data.type,
        label: selectedNode.data.label,
        value: selectedNode.data.value,
        properties: selectedNode.data.properties || {},
        confidence: selectedNode.data.confidence,
        source: selectedNode.data.source,
        caseId: 'case-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const result = await transformEngine.executeTransform(transformId, entity)
      
      if (result.success) {
        // Add new nodes and edges
        const newNodes = entitiesToNodes(result.results)
        const newEdges = relationshipsToEdges(result.relationships)
        
        setNodes((nds) => [...nds, ...newNodes])
        setEdges((eds) => [...eds, ...newEdges])
      }
    } catch (error) {
      console.error('Transform failed:', error)
    } finally {
      setIsTransforming(false)
    }
  }

  const addEntity = () => {
    if (!newEntityValue.trim()) return

    const newEntity: OSINTEntity = {
      id: `ent-${Date.now()}`,
      type: newEntityType,
      label: newEntityValue,
      value: newEntityValue,
      properties: {},
      confidence: 100,
      source: 'manual',
      caseId: 'case-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const newNode = entitiesToNodes([newEntity])[0]
    newNode.position = { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 }
    
    setNodes((nds) => [...nds, newNode])
    setNewEntityValue('')
  }

  const availableTransforms = selectedNode 
    ? transformEngine.getAvailableTransforms(selectedNode.data.type as OSINTEntityType)
    : []

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="min-h-screen px-5 pb-8 pt-[17.5rem] lg:px-8 lg:pb-10 lg:pt-[17.5rem] lg:pl-64">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">OSINT Analysis</h1>
            <p className="text-gray-400 mb-4">Maltego-style intelligence gathering and link analysis</p>
            <div className="flex gap-2 justify-center">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="neon-blue" className="glow-blue">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Entity
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-blue-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add OSINT Entity</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Entity Type</Label>
                      <select 
                        value={newEntityType}
                        onChange={(e) => setNewEntityType(e.target.value as OSINTEntityType)}
                        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      >
                        <option value="domain">Domain</option>
                        <option value="ip-address">IP Address</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="person">Person</option>
                        <option value="company">Company</option>
                        <option value="social-account">Social Account</option>
                        <option value="website">Website</option>
                        <option value="crypto-address">Crypto Address</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Value</Label>
                      <Input
                        value={newEntityValue}
                        onChange={(e) => setNewEntityValue(e.target.value)}
                        placeholder="e.g., example.com"
                        className="mt-1 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <Button onClick={() => { addEntity(); setIsAddDialogOpen(false); }} className="w-full glow-blue">
                      Add Entity
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Database className="w-4 h-4 mr-2" />
                Data Sources
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Graph */}
            <div className="lg:col-span-3">
              <Card className="border-blue-500/30 bg-gray-900/50">
                <CardContent className="p-0">
                  <div style={{ width: '100%', height: '700px' }}>
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
                            case 'person': return '#3b82f6'
                            case 'email': return '#a855f7'
                            case 'domain': return '#22c55e'
                            case 'ip-address': return '#f97316'
                            case 'phone': return '#eab308'
                            case 'company': return '#6366f1'
                            case 'location': return '#14b8a6'
                            case 'social-account': return '#ec4899'
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

            {/* Side Panel */}
            <div className="lg:col-span-1 space-y-4">
              {/* Entity Details */}
              <Card className="border-blue-500/30 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Entity Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedNode ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{selectedNode.data.label}</h3>
                        <p className="text-sm text-cyan-400 capitalize">{selectedNode.data.type}</p>
                      </div>

                      {selectedNode.data.confidence !== undefined && (
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

                      {selectedNode.data.source && (
                        <div>
                          <p className="text-sm text-gray-500">Source</p>
                          <p className="text-sm text-gray-300">{selectedNode.data.source}</p>
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
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-sm">Click on a node to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Available Transforms */}
              <Card className="border-blue-500/30 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Available Transforms</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedNode ? (
                    <div className="space-y-2">
                      {availableTransforms.length > 0 ? (
                        availableTransforms.map((transform) => (
                          <Button
                            key={transform.id}
                            onClick={() => executeTransform(transform.id)}
                            disabled={isTransforming}
                            variant="outline"
                            className="w-full text-left justify-start"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {transform.name}
                          </Button>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">No transforms available for this entity type</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-sm">Select a node to see available transforms</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Legend */}
              <Card className="border-blue-500/30 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Entity Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-400" />
                      <span className="text-gray-300">Person</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-400" />
                      <span className="text-gray-300">Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                      <span className="text-gray-300">Domain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-400" />
                      <span className="text-gray-300">IP Address</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-teal-400" />
                      <span className="text-gray-300">Location</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-pink-400" />
                      <span className="text-gray-300">Social Account</span>
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

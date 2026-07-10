'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { OSINTEntity, OSINTEntityType } from '@/data/osint'
import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

interface EntitySearchProps {
  entities: OSINTEntity[]
  onEntitySelect?: (entity: OSINTEntity) => void
  className?: string
}

export function EntitySearch({ entities, onEntitySelect, className }: EntitySearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<OSINTEntityType | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)

  const entityTypes: OSINTEntityType[] = [
    'person',
    'email',
    'domain',
    'ip-address',
    'phone',
    'company',
    'location',
    'social-account',
    'website',
    'document',
    'crypto-address',
    'asn',
    'certificate',
    'image',
    'device'
  ]

  const filteredEntities = entities.filter(entity => {
    const matchesSearch = 
      entity.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entity.properties && Object.values(entity.properties).some(
        val => String(val).toLowerCase().includes(searchQuery.toLowerCase())
      ))
    
    const matchesType = selectedType === 'all' || entity.type === selectedType
    
    return matchesSearch && matchesType
  })

  const getEntityColor = (type: OSINTEntityType) => {
    switch (type) {
      case 'person': return 'bg-blue-500/20 border-blue-400/50'
      case 'email': return 'bg-purple-500/20 border-purple-400/50'
      case 'domain': return 'bg-green-500/20 border-green-400/50'
      case 'ip-address': return 'bg-orange-500/20 border-orange-400/50'
      case 'phone': return 'bg-yellow-500/20 border-yellow-400/50'
      case 'company': return 'bg-indigo-500/20 border-indigo-400/50'
      case 'location': return 'bg-teal-500/20 border-teal-400/50'
      case 'social-account': return 'bg-pink-500/20 border-pink-400/50'
      case 'website': return 'bg-emerald-500/20 border-emerald-400/50'
      case 'document': return 'bg-gray-500/20 border-gray-400/50'
      case 'crypto-address': return 'bg-amber-500/20 border-amber-400/50'
      case 'asn': return 'bg-red-500/20 border-red-400/50'
      case 'certificate': return 'bg-lime-500/20 border-lime-400/50'
      case 'image': return 'bg-fuchsia-500/20 border-fuchsia-400/50'
      case 'device': return 'bg-slate-500/20 border-slate-400/50'
      default: return 'bg-gray-500/20 border-gray-400/50'
    }
  }

  return (
    <div className={className}>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search entities by name, value, or properties..."
          className="pl-10 bg-gray-900 border-gray-700 text-white"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-4 p-4 rounded-lg bg-gray-900/50 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Filter by type</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedType('all')}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedType === 'all' ? 'neon-blue' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('all')}
            >
              All
            </Button>
            {entityTypes.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? 'neon-blue' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                {type.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="space-y-2">
        {filteredEntities.length === 0 ? (
          <Card className="border-gray-700 bg-gray-900/50">
            <CardContent className="p-6 text-center">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No entities found</p>
            </CardContent>
          </Card>
        ) : (
          filteredEntities.map(entity => (
            <Card
              key={entity.id}
              className={`cursor-pointer transition-all hover:border-cyan-500/50 ${getEntityColor(entity.type)}`}
              onClick={() => onEntitySelect?.(entity)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">{entity.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 capitalize">
                        {entity.type.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">{entity.value}</div>
                    {entity.source && (
                      <div className="text-xs text-gray-500">via {entity.source}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 text-sm font-medium">{entity.confidence}%</div>
                    <div className="text-xs text-gray-500">confidence</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Results Count */}
      {filteredEntities.length > 0 && (
        <div className="mt-4 text-sm text-gray-400">
          Found {filteredEntities.length} of {entities.length} entities
        </div>
      )}
    </div>
  )
}

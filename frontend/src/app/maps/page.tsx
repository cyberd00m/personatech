'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockLocations, type Location } from '@/data'
import { 
  Map as MapIcon, 
  MapPin,
  Building2,
  Filter,
  ZoomIn,
  ZoomOut,
  Layers
} from 'lucide-react'
import { useState } from 'react'

export default function MapsPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [filterType, setFilterType] = useState<string>('all')

  const filteredLocations = mockLocations.filter((location: Location) => {
    return filterType === 'all' || location.type === filterType
  })

  const typeColors: Record<string, string> = {
    venue: 'bg-cyan-400',
    residence: 'bg-purple-400',
    workplace: 'bg-green-400',
    public: 'bg-yellow-400',
    organization: 'bg-pink-400'
  }

  const typeLabels: Record<string, string> = {
    venue: 'Venue',
    residence: 'Residence',
    workplace: 'Workplace',
    public: 'Public',
    organization: 'Organization'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="min-h-screen px-5 pb-8 pt-[17.5rem] lg:px-8 lg:pb-10 lg:pt-[17.5rem] lg:pl-64 flex justify-center items-center">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Maps</h1>
            <p className="text-gray-400 mb-4">Geographic visualization and location analysis</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline">
                <Layers className="mr-2 h-4 w-4" />
                Layers
              </Button>
              <Button variant="neon-blue" className="glow-blue">
                <MapPin className="mr-2 h-4 w-4" />
                Add Location
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map Area */}
            <div className="lg:col-span-3">
              <Card className="border-blue-500/30 bg-gray-900/50">
                <CardContent className="p-0">
                  <div className="relative h-[600px] bg-gray-900 rounded-lg overflow-hidden">
                    {/* Simplified Map Visualization */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="h-full w-full" style={{
                          backgroundImage: `
                            linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: '50px 50px'
                        }} />
                      </div>

                      {/* UK Outline (Simplified) */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
                        <path
                          d="M 200 150 Q 250 100 350 120 Q 450 100 500 150 Q 550 200 520 300 Q 500 400 400 450 Q 300 480 200 400 Q 100 350 150 250 Q 180 200 200 150"
                          fill="none"
                          stroke="rgba(0, 200, 255, 0.3)"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* Location Markers */}
                      {filteredLocations.map((location) => (
                        <div
                          key={location.id}
                          className={`absolute w-4 h-4 rounded-full ${typeColors[location.type]} cursor-pointer hover:scale-150 transition-transform glow-blue`}
                          style={{
                            left: `${(location.coordinates.lng + 3) * 100 + 300}px`,
                            top: `${(55 - location.coordinates.lat) * 15 + 100}px`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          onClick={() => setSelectedLocation(location)}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-white whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity border border-cyan-400/30">
                            {location.name}
                          </div>
                        </div>
                      ))}

                      {/* Map Controls */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="bg-gray-900/80">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-gray-900/80">
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Legend */}
                      <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-blue-500/30">
                        <p className="text-xs text-gray-400 mb-2">Location Types</p>
                        <div className="space-y-1">
                          {Object.entries(typeLabels).map(([type, label]) => (
                            <div key={type} className="flex items-center gap-2 text-xs">
                              <div className={`w-2 h-2 rounded-full ${typeColors[type]}`} />
                              <span className="text-gray-300">{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Filter */}
              <Card className="border-blue-500/30 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Filter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-md border border-blue-500/30 bg-gray-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="all">All Types</option>
                      <option value="venue">Venues</option>
                      <option value="residence">Residences</option>
                      <option value="workplace">Workplaces</option>
                      <option value="public">Public</option>
                      <option value="organization">Organizations</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Location List */}
              <Card className="border-blue-500/30 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Locations ({filteredLocations.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedLocation?.id === location.id
                            ? 'border-cyan-400 bg-cyan-500/10'
                            : 'border-blue-500/20 bg-gray-900/30 hover:border-cyan-400/50'
                        }`}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${typeColors[location.type]}`} />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate">{location.name}</h4>
                            <p className="text-xs text-gray-400 truncate">{location.address}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-cyan-400">{typeLabels[location.type]}</span>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-500">{location.profileIds.length} profiles</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Selected Location Details */}
              {selectedLocation && (
                <Card variant="neon-blue" className="glow-blue">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Location Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-white">{selectedLocation.name}</h3>
                        <p className="text-sm text-cyan-400 capitalize">{typeLabels[selectedLocation.type]}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Address</p>
                        <p className="text-sm text-gray-300">{selectedLocation.address}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Coordinates</p>
                        <p className="text-sm text-gray-300">
                          {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Visit Frequency</p>
                        <p className="text-sm text-gray-300 capitalize">{selectedLocation.visitFrequency}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Last Visit</p>
                        <p className="text-sm text-gray-300">{new Date(selectedLocation.lastVisit).toLocaleDateString()}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Associated Profiles</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedLocation.profileIds.map((profileId, index) => (
                            <span key={index} className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs border border-cyan-400/30">
                              {profileId}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full text-sm">
                        View on Map
                      </Button>
                    </div>
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

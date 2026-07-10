'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, MapPin, Briefcase, Plus, X, GraduationCap as GraduationIcon, Map, Clock, FileText, Network, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'
import type { JobExperience, Education } from '@/data/profiles'

const socialMediaPlatforms = ['Instagram', 'Facebook', 'X / Twitter', 'LinkedIn', 'TikTok', 'YouTube', 'Reddit', 'GitHub', 'Discord', 'Telegram', 'Other']

export default function NewProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    ageRange: '',
    location: '',
    occupation: '',
    interests: '',
    socialMedia: '',
    websites: '',
    organizations: '',
    notes: ''
  })

  const [interestsList, setInterestsList] = useState<string[]>([])
  const [socialMediaList, setSocialMediaList] = useState<string[]>([])
  const [websitesList, setWebsitesList] = useState<string[]>([])
  const [organizationsList, setOrganizationsList] = useState<string[]>([])
  const [selectedSocialMediaPlatform, setSelectedSocialMediaPlatform] = useState(socialMediaPlatforms[0])
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>([])
  const [education, setEducation] = useState<Education[]>([])

  const [currentJob, setCurrentJob] = useState<JobExperience>({ title: '', company: '', startDate: '', endDate: '', description: '' })
  const [currentEducation, setCurrentEducation] = useState<Education>({ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })
  
  // Maps locations
  const [locations, setLocations] = useState<{ id: string; name: string; lat: number; lng: number; description: string }[]>([])
  const [currentLocation, setCurrentLocation] = useState({ name: '', lat: 0, lng: 0, description: '' })
  
  // Timeline events
  const [timelineEvents, setTimelineEvents] = useState<{ id: string; title: string; date: string; description: string; type: string }[]>([])
  const [currentEvent, setCurrentEvent] = useState({ title: '', date: '', description: '', type: 'general' })
  
  // Evidence items
  const [evidence, setEvidence] = useState<{ id: string; title: string; type: string; source: string; description: string }[]>([])
  const [currentEvidence, setCurrentEvidence] = useState({ title: '', type: 'document', source: '', description: '' })
  
  // Graph connections
  const [connections, setConnections] = useState<{ id: string; targetId: string; targetType: string; relationship: string; strength: number }[]>([])
  const [currentConnection, setCurrentConnection] = useState({ targetId: '', targetType: 'person', relationship: '', strength: 50 })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addToList = (value: string, list: string[], setList: (list: string[]) => void) => {
    if (value.trim()) {
      setList([...list, value.trim()])
    }
  }

  const removeFromList = (index: number, list: string[], setList: (list: string[]) => void) => {
    setList(list.filter((_, i) => i !== index))
  }

  const addSocialMedia = () => {
    const value = formData.socialMedia.trim()

    if (value) {
      setSocialMediaList([...socialMediaList, `${selectedSocialMediaPlatform}: ${value}`])
      setFormData({ ...formData, socialMedia: '' })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile data:', { 
      ...formData, 
      interests: interestsList, 
      socialMedia: socialMediaList, 
      websites: websitesList, 
      organizations: organizationsList,
      jobExperiences,
      education,
      locations,
      timelineEvents,
      evidence,
      connections
    })
    // In a real app, this would save to the backend
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="min-h-screen px-5 pb-8 pt-[17.5rem] lg:px-8 lg:pb-10 lg:pt-[17.5rem] lg:pl-64 flex justify-center items-start">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Create Profile</h1>
            <p className="text-gray-400">Build a new intelligence profile</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <Card className="border-blue-500/30 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
                      <User className="h-5 w-5 text-cyan-400" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Alias</label>
                        <Input
                          name="alias"
                          value={formData.alias}
                          onChange={handleInputChange}
                          placeholder="Known alias or username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Age Range</label>
                        <Input
                          name="ageRange"
                          value={formData.ageRange}
                          onChange={handleInputChange}
                          placeholder="e.g., 25-30"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City, Country"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Occupation</label>
                        <Input
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                          placeholder="Job title or profession"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact & Social */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
                      <MapPin className="h-5 w-5 text-purple-400" />
                      Contact & Social
                    </h3>

                    {/* Interests */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Interests</label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.interests}
                          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                          placeholder="Add interest"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addToList(formData.interests, interestsList, setInterestsList)
                              setFormData({ ...formData, interests: '' })
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            addToList(formData.interests, interestsList, setInterestsList)
                            setFormData({ ...formData, interests: '' })
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {interestsList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {interestsList.map((interest, index) => (
                            <span key={index} className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-sm">
                              {interest}
                              <button
                                type="button"
                                onClick={() => removeFromList(index, interestsList, setInterestsList)}
                                className="hover:text-white"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Social Media */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Social Media</label>
                      <div className="flex gap-2">
                        <select
                          value={selectedSocialMediaPlatform}
                          onChange={(e) => setSelectedSocialMediaPlatform(e.target.value)}
                          className="w-36 rounded-md border border-blue-500/30 bg-gray-900/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          {socialMediaPlatforms.map((platform) => (
                            <option key={platform} value={platform} className="bg-gray-900 text-white">
                              {platform}
                            </option>
                          ))}
                        </select>
                        <Input
                          value={formData.socialMedia}
                          onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                          placeholder="Username, handle, or profile URL"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addSocialMedia()
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addSocialMedia}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {socialMediaList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {socialMediaList.map((socialMedia, index) => (
                            <span key={index} className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-sm">
                              {socialMedia}
                              <button
                                type="button"
                                onClick={() => removeFromList(index, socialMediaList, setSocialMediaList)}
                                className="hover:text-white"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Websites */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Websites</label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.websites}
                          onChange={(e) => setFormData({ ...formData, websites: e.target.value })}
                          placeholder="https://example.com"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addToList(formData.websites, websitesList, setWebsitesList)
                              setFormData({ ...formData, websites: '' })
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            addToList(formData.websites, websitesList, setWebsitesList)
                            setFormData({ ...formData, websites: '' })
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {websitesList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {websitesList.map((website, index) => (
                            <span key={index} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-sm">
                              {website}
                              <button
                                type="button"
                                onClick={() => removeFromList(index, websitesList, setWebsitesList)}
                                className="hover:text-white"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Organizations */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Organizations</label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.organizations}
                          onChange={(e) => setFormData({ ...formData, organizations: e.target.value })}
                          placeholder="Organization name"
                          className="flex-1"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addToList(formData.organizations, organizationsList, setOrganizationsList)
                              setFormData({ ...formData, organizations: '' })
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            addToList(formData.organizations, organizationsList, setOrganizationsList)
                            setFormData({ ...formData, organizations: '' })
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {organizationsList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {organizationsList.map((org, index) => (
                            <span key={index} className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/30 text-sm">
                              {org}
                              <button
                                type="button"
                                onClick={() => removeFromList(index, organizationsList, setOrganizationsList)}
                                className="hover:text-white"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Professional Background */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
                      <Briefcase className="h-5 w-5 text-green-400" />
                      Professional Background
                    </h3>

                    {/* Job Experiences */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Job Experiences</label>
                      <div className="space-y-3 p-4 rounded-lg border border-blue-500/20 bg-gray-900/30">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Input
                              placeholder="Job Title"
                              value={currentJob.title}
                              onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <Input
                              placeholder="Company"
                              value={currentJob.company}
                              onChange={(e) => setCurrentJob({ ...currentJob, company: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Input
                              placeholder="Start Date"
                              value={currentJob.startDate}
                              onChange={(e) => setCurrentJob({ ...currentJob, startDate: e.target.value })}
                            />
                          </div>
                          <div>
                            <Input
                              placeholder="End Date"
                              value={currentJob.endDate}
                              onChange={(e) => setCurrentJob({ ...currentJob, endDate: e.target.value })}
                            />
                          </div>
                        </div>
                        <Input
                          placeholder="Description (optional)"
                          value={currentJob.description}
                          onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (currentJob.title && currentJob.company) {
                              setJobExperiences([...jobExperiences, currentJob])
                              setCurrentJob({ title: '', company: '', startDate: '', endDate: '', description: '' })
                            }
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Job Experience
                        </Button>
                        {jobExperiences.length > 0 && (
                          <div className="space-y-2 mt-3">
                            {jobExperiences.map((job, index) => (
                              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">{job.title} at {job.company}</p>
                                  {(job.startDate || job.endDate) && (
                                    <p className="text-xs text-gray-400">{job.startDate} - {job.endDate || 'Present'}</p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setJobExperiences(jobExperiences.filter((_, i) => i !== index))}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Education</label>
                      <div className="space-y-3 p-4 rounded-lg border border-purple-500/20 bg-gray-900/30">
                        <div>
                          <Input
                            placeholder="Institution"
                            value={currentEducation.institution}
                            onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="Degree (optional)"
                            value={currentEducation.degree}
                            onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                          />
                          <Input
                            placeholder="Field of Study (optional)"
                            value={currentEducation.field}
                            onChange={(e) => setCurrentEducation({ ...currentEducation, field: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="Start Date"
                            value={currentEducation.startDate}
                            onChange={(e) => setCurrentEducation({ ...currentEducation, startDate: e.target.value })}
                          />
                          <Input
                            placeholder="End Date"
                            value={currentEducation.endDate}
                            onChange={(e) => setCurrentEducation({ ...currentEducation, endDate: e.target.value })}
                          />
                        </div>
                        <Input
                          placeholder="Description (optional)"
                          value={currentEducation.description}
                          onChange={(e) => setCurrentEducation({ ...currentEducation, description: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (currentEducation.institution) {
                              setEducation([...education, currentEducation])
                              setCurrentEducation({ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })
                            }
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                        {education.length > 0 && (
                          <div className="space-y-2 mt-3">
                            {education.map((edu, index) => (
                              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">{edu.institution}</p>
                                  {edu.degree && edu.field && (
                                    <p className="text-xs text-gray-400">{edu.degree} in {edu.field}</p>
                                  )}
                                  {(edu.startDate || edu.endDate) && (
                                    <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate || 'Present'}</p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setEducation(education.filter((_, i) => i !== index))}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Intelligence Data */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
                      <Network className="h-5 w-5 text-orange-400" />
                      Intelligence Data
                    </h3>

                    {/* Map Locations */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        Map Locations
                      </label>
                      <div className="space-y-3 p-4 rounded-lg border border-green-500/20 bg-gray-900/30">
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="Location name"
                            value={currentLocation.name}
                            onChange={(e) => setCurrentLocation({ ...currentLocation, name: e.target.value })}
                          />
                          <Input
                            placeholder="Coordinates (lat, lng)"
                            value={currentLocation.lat && currentLocation.lng ? `${currentLocation.lat}, ${currentLocation.lng}` : ''}
                            onChange={(e) => {
                              const coords = e.target.value.split(',').map(c => parseFloat(c.trim()))
                              if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                                setCurrentLocation({ ...currentLocation, lat: coords[0], lng: coords[1] })
                              }
                            }}
                          />
                        </div>
                        <Input
                          placeholder="Description"
                          value={currentLocation.description}
                          onChange={(e) => setCurrentLocation({ ...currentLocation, description: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (currentLocation.name) {
                              setLocations([...locations, { ...currentLocation, id: `loc-${Date.now()}` }])
                              setCurrentLocation({ name: '', lat: 0, lng: 0, description: '' })
                            }
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Location
                        </Button>
                        {locations.length > 0 && (
                          <div className="space-y-2 mt-3">
                            {locations.map((loc) => (
                              <div key={loc.id} className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">{loc.name}</p>
                                  <p className="text-xs text-gray-400">{loc.lat}, {loc.lng}</p>
                                  {loc.description && <p className="text-xs text-gray-500 mt-1">{loc.description}</p>}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setLocations(locations.filter(l => l.id !== loc.id))}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Events */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Timeline Events
                      </label>
                      <div className="space-y-3 p-4 rounded-lg border border-yellow-500/20 bg-gray-900/30">
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="Event title"
                            value={currentEvent.title}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                          />
                          <Input
                            type="date"
                            value={currentEvent.date}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                          />
                        </div>
                        <select
                          value={currentEvent.type}
                          onChange={(e) => setCurrentEvent({ ...currentEvent, type: e.target.value })}
                          className="w-full rounded-md border border-blue-500/30 bg-gray-900/50 px-3 py-2 text-sm text-white"
                        >
                          <option value="general">General</option>
                          <option value="meeting">Meeting</option>
                          <option value="travel">Travel</option>
                          <option value="communication">Communication</option>
                          <option value="incident">Incident</option>
                          <option value="observation">Observation</option>
                        </select>
                        <Input
                          placeholder="Description"
                          value={currentEvent.description}
                          onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (currentEvent.title && currentEvent.date) {
                              setTimelineEvents([...timelineEvents, { ...currentEvent, id: `evt-${Date.now()}` }])
                              setCurrentEvent({ title: '', date: '', description: '', type: 'general' })
                            }
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Event
                        </Button>
                        {timelineEvents.length > 0 && (
                          <div className="space-y-2 mt-3">
                            {timelineEvents.map((evt) => (
                              <div key={evt.id} className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">{evt.title}</p>
                                  <p className="text-xs text-gray-400">{evt.date} • {evt.type}</p>
                                  {evt.description && <p className="text-xs text-gray-500 mt-1">{evt.description}</p>}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setTimelineEvents(timelineEvents.filter(e => e.id !== evt.id))}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Evidence */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Evidence
                      </label>
                      <div className="space-y-3 p-4 rounded-lg border border-red-500/20 bg-gray-900/30">
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="Evidence title"
                            value={currentEvidence.title}
                            onChange={(e) => setCurrentEvidence({ ...currentEvidence, title: e.target.value })}
                          />
                          <select
                            value={currentEvidence.type}
                            onChange={(e) => setCurrentEvidence({ ...currentEvidence, type: e.target.value })}
                            className="rounded-md border border-blue-500/30 bg-gray-900/50 px-3 py-2 text-sm text-white"
                          >
                            <option value="document">Document</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                            <option value="screenshot">Screenshot</option>
                            <option value="log">Log File</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <Input
                          placeholder="Source"
                          value={currentEvidence.source}
                          onChange={(e) => setCurrentEvidence({ ...currentEvidence, source: e.target.value })}
                        />
                        <Input
                          placeholder="Description"
                          value={currentEvidence.description}
                          onChange={(e) => setCurrentEvidence({ ...currentEvidence, description: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (currentEvidence.title) {
                              setEvidence([...evidence, { ...currentEvidence, id: `evd-${Date.now()}` }])
                              setCurrentEvidence({ title: '', type: 'document', source: '', description: '' })
                            }
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Evidence
                        </Button>
                        {evidence.length > 0 && (
                          <div className="space-y-2 mt-3">
                            {evidence.map((evd) => (
                              <div key={evd.id} className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">{evd.title}</p>
                                  <p className="text-xs text-gray-400">{evd.type} • {evd.source}</p>
                                  {evd.description && <p className="text-xs text-gray-500 mt-1">{evd.description}</p>}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setEvidence(evidence.filter(e => e.id !== evd.id))}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Graph Connections */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Network className="h-4 w-4" />
                        Connections
                      </label>
                      <div className="space-y-3 p-4 rounded-lg border border-purple-500/20 bg-gray-900/30">
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="Target entity ID/name"
                            value={currentConnection.targetId}
                            onChange={(e) => setCurrentConnection({ ...currentConnection, targetId: e.target.value })}
                          />
                          <select
                            value={currentConnection.targetType}
                            onChange={(e) => setCurrentConnection({ ...currentConnection, targetType: e.target.value })}
                            className="rounded-md border border-blue-500/30 bg-gray-900/50 px-3 py-2 text-sm text-white"
                          >
                            <option value="person">Person</option>
                            <option value="organization">Organization</option>
                            <option value="location">Location</option>
                            <option value="event">Event</option>
                            <option value="company">Company</option>
                          </select>
                        </div>
                        <Input
                          placeholder="Relationship type (e.g., friend, colleague)"
                          value={currentConnection.relationship}
                          onChange={(e) => setCurrentConnection({ ...currentConnection, relationship: e.target.value })}
                        />
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Connection strength: {currentConnection.strength}%</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={currentConnection.strength}
                            onChange={(e) => setCurrentConnection({ ...currentConnection, strength: parseInt(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (currentConnection.targetId && currentConnection.relationship) {
                              setConnections([...connections, { ...currentConnection, id: `con-${Date.now()}` }])
                              setCurrentConnection({ targetId: '', targetType: 'person', relationship: '', strength: 50 })
                            }
                          }}
                        >
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Add Connection
                        </Button>
                        {connections.length > 0 && (
                          <div className="space-y-2 mt-3">
                            {connections.map((con) => (
                              <div key={con.id} className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">{con.targetId}</p>
                                  <p className="text-xs text-gray-400">{con.relationship} ({con.targetType}) • {con.strength}% strength</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setConnections(connections.filter(c => c.id !== con.id))}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 tracking-wide">
                      <FileText className="h-5 w-5 text-blue-400" />
                      Additional Notes
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Additional notes and observations"
                        rows={4}
                        className="w-full px-3 py-2 rounded-md border border-blue-500/30 bg-gray-900/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" variant="neon-blue" className="glow-blue flex-1">
                      Create Profile
                    </Button>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card variant="neon-blue" className="glow-blue">
              <CardHeader>
                <CardTitle className="text-white">Profile Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfilePreview
                  name={formData.name || 'Name'}
                  alias={formData.alias}
                  location={formData.location || 'Location'}
                  occupation={formData.occupation}
                  interests={interestsList}
                  socialMedia={socialMediaList}
                  websites={websitesList}
                  organizations={organizationsList}
                  jobExperiences={jobExperiences}
                  education={education}
                  notes={formData.notes}
                  locations={locations}
                  timelineEvents={timelineEvents}
                  evidence={evidence}
                  connections={connections}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function ProfilePreview({ name, alias, location, occupation, interests, socialMedia, websites, organizations, jobExperiences, education, notes, locations, timelineEvents, evidence, connections }: {
  name: string
  alias?: string
  location: string
  occupation?: string
  interests: string[]
  socialMedia: string[]
  websites: string[]
  organizations: string[]
  jobExperiences: JobExperience[]
  education: Education[]
  notes: string
  locations: { id: string; name: string; lat: number; lng: number; description: string }[]
  timelineEvents: { id: string; title: string; date: string; description: string; type: string }[]
  evidence: { id: string; title: string; type: string; source: string; description: string }[]
  connections: { id: string; targetId: string; targetType: string; relationship: string; strength: number }[]
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0">
          <User className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          {alias && <p className="text-cyan-400">@{alias}</p>}
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        {occupation && (
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-gray-500" />
            <span className="text-gray-400">{occupation}</span>
          </div>
        )}

        {interests.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Interests</p>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {socialMedia.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Social Media</p>
            <div className="flex flex-wrap gap-2">
              {socialMedia.map((item, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {websites.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Websites</p>
            <div className="flex flex-wrap gap-2">
              {websites.map((website, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-sm">
                  {website}
                </span>
              ))}
            </div>
          </div>
        )}

        {organizations.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Organizations</p>
            <div className="flex flex-wrap gap-2">
              {organizations.map((org, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/30 text-sm">
                  {org}
                </span>
              ))}
            </div>
          </div>
        )}

        {jobExperiences.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Job Experiences</p>
            <div className="space-y-2">
              {jobExperiences.map((job, index) => (
                <div key={index} className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium text-white">{job.title} at {job.company}</p>
                  {(job.startDate || job.endDate) && (
                    <p className="text-xs text-gray-400">{job.startDate} - {job.endDate || 'Present'}</p>
                  )}
                  {job.description && (
                    <p className="text-xs text-gray-400 mt-1">{job.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Education</p>
            <div className="space-y-2">
              {education.map((edu, index) => (
                <div key={index} className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <GraduationIcon className="h-4 w-4 text-purple-400" />
                    <p className="text-sm font-medium text-white">{edu.institution}</p>
                  </div>
                  {edu.degree && edu.field && (
                    <p className="text-xs text-gray-400">{edu.degree} in {edu.field}</p>
                  )}
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate || 'Present'}</p>
                  )}
                  {edu.description && (
                    <p className="text-xs text-gray-400 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {notes && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Notes</p>
            <p className="text-sm text-gray-400">{notes}</p>
          </div>
        )}

        {locations.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              <Map className="h-4 w-4" />
              Map Locations
            </p>
            <div className="space-y-2">
              {locations.map((loc) => (
                <div key={loc.id} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-sm font-medium text-white">{loc.name}</p>
                  <p className="text-xs text-gray-400">{loc.lat}, {loc.lng}</p>
                  {loc.description && <p className="text-xs text-gray-500 mt-1">{loc.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {timelineEvents.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeline Events
            </p>
            <div className="space-y-2">
              {timelineEvents.map((evt) => (
                <div key={evt.id} className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-sm font-medium text-white">{evt.title}</p>
                  <p className="text-xs text-gray-400">{evt.date} • {evt.type}</p>
                  {evt.description && <p className="text-xs text-gray-500 mt-1">{evt.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {evidence.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Evidence
            </p>
            <div className="space-y-2">
              {evidence.map((evd) => (
                <div key={evd.id} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm font-medium text-white">{evd.title}</p>
                  <p className="text-xs text-gray-400">{evd.type} • {evd.source}</p>
                  {evd.description && <p className="text-xs text-gray-500 mt-1">{evd.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {connections.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              <Network className="h-4 w-4" />
              Connections
            </p>
            <div className="space-y-2">
              {connections.map((con) => (
                <div key={con.id} className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm font-medium text-white">{con.targetId}</p>
                  <p className="text-xs text-gray-400">{con.relationship} ({con.targetType}) • {con.strength}% strength</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confidence */}
      <div className="pt-4 border-t border-cyan-400/20">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">AI Confidence</span>
          <span className="text-sm font-medium text-cyan-400">Calculating...</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-800">
          <div className="h-full rounded-full bg-cyan-400 animate-pulse" style={{ width: '65%' }} />
        </div>
      </div>
    </div>
  )
}

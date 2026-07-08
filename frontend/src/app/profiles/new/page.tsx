'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, MapPin, Briefcase, Building2, Plus, X, GraduationCap, Calendar, GraduationCap as GraduationIcon } from 'lucide-react'
import { useState } from 'react'
import type { JobExperience, Education } from '@/data/profiles'

export default function NewProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    ageRange: '',
    location: '',
    occupation: '',
    interests: '',
    usernames: '',
    websites: '',
    organizations: '',
    notes: ''
  })

  const [interestsList, setInterestsList] = useState<string[]>([])
  const [usernamesList, setUsernamesList] = useState<string[]>([])
  const [websitesList, setWebsitesList] = useState<string[]>([])
  const [organizationsList, setOrganizationsList] = useState<string[]>([])
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>([])
  const [education, setEducation] = useState<Education[]>([])

  const [currentJob, setCurrentJob] = useState<JobExperience>({ title: '', company: '', startDate: '', endDate: '', description: '' })
  const [currentEducation, setCurrentEducation] = useState<Education>({ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile data:', { 
      ...formData, 
      interests: interestsList, 
      usernames: usernamesList, 
      websites: websitesList, 
      organizations: organizationsList,
      jobExperiences,
      education
    })
    // In a real app, this would save to the backend
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 pt-16 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
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

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Occupation</label>
                      <Input
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        placeholder="Job title or profession"
                      />
                    </div>

                    {/* Interests */}
                    <div>
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

                    {/* Usernames */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Usernames</label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.usernames}
                          onChange={(e) => setFormData({ ...formData, usernames: e.target.value })}
                          placeholder="@username"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addToList(formData.usernames, usernamesList, setUsernamesList)
                              setFormData({ ...formData, usernames: '' })
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            addToList(formData.usernames, usernamesList, setUsernamesList)
                            setFormData({ ...formData, usernames: '' })
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {usernamesList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {usernamesList.map((username, index) => (
                            <span key={index} className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-sm">
                              {username}
                              <button
                                type="button"
                                onClick={() => removeFromList(index, usernamesList, setUsernamesList)}
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
                    <div>
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

                    {/* Job Experiences */}
                    <div>
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
                  usernames={usernamesList}
                  websites={websitesList}
                  organizations={organizationsList}
                  jobExperiences={jobExperiences}
                  education={education}
                  notes={formData.notes}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function ProfilePreview({ name, alias, location, occupation, interests, usernames, websites, organizations, jobExperiences, education, notes }: {
  name: string
  alias?: string
  location: string
  occupation?: string
  interests: string[]
  usernames: string[]
  websites: string[]
  organizations: string[]
  jobExperiences: JobExperience[]
  education: Education[]
  notes: string
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

        {usernames.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Usernames</p>
            <div className="flex flex-wrap gap-2">
              {usernames.map((username, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-sm">
                  {username}
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

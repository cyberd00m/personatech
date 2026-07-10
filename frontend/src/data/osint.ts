// OSINT Entity Types - Similar to Maltego's entity model
export type OSINTEntityType = 
  | 'person'
  | 'email'
  | 'domain'
  | 'ip-address'
  | 'phone'
  | 'company'
  | 'location'
  | 'social-account'
  | 'website'
  | 'document'
  | 'crypto-address'
  | 'asn'
  | 'certificate'
  | 'image'
  | 'device';

export interface OSINTEntity {
  id: string;
  type: OSINTEntityType;
  label: string;
  value: string; // The actual value (e.g., email address, domain name)
  properties: Record<string, any>;
  confidence: number;
  source?: string;
  caseId: string;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    whois?: WhoisData;
    dns?: DNSData;
    geolocation?: GeoLocationData;
    social?: SocialMediaData;
    whoisxml?: any;
    virustotal?: any;
    shodan?: any;
  };
}

export interface WhoisData {
  registrar?: string;
  createdDate?: string;
  expiryDate?: string;
  status?: string[];
  nameServers?: string[];
  registrant?: {
    name?: string;
    organization?: string;
    email?: string;
    country?: string;
  };
}

export interface DNSData {
  A?: string[];
  AAAA?: string[];
  MX?: Array<{ exchange: string; priority: number }>;
  NS?: string[];
  TXT?: string[];
  CNAME?: string[];
  SOA?: {
    nsname: string;
    hostmaster: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minttl: number;
  };
}

export interface GeoLocationData {
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  isp?: string;
  org?: string;
  timezone?: string;
}

export interface SocialMediaData {
  platform: string;
  username: string;
  url: string;
  followers?: number;
  verified?: boolean;
  bio?: string;
  profileImage?: string;
}

// Transform Types - Similar to Maltego transforms
export type TransformType = 
  | 'to-domain'
  | 'to-ip'
  | 'to-email'
  | 'to-phone'
  | 'to-social'
  | 'to-company'
  | 'to-location'
  | 'to-website'
  | 'to-subdomain'
  | 'to-asn'
  | 'whois-lookup'
  | 'dns-lookup'
  | 'reverse-dns'
  | 'ssl-cert'
  | 'geolocation'
  | 'social-search'
  | 'email-search'
  | 'phone-search';

export interface Transform {
  id: string;
  name: string;
  description: string;
  inputType: OSINTEntityType[];
  outputType: OSINTEntityType;
  category: 'infrastructure' | 'personal' | 'social' | 'location' | 'advanced';
  requiresAPIKey?: boolean;
  apiKeyService?: string;
  enabled: boolean;
}

export interface TransformResult {
  transformId: string;
  sourceEntityId: string;
  results: OSINTEntity[];
  relationships: Relationship[];
  timestamp: string;
  success: boolean;
  error?: string;
}

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: string;
  label: string;
  confidence: number;
  properties?: Record<string, any>;
}

// Investigation/Case Management
export interface Investigation {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'completed';
  entities: OSINTEntity[];
  relationships: Relationship[];
  transforms: string[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// Data Source Configuration
export interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'database' | 'scraping';
  category: 'whois' | 'dns' | 'social' | 'geolocation' | 'threat-intel' | 'public-records';
  enabled: boolean;
  requiresAuth: boolean;
  rateLimit?: number;
  config?: Record<string, any>;
}

// Mock Data
export const mockOSINTEntities: OSINTEntity[] = [
  {
    id: 'ent-1',
    type: 'domain',
    label: 'example.com',
    value: 'example.com',
    properties: { tld: 'com', sld: 'example' },
    confidence: 100,
    source: 'manual',
    caseId: 'case-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {
      whois: {
        registrar: 'Example Registrar',
        createdDate: '2020-01-01',
        expiryDate: '2025-01-01',
        nameServers: ['ns1.example.com', 'ns2.example.com']
      },
      dns: {
        A: ['93.184.216.34'],
        MX: [{ exchange: 'mail.example.com', priority: 10 }],
        NS: ['ns1.example.com', 'ns2.example.com']
      }
    }
  },
  {
    id: 'ent-2',
    type: 'ip-address',
    label: '93.184.216.34',
    value: '93.184.216.34',
    properties: { version: 4 },
    confidence: 95,
    source: 'dns-lookup',
    caseId: 'case-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {
      geolocation: {
        country: 'US',
        region: 'California',
        city: 'Los Angeles',
        latitude: 34.0522,
        longitude: -118.2437,
        isp: 'Example ISP'
      }
    }
  },
  {
    id: 'ent-3',
    type: 'email',
    label: 'admin@example.com',
    value: 'admin@example.com',
    properties: { domain: 'example.com', localPart: 'admin' },
    confidence: 85,
    source: 'whois',
    caseId: 'case-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ent-4',
    type: 'social-account',
    label: '@example_twitter',
    value: 'example_twitter',
    properties: { platform: 'twitter', platformId: '123456789' },
    confidence: 70,
    source: 'social-search',
    caseId: 'case-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {
      social: {
        platform: 'twitter',
        username: 'example_twitter',
        url: 'https://twitter.com/example_twitter',
        followers: 1500,
        verified: false,
        bio: 'Example bio'
      }
    }
  }
];

export const mockTransforms: Transform[] = [
  {
    id: 'trans-1',
    name: 'Domain to IP',
    description: 'Resolve domain name to IP addresses',
    inputType: ['domain'],
    outputType: 'ip-address',
    category: 'infrastructure',
    enabled: true
  },
  {
    id: 'trans-2',
    name: 'WHOIS Lookup',
    description: 'Get WHOIS registration information',
    inputType: ['domain'],
    outputType: 'person',
    category: 'infrastructure',
    enabled: true
  },
  {
    id: 'trans-3',
    name: 'DNS Records',
    description: 'Retrieve all DNS records',
    inputType: ['domain'],
    outputType: 'domain',
    category: 'infrastructure',
    enabled: true
  },
  {
    id: 'trans-4',
    name: 'Email to Social',
    description: 'Find social media accounts associated with email',
    inputType: ['email'],
    outputType: 'social-account',
    category: 'social',
    requiresAPIKey: true,
    apiKeyService: 'social-search-api',
    enabled: false
  },
  {
    id: 'trans-5',
    name: 'IP Geolocation',
    description: 'Get geographical location of IP address',
    inputType: ['ip-address'],
    outputType: 'location',
    category: 'location',
    enabled: true
  },
  {
    id: 'trans-6',
    name: 'Reverse DNS',
    description: 'Perform reverse DNS lookup on IP',
    inputType: ['ip-address'],
    outputType: 'domain',
    category: 'infrastructure',
    enabled: true
  },
  {
    id: 'trans-7',
    name: 'Subdomain Discovery',
    description: 'Discover subdomains of a domain',
    inputType: ['domain'],
    outputType: 'domain',
    category: 'infrastructure',
    requiresAPIKey: true,
    apiKeyService: 'securitytrails',
    enabled: false
  },
  {
    id: 'trans-8',
    name: 'SSL Certificate',
    description: 'Get SSL certificate information',
    inputType: ['domain', 'ip-address'],
    outputType: 'certificate',
    category: 'infrastructure',
    enabled: true
  },
  {
    id: 'trans-9',
    name: 'ASN Lookup',
    description: 'Get Autonomous System information',
    inputType: ['ip-address'],
    outputType: 'asn',
    category: 'infrastructure',
    enabled: true
  },
  {
    id: 'trans-10',
    name: 'Phone to Person',
    description: 'Find person associated with phone number',
    inputType: ['phone'],
    outputType: 'person',
    category: 'personal',
    requiresAPIKey: true,
    apiKeyService: 'phone-lookup-api',
    enabled: false
  }
];

export const mockDataSources: DataSource[] = [
  {
    id: 'ds-1',
    name: 'WHOIS XML',
    type: 'api',
    category: 'whois',
    enabled: true,
    requiresAuth: true,
    rateLimit: 50
  },
  {
    id: 'ds-2',
    name: 'Google DNS',
    type: 'api',
    category: 'dns',
    enabled: true,
    requiresAuth: false
  },
  {
    id: 'ds-3',
    name: 'IP Geolocation',
    type: 'api',
    category: 'geolocation',
    enabled: true,
    requiresAuth: false
  },
  {
    id: 'ds-4',
    name: 'VirusTotal',
    type: 'api',
    category: 'threat-intel',
    enabled: false,
    requiresAuth: true,
    rateLimit: 15
  },
  {
    id: 'ds-5',
    name: 'Shodan',
    type: 'api',
    category: 'threat-intel',
    enabled: false,
    requiresAuth: true,
    rateLimit: 60
  }
];

export const mockInvestigations: Investigation[] = [
  {
    id: 'inv-1',
    name: 'Phishing Analysis',
    description: 'Investigate suspicious domain and related infrastructure',
    status: 'active',
    entities: mockOSINTEntities,
    relationships: [
      {
        id: 'rel-1',
        sourceId: 'ent-1',
        targetId: 'ent-2',
        type: 'resolves-to',
        label: 'resolves to',
        confidence: 100
      },
      {
        id: 'rel-2',
        sourceId: 'ent-1',
        targetId: 'ent-3',
        type: 'registered-to',
        label: 'registered to',
        confidence: 85
      }
    ],
    transforms: ['trans-1', 'trans-2', 'trans-3'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['phishing', 'malware', 'urgent']
  }
];

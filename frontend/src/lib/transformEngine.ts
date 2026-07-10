import { 
  OSINTEntity, 
  Transform, 
  TransformResult, 
  OSINTEntityType,
  WhoisData,
  DNSData,
  GeoLocationData
} from '@/data/osint';

// Transform Engine - Executes Maltego-like transforms
export class TransformEngine {
  private transforms: Map<string, Transform>;
  private dataSources: Map<string, any>;

  constructor(transforms: Transform[], dataSources: any[] = []) {
    this.transforms = new Map(transforms.map(t => [t.id, t]));
    this.dataSources = new Map(dataSources.map(ds => [ds.id, ds]));
  }

  // Get available transforms for a given entity type
  getAvailableTransforms(entityType: OSINTEntityType): Transform[] {
    return Array.from(this.transforms.values()).filter(
      transform => transform.inputType.includes(entityType) && transform.enabled
    );
  }

  // Execute a transform on an entity
  async executeTransform(
    transformId: string,
    entity: OSINTEntity
  ): Promise<TransformResult> {
    const transform = this.transforms.get(transformId);
    if (!transform) {
      return {
        transformId,
        sourceEntityId: entity.id,
        results: [],
        relationships: [],
        timestamp: new Date().toISOString(),
        success: false,
        error: 'Transform not found'
      };
    }

    if (!transform.inputType.includes(entity.type)) {
      return {
        transformId,
        sourceEntityId: entity.id,
        results: [],
        relationships: [],
        timestamp: new Date().toISOString(),
        success: false,
        error: 'Entity type not supported by this transform'
      };
    }

    try {
      const results = await this.runTransform(transform, entity);
      return {
        transformId,
        sourceEntityId: entity.id,
        results: results.entities,
        relationships: results.relationships,
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      return {
        transformId,
        sourceEntityId: entity.id,
        results: [],
        relationships: [],
        timestamp: new Date().toISOString(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Run specific transform logic
  private async runTransform(
    transform: Transform,
    entity: OSINTEntity
  ): Promise<{ entities: OSINTEntity[]; relationships: any[] }> {
    switch (transform.id) {
      case 'trans-1': // Domain to IP
        return this.domainToIP(entity);
      case 'trans-2': // WHOIS Lookup
        return this.whoisLookup(entity);
      case 'trans-3': // DNS Records
        return this.dnsRecords(entity);
      case 'trans-5': // IP Geolocation
        return this.ipGeolocation(entity);
      case 'trans-6': // Reverse DNS
        return this.reverseDNS(entity);
      case 'trans-8': // SSL Certificate
        return this.sslCertificate(entity);
      case 'trans-9': // ASN Lookup
        return this.asnLookup(entity);
      default:
        // For transforms requiring API keys or not implemented
        if (transform.requiresAPIKey) {
          throw new Error(`Transform requires API key for ${transform.apiKeyService}`);
        }
        throw new Error('Transform not implemented');
    }
  }

  // Transform implementations
  private async domainToIP(entity: OSINTEntity): Promise<{ entities: OSINTEntity[]; relationships: any[] }> {
    // Simulate DNS resolution
    const mockIPs = ['93.184.216.34', '93.184.216.35'];
    const entities: OSINTEntity[] = mockIPs.map((ip, index) => ({
      id: `ent-${Date.now()}-${index}`,
      type: 'ip-address',
      label: ip,
      value: ip,
      properties: { version: 4 },
      confidence: 95,
      source: 'dns-resolution',
      caseId: entity.caseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    const relationships = entities.map(ent => ({
      id: `rel-${Date.now()}-${ent.id}`,
      sourceId: entity.id,
      targetId: ent.id,
      type: 'resolves-to',
      label: 'resolves to',
      confidence: 100
    }));

    return { entities, relationships };
  }

  private async whoisLookup(entity: OSINTEntity): Promise<{ entities: OSINTEntity[]; relationships: any[] }> {
    // Simulate WHOIS data extraction
    const whoisData: WhoisData = {
      registrar: 'Example Registrar Inc.',
      createdDate: '2020-01-15',
      expiryDate: '2025-01-15',
      status: ['clientTransferProhibited'],
      nameServers: ['ns1.example.com', 'ns2.example.com'],
      registrant: {
        name: 'John Doe',
        organization: 'Example Corp',
        email: 'admin@example.com',
        country: 'US'
      }
    };

    // Create person entity from registrant
    const personEntity: OSINTEntity = {
      id: `ent-${Date.now()}-person`,
      type: 'person',
      label: whoisData.registrant?.name || 'Unknown',
      value: whoisData.registrant?.name || '',
      properties: {
        organization: whoisData.registrant?.organization,
        country: whoisData.registrant?.country
      },
      confidence: 75,
      source: 'whois',
      caseId: entity.caseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Create email entity
    const emailEntity: OSINTEntity = {
      id: `ent-${Date.now()}-email`,
      type: 'email',
      label: whoisData.registrant?.email || '',
      value: whoisData.registrant?.email || '',
      properties: { domain: entity.value },
      confidence: 85,
      source: 'whois',
      caseId: entity.caseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const relationships = [
      {
        id: `rel-${Date.now()}-person`,
        sourceId: entity.id,
        targetId: personEntity.id,
        type: 'registered-to',
        label: 'registered to',
        confidence: 75
      },
      {
        id: `rel-${Date.now()}-email`,
        sourceId: personEntity.id,
        targetId: emailEntity.id,
        type: 'has-email',
        label: 'has email',
        confidence: 85
      }
    ];

    return { entities: [personEntity, emailEntity], relationships };
  }

  private async dnsRecords(entity: OSINTEntity): Promise<{ entities: OSINTEntity[]; relationships: any[] }> {
    // Simulate DNS record lookup
    const dnsData: DNSData = {
      A: ['93.184.216.34', '93.184.216.35'],
      MX: [{ exchange: 'mail.example.com', priority: 10 }],
      NS: ['ns1.example.com', 'ns2.example.com'],
      TXT: ['v=spf1 include:_spf.example.com ~all'],
      CNAME: ['www.example.com']
    };

    const entities: OSINTEntity[] = [];

    // Add MX records as domain entities
    dnsData.MX?.forEach((mx, index) => {
      entities.push({
        id: `ent-${Date.now()}-mx-${index}`,
        type: 'domain',
        label: mx.exchange,
        value: mx.exchange,
        properties: { recordType: 'MX', priority: mx.priority },
        confidence: 100,
        source: 'dns',
        caseId: entity.caseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    });

    // Add NS records as domain entities
    dnsData.NS?.forEach((ns, index) => {
      entities.push({
        id: `ent-${Date.now()}-ns-${index}`,
        type: 'domain',
        label: ns,
        value: ns,
        properties: { recordType: 'NS' },
        confidence: 100,
        source: 'dns',
        caseId: entity.caseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    });

    const relationships = entities.map(ent => ({
      id: `rel-${Date.now()}-${ent.id}`,
      sourceId: entity.id,
      targetId: ent.id,
      type: 'has-record',
      label: 'has DNS record',
      confidence: 100
    }));

    return { entities, relationships };
  }

  private async ipGeolocation(entity: OSINTEntity): Promise<{ entities: OSINTEntity[]; relationships: any[] }> {
    // Simulate IP geolocation
    const geoData: GeoLocationData = {
      country: 'United States',
      region: 'California',
      city: 'Los Angeles',
      latitude: 34.0522,
      longitude: -118.2437,
      isp: 'Example ISP LLC',
      org: 'Example Organization',
      timezone: 'America/Los_Angeles'
    };

    const locationEntity: OSINTEntity = {
      id: `ent-${Date.now()}-location`,
      type: 'location',
      label: `${geoData.city}, ${geoData.region}, ${geoData.country}`,
      value: `${geoData.latitude},${geoData.longitude}`,
      properties: geoData,
      confidence: 90,
      source: 'geolocation',
      caseId: entity.caseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const relationship = {
      id: `rel-${Date.now()}`,
      sourceId: entity.id,
      targetId: locationEntity.id,
      type: 'located-in',
      label: 'located in',
      confidence: 90
    };

    return { entities: [locationEntity], relationships: [relationship] };
  }

  private async reverseDNS(entity: OSINTEntity): Promise<{ entities: OSINTEntity[]; relationships: any[] }> {
    // Simulate reverse DNS lookup
    const mockDomains = ['host1.example.com', 'host2.example.com'];
    
    const entities: OSINTEntity[] = mockDomains.map((domain, index) => ({
      id: `ent-${Date.now()}-${index}`,
      type: 'domain',
      label: domain,
      value: domain,
      properties: { reverseOf: entity.value },
      confidence: 95,
      source: 'reverse-dns',
      caseId: entity.caseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    const relationships = entities.map(ent => ({
      id: `rel-${Date.now()}-${ent.id}`,
      sourceId: entity.id,
      targetId: ent.id,
      type: 'reverse-resolves',
      label: 'reverse resolves to',
      confidence: 95
    }));

    return { entities, relationships };
  }

  private async sslCertificate(entity: OSINTEntity): Promise<{ entities: OSINTEntity[]; relationships: any[] }> {
    // Simulate SSL certificate lookup
    const certEntity: OSINTEntity = {
      id: `ent-${Date.now()}-cert`,
      type: 'certificate',
      label: `SSL Certificate for ${entity.value}`,
      value: entity.value,
      properties: {
        issuer: "Let's Encrypt Authority X3",
        subject: entity.value,
        validFrom: '2024-01-01',
        validTo: '2025-01-01',
        fingerprint: 'AB:CD:EF:12:34:56:78:90'
      },
      confidence: 100,
      source: 'ssl',
      caseId: entity.caseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const relationship = {
      id: `rel-${Date.now()}`,
      sourceId: entity.id,
      targetId: certEntity.id,
      type: 'has-certificate',
      label: 'has SSL certificate',
      confidence: 100
    };

    return { entities: [certEntity], relationships: [relationship] };
  }

  private async asnLookup(entity: OSINTEntity): Promise<{ entities: OSINTEntity[]; relationships: any[] }> {
    // Simulate ASN lookup
    const asnEntity: OSINTEntity = {
      id: `ent-${Date.now()}-asn`,
      type: 'asn',
      label: 'AS15169 - Google LLC',
      value: '15169',
      properties: {
        asn: '15169',
        organization: 'Google LLC',
        country: 'US',
        route: '8.8.8.0/24'
      },
      confidence: 100,
      source: 'asn',
      caseId: entity.caseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const relationship = {
      id: `rel-${Date.now()}`,
      sourceId: entity.id,
      targetId: asnEntity.id,
      type: 'belongs-to',
      label: 'belongs to ASN',
      confidence: 100
    };

    return { entities: [asnEntity], relationships: [relationship] };
  }

  // Batch execute multiple transforms
  async executeTransformsBatch(
    transformIds: string[],
    entity: OSINTEntity
  ): Promise<TransformResult[]> {
    const results = await Promise.all(
      transformIds.map(id => this.executeTransform(id, entity))
    );
    return results;
  }

  // Enable/disable transform
  setTransformEnabled(transformId: string, enabled: boolean): void {
    const transform = this.transforms.get(transformId);
    if (transform) {
      transform.enabled = enabled;
    }
  }

  // Add custom transform
  addTransform(transform: Transform): void {
    this.transforms.set(transform.id, transform);
  }

  // Get all transforms
  getAllTransforms(): Transform[] {
    return Array.from(this.transforms.values());
  }
}

// Factory function to create transform engine
export function createTransformEngine(
  transforms: any[],
  dataSources: any[] = []
): TransformEngine {
  return new TransformEngine(transforms, dataSources);
}

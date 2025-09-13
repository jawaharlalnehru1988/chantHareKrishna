import { TestBed } from '@angular/core/testing';
import { HowToChantContentService } from '../services/how-to-chant-content.service';
import { LanguageService } from '../services/language.service';

describe('HowToChantContentService Optimization Test', () => {
  let service: HowToChantContentService;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LanguageService', ['getCurrentLanguage']);
    
    TestBed.configureTestingModule({
      providers: [
        HowToChantContentService,
        { provide: LanguageService, useValue: spy }
      ]
    });
    
    service = TestBed.inject(HowToChantContentService);
    mockLanguageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should load English content successfully', async () => {
    const content = await service.getContent('english');
    expect(content).toContain('How to Use This Application');
    expect(content).toContain('Hare Krishna Mahamantra');
    expect(content.length).toBeGreaterThan(1000); // Ensure content is substantial
  });

  it('should cache content after first load', async () => {
    // Load content first time
    const content1 = await service.getContent('english');
    
    // Check cache info
    const cacheInfo = service.getCacheInfo();
    expect(cacheInfo.size).toBe(1);
    expect(cacheInfo.languages).toContain('english');
    
    // Load same content again (should come from cache)
    const content2 = await service.getContent('english');
    expect(content1).toBe(content2); // Should be exact same reference
  });

  it('should fallback to English for unsupported languages', async () => {
    const content = await service.getContent('unsupported' as any);
    expect(content).toContain('How to Use This Application');
  });

  it('should load Tamil content successfully', async () => {
    const content = await service.getContent('tamil');
    expect(content).toContain('ஹரே கிருஷ்ண');
    expect(content.length).toBeGreaterThan(100);
  });

  it('should clear cache successfully', async () => {
    // Load some content
    await service.getContent('english');
    await service.getContent('tamil');
    
    expect(service.getCacheInfo().size).toBe(2);
    
    // Clear cache
    service.clearCache();
    expect(service.getCacheInfo().size).toBe(0);
  });

  it('should handle preload functionality', async () => {
    await service.preloadContent(['english', 'tamil']);
    
    const cacheInfo = service.getCacheInfo();
    expect(cacheInfo.size).toBe(2);
    expect(cacheInfo.languages).toContain('english');
    expect(cacheInfo.languages).toContain('tamil');
  });
});
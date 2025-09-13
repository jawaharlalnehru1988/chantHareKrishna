import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowToChantPage } from './how-to-chant.page';
import { LanguageService } from '../services/language.service';
import { ThemeService } from '../services/theme.service';
import { HowToChantContentService } from '../services/how-to-chant-content.service';
import { of } from 'rxjs';

describe('HowToChantPage Language Integration', () => {
  let component: HowToChantPage;
  let fixture: ComponentFixture<HowToChantPage>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;
  let mockContentService: jasmine.SpyObj<HowToChantContentService>;

  beforeEach(async () => {
    // Create spies for services
    mockLanguageService = jasmine.createSpyObj('LanguageService', ['setLanguage'], {
      currentLanguage$: of('english'),
      languageOptions: [
        { key: 'english', flag: '🇺🇸', name: 'English', description: 'ENG' },
        { key: 'tamil', flag: '🇮🇳', name: 'தமிழ்', description: 'TAM' },
        { key: 'hindi', flag: '🇮🇳', name: 'हिंदी', description: 'HIN' }
      ]
    });
    
    mockThemeService = jasmine.createSpyObj('ThemeService', [], {
      currentTheme$: of('default')
    });
    
    mockContentService = jasmine.createSpyObj('HowToChantContentService', ['getContent']);
    mockContentService.getContent.and.returnValue(Promise.resolve('<h1>Test Content</h1>'));

    await TestBed.configureTestingModule({
      imports: [HowToChantPage],
      providers: [
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: ThemeService, useValue: mockThemeService },
        { provide: HowToChantContentService, useValue: mockContentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToChantPage);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have language options from service', () => {
    expect(component.languageOptions).toBeDefined();
    expect(component.languageOptions.length).toBe(3);
    expect(component.languageOptions[0].key).toBe('english');
    expect(component.languageOptions[1].key).toBe('tamil');
  });

  it('should handle language change event', () => {
    const mockEvent = {
      detail: {
        value: 'tamil'
      }
    };

    component.onLanguageChange(mockEvent);
    
    expect(mockLanguageService.setLanguage).toHaveBeenCalledWith('tamil');
  });

  it('should not call setLanguage if same language selected', () => {
    component.currentLanguage.set('english');
    
    const mockEvent = {
      detail: {
        value: 'english'
      }
    };

    component.onLanguageChange(mockEvent);
    
    expect(mockLanguageService.setLanguage).not.toHaveBeenCalled();
  });

  it('should load content on initialization', async () => {
    fixture.detectChanges();
    await component.ngOnInit();
    
    expect(mockContentService.getContent).toHaveBeenCalledWith('english');
    expect(component.isLoading()).toBeFalse();
    expect(component.currentContent()).toBe('<h1>Test Content</h1>');
  });
});

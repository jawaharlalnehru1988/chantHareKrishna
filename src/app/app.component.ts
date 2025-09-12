
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, settingsOutline, languageOutline, radioOutline, chatbubblesOutline, documentTextOutline } from 'ionicons/icons';
import { ThemeService } from './services/theme.service';
import { LanguageService, LanguageType, AppContent } from './services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonSelect, IonSelectOption],
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class') themeClass = '';
  
  currentLanguage: LanguageType = 'english';
  content: AppContent = {} as AppContent;
  
  public appPages = [
    { title: 'Chant', url: '/chant', icon: 'radio-outline', titleKey: 'chantMenuItem' as keyof AppContent },
    { title: 'How to Chant', url: '/how-to-chant', icon: 'chatbubbles-outline', titleKey: 'howToChantMenuItem' as keyof AppContent },
    { title: 'Article', url: '/article', icon: 'document-text-outline', titleKey: 'document-text-outline' as keyof AppContent },
    { title: 'Settings', url: '/setting', icon: 'settings-outline', titleKey: 'settingsMenuItem' as keyof AppContent },
  ];
  
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public labelKeys: (keyof AppContent)[] = ['familyLabel', 'friendsLabel', 'notesLabel', 'workLabel', 'travelLabel', 'remindersLabel'];
  
  private themeSubscription: Subscription = new Subscription();
  private languageSubscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService, private languageService: LanguageService) {
    addIcons({ mailOutline, chatbubblesOutline, documentTextOutline, radioOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, settingsOutline, languageOutline });
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.themeClass = theme;
    });
    
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.content = this.languageService.currentContent;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }
  
  // Get language options for dropdown
  get languageOptions() {
    return this.languageService.languageOptions;
  }
  
  // Handle language change from dropdown
  onLanguageChange(event: any) {
    const selectedLanguage = event.detail.value as LanguageType;
    this.languageService.setLanguage(selectedLanguage);
  }
  
  // Get localized menu item title
  getMenuItemTitle(titleKey: keyof AppContent): string {
    return this.content[titleKey] as string;
  }
  
  // Get localized label
  getLabel(labelKey: keyof AppContent): string {
    return this.content[labelKey] as string;
  }
}

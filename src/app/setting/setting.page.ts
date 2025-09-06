import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon, IonButtons, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { ThemeService, ThemeType, ThemeOption } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { colorPaletteOutline, settingsOutline, brushOutline, checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonButtons, IonMenuButton, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, CommonModule, FormsModule]
})
export class SettingPage implements OnInit, OnDestroy {
  @HostBinding('class') themeClass = '';
  
  currentTheme: ThemeType = 'theme-ocean';
  themes: ThemeOption[] = [];
  private themeSubscription: Subscription = new Subscription();

  constructor(public themeService: ThemeService) {
    addIcons({settingsOutline,colorPaletteOutline,checkmarkCircle,brushOutline});
  }

  ngOnInit() {
    this.themes = this.themeService.themes;
    this.currentTheme = this.themeService.getCurrentTheme();
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.themeClass = theme;
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  onThemeChange(event: any) {
    const selectedTheme = event.detail.value as ThemeType;
    this.themeService.setTheme(selectedTheme);
  }

  selectTheme(theme: ThemeType) {
    this.themeService.setTheme(theme);
  }

  getCurrentThemeName(): string {
    const theme = this.themeService.getThemeByKey(this.currentTheme);
    return theme ? theme.name : 'Unknown';
  }
}

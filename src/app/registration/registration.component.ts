import { Component, OnInit, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonButtons, 
  IonIcon, 
  IonSelect, 
  IonSelectOption,
  IonToast,
  ModalController
} from '@ionic/angular/standalone';
import { closeOutline, checkmarkOutline, personOutline, callOutline, mailOutline, keypadOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { ProgressService, UserProfile } from '../services/progress.service';
import { LanguageService, LanguageType, AppContent } from '../services/language.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonIcon,
    IonToast
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  
  registrationForm: FormGroup;
  contactMethod = signal<'phone' | 'email'>('phone');
  isLoading = signal<boolean>(false);
  showToast = signal<boolean>(false);
  toastMessage = signal<string>('');
  
  // Language support
  currentLanguage: LanguageType = 'english';
  
  // Get current content (computed from selected language via LanguageService)
  get content(): AppContent {
    return this.languageService.getContent(this.currentLanguage);
  }
  
  get registrationContent() {
    return this.content.progressTracker.registration;
  }
  
  constructor(
    private fb: FormBuilder,
    private progressService: ProgressService,
    private languageService: LanguageService,
    private modalController: ModalController
  ) {
    addIcons({
      closeOutline,
      checkmarkOutline,
      personOutline,
      callOutline,
      mailOutline,
      keypadOutline
    });
    
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: [''],
      email: [''],
      pincode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern(/^\d+$/)]]
    });
    
    // Update validators based on contact method
    this.updateValidators();
  }
  
  ngOnInit() {
    // Set up reactive form validation based on contact method
    this.contactMethod.set('phone');
    
    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }
  
  // Update form validators based on contact method selection
  updateValidators() {
    const phoneControl = this.registrationForm.get('phone');
    const emailControl = this.registrationForm.get('email');
    
    if (this.contactMethod() === 'phone') {
      phoneControl?.setValidators([Validators.required, Validators.pattern(/^\d{10}$/)]);
      emailControl?.clearValidators();
    } else {
      emailControl?.setValidators([Validators.required, Validators.email]);
      phoneControl?.clearValidators();
    }
    
    phoneControl?.updateValueAndValidity();
    emailControl?.updateValueAndValidity();
  }
  
  // Change contact method
  setContactMethod(method: 'phone' | 'email') {
    this.contactMethod.set(method);
    this.updateValidators();
    
    // Clear the other field
    if (method === 'phone') {
      this.registrationForm.get('email')?.setValue('');
    } else {
      this.registrationForm.get('phone')?.setValue('');
    }
  }
  
  // Validate form
  isFormValid(): boolean {
    return this.registrationForm.valid;
  }
  
  // Get form control error
  getFieldError(fieldName: string): string {
    const control = this.registrationForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldName} is required`;
      }
      if (control.errors['minLength']) {
        return `${fieldName} is too short`;
      }
      if (control.errors['maxLength']) {
        return `${fieldName} is too long`;
      }
      if (control.errors['pattern']) {
        if (fieldName === 'phone') {
          return 'Phone number must be 10 digits';
        }
        if (fieldName === 'pincode') {
          return 'PIN must contain only numbers';
        }
      }
      if (control.errors['email']) {
        return 'Invalid email format';
      }
    }
    return '';
  }
  
  // Submit registration
  async onSubmit() {
    if (!this.isFormValid()) {
      this.showToastMessage('Please fill all required fields correctly');
      return;
    }
    
    this.isLoading.set(true);
    
    try {
      const formValues = this.registrationForm.value;
      
      const userProfile: UserProfile = {
        id: this.generateUserId(),
        name: formValues.name,
        phone: this.contactMethod() === 'phone' ? formValues.phone : undefined,
        email: this.contactMethod() === 'email' ? formValues.email : undefined,
        pincode: formValues.pincode,
        registrationDate: new Date().toISOString(),
        isRegistered: true
      };
      
      // TODO: Call API for registration
      // For now, we'll save locally and simulate API call
      await this.simulateApiRegistration(userProfile);
      
      // Save to progress service
      this.progressService.setUserProfile(userProfile);
      
      this.showToastMessage('Registration successful! Welcome to Hare Krishna chanting tracker.');
      
      // Close modal after short delay
      setTimeout(() => {
        this.closeModal();
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      this.showToastMessage('Registration failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
  
  // Generate unique user ID
  private generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  // Simulate API registration call
  private async simulateApiRegistration(userProfile: UserProfile): Promise<void> {
    // TODO: Replace with actual API call
    // const apiUrl = 'https://your-api-endpoint.com/register';
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userProfile)
    // });
    
    // if (!response.ok) {
    //   throw new Error('Registration failed');
    // }
    
    // For now, simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }
  
  // Show toast message
  private showToastMessage(message: string) {
    this.toastMessage.set(message);
    this.showToast.set(true);
  }
  
  // Close modal
  async closeModal() {
    await this.modalController.dismiss();
  }
  
  // Skip registration (use local storage only)
  async skipRegistration() {
    const guestProfile: UserProfile = {
      id: 'guest_' + Date.now(),
      name: 'Guest User',
      pincode: '0000',
      registrationDate: new Date().toISOString(),
      isRegistered: false
    };
    
    this.progressService.setUserProfile(guestProfile);
    this.showToastMessage('Continuing as guest. Your data will be stored locally.');
    
    setTimeout(() => {
      this.closeModal();
    }, 1500);
  }
}

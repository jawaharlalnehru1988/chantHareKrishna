import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonCard,
  IonCardContent,
  IonToast,
  ModalController
} from '@ionic/angular/standalone';
import {
  closeOutline,
  saveOutline,
  calendarOutline,
  trendingUpOutline, createOutline, syncOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { ProgressService, ChantingRecord } from '../../services/progress.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonCard,
    IonCardContent,
    IonToast
  ]
})
export class EditRecordComponent implements OnInit {
  
  @Input() record!: ChantingRecord;
  @Output() recordUpdated = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();
  
  editForm!: FormGroup;
  showToast = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastColor = signal<string>('success');
  
  // Rounds options (0-128)
  roundsOptions = Array.from({length: 129}, (_, i) => i);
  
  constructor(
    private formBuilder: FormBuilder,
    private progressService: ProgressService,
    private modalController: ModalController
  ) {
    addIcons({createOutline,closeOutline,calendarOutline,trendingUpOutline,syncOutline,saveOutline});
  }
  
  ngOnInit() {
    this.initializeForm();
  }
  
  private initializeForm() {
    this.editForm = this.formBuilder.group({
      date: [this.record.date, [Validators.required]],
      rounds: [this.record.rounds, [Validators.required, Validators.min(0), Validators.max(128)]],
      isAutoSynced: [this.record.isAutoSynced]
    });
  }
  
  // Close modal
  closeModal() {
    this.modalClosed.emit();
  }
  
  // Save changes
  async saveChanges() {
    if (!this.editForm.valid) {
      this.showToastMessage('Please fill all required fields correctly', 'danger');
      return;
    }
    
    const formValue = this.editForm.value;
    const newDate = formValue.date;
    const newRounds = parseInt(formValue.rounds, 10);
    
    // Check if date is in the future
    if (this.progressService.isFutureDate(newDate)) {
      this.showToastMessage('Cannot set future dates', 'danger');
      return;
    }
    
    // If date changed, check if new date already has a record
    if (newDate !== this.record.date) {
      const existingRecord = this.progressService.getChantingRecord(newDate);
      if (existingRecord) {
        this.showToastMessage('A record already exists for this date', 'danger');
        return;
      }
      
      // Delete old record first
      this.progressService.deleteChantingRecord(this.record.date);
    }
    
    // Create updated record
    const updatedRecord: ChantingRecord = {
      date: newDate,
      rounds: newRounds,
      timestamp: Date.now(), // Update timestamp
      isAutoSynced: formValue.isAutoSynced
    };
    
    // Save updated record
    this.progressService.addChantingRecord(updatedRecord);
    
    this.showToastMessage('Record updated successfully!', 'success');
    
    // Emit success and close after delay
    setTimeout(() => {
      this.recordUpdated.emit();
    }, 1500);
  }
  
  // Format date for display
  formatDate(dateString: string): string {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Get today's date for max validation
  getTodaysDate(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  // Handle date change
  onDateChange(event: any) {
    const selectedDate = event.detail.value.split('T')[0];
    this.editForm.patchValue({ date: selectedDate });
  }
  
  // Handle rounds change
  onRoundsChange(event: any) {
    const rounds = parseInt(event.detail.value, 10);
    this.editForm.patchValue({ rounds: rounds });
  }
  
  // Handle sync type change
  onSyncTypeChange(event: any) {
    const isAutoSynced = event.detail.value === 'auto';
    this.editForm.patchValue({ isAutoSynced: isAutoSynced });
  }
  
  // Show toast message
  private showToastMessage(message: string, color: string = 'success') {
    this.toastMessage.set(message);
    this.toastColor.set(color);
    this.showToast.set(true);
  }
  
  // Get form field error
  getFieldError(fieldName: string): string | null {
    const field = this.editForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['min']) {
        return `${fieldName} cannot be less than ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `${fieldName} cannot be more than ${field.errors['max'].max}`;
      }
    }
    return null;
  }
  
  // Check if form is valid
  isFormValid(): boolean {
    return this.editForm.valid;
  }
}
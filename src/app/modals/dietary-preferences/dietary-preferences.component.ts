import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dietary-preferences-modal',
  imports: [],
  templateUrl: './dietary-preferences.component.html',
  styleUrls: ['./dietary-preferences.component.css']
})
export class DietaryPreferencesModalComponent {
  @Input() isOpen = false;
  @Input() allPreferences: string[] = [];
  @Input() userPreferences: string[] = [];
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string[]>();
  
  selectedPreferences: string[] = [];

  ngOnChanges() {
    if (this.isOpen) {
      this.selectedPreferences = [...this.userPreferences];
    }
  }

  togglePreference(preference: string) {
    if (this.isSelected(preference)) {
      this.selectedPreferences = this.selectedPreferences.filter(p => p !== preference);
    } else {
      this.selectedPreferences = [...this.selectedPreferences, preference];
    }
  }

  isSelected(preference: string): boolean {
    return this.selectedPreferences.includes(preference);
  }

  onSave() {
    this.save.emit(this.selectedPreferences);
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }
}
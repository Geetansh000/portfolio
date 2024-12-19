import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-step-detail-dialog',
  standalone: true,
  imports: [MatCardModule, CommonModule, SharedModule],
  templateUrl: './step-detail-dialog.component.html',
  styleUrls: ['./step-detail-dialog.component.scss'],
})
export class StepDetailDialogComponent {
  @Input() step!: {
    title: string;
    description: string;
    longDescription: string;
  };
  
  showPopup: boolean = false;
  ngOnInit(): void {
    this.showPopup = true;
  }

  openDetails(): void {
    this.showPopup = true;
  }

  closeDetails(): void {
    this.showPopup = false;
  }
}

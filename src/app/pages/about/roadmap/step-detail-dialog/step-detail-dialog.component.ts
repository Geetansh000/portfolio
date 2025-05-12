import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-step-detail-dialog',
  standalone: true,
  imports: [MatCardModule, CommonModule, SharedModule],
  templateUrl: './step-detail-dialog.component.html',
  styleUrls: ['./step-detail-dialog.component.scss'],
})
export class StepDetailDialogComponent {
  constructor(private sanitizer: DomSanitizer) {}
  @Input() step!: {
    title: string;
    description: string;
    longDescription: string;
    strongWords: string[];
  };

  showPopup: boolean = false;
  ngOnInit(): void {
    this.showPopup = true;
  }
  getFormattedLongDescription(): SafeHtml {
    let desc = this.step.longDescription;
    this.step.strongWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      desc = desc.replace(regex, `<strong>$1</strong>`);
    });
    return this.sanitizer.bypassSecurityTrustHtml(desc);
  }
  openDetails(): void {
    this.showPopup = true;
  }

  closeDetails(): void {
    this.showPopup = false;
  }
}

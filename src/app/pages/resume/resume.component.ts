import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent {
  pdfUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const rawUrl = '/assets/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0';
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent {
  pdfBlobUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    fetch('assets/Resume.pdf')
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        this.pdfBlobUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
  }
}

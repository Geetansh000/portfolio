import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { gsap } from 'gsap';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MessageSentDialogComponent } from './message-sent-dialog/message-sent-dialog.component';
import { ApiRoutesService } from '../../shared/api-routes.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  constructor(
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    private projectService: ApiRoutesService
  ) {}

  formData = {
    name: '',
    email: '',
    message: '',
  };

  formSubmitted = false;

  @ViewChild('contactForm') contactForm!: ElementRef;

  ngAfterViewInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      console.log('Form Data:', formData);
      this.projectService.submitContactForm(formData).subscribe({
        next: (data) => {
          form.resetForm();
          this.formSubmitted = false;

          this.dialog.open(MessageSentDialogComponent, {
            panelClass: 'message-sent-dialog',
          });
        },
        error: (err) => {
          console.error('Failed to load projects', err);
        },
      });

      // Open success dialog
    }
  }
}

import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MessageSentDialogComponent } from './message-sent-dialog/message-sent-dialog.component';

@Component({
  selector: 'app-contact',
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
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  formData = {
    name: '',
    email: '',
    message: '',
  };

  formSubmitted = false;

  @ViewChild('contactForm') contactForm!: ElementRef;

  ngOnInit() {
    this.animateForm();
  }

  animateForm() {
    gsap.from('.contact-title', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.form-group', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.submit-btn', {
      opacity: 0,
      scale: 0.8,
      delay: 1,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      form.resetForm();
      this.formSubmitted = false;

      // Open success dialog
      this.dialog.open(MessageSentDialogComponent, {
        panelClass: 'message-sent-dialog',
      });
    }
  }
}

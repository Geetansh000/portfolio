import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';

@Component({
  selector: 'app-message-sent-dialog',
  imports: [
    CommonModule,
    MatIconModule, // ✅ This is required for <mat-icon> to work
  ],
  templateUrl: './message-sent-dialog.component.html',
  styleUrl: './message-sent-dialog.component.scss',
  // animations: [
  //   trigger('popAnimation', [
  //     transition(':enter', [
  //       style({ transform: 'scale(0.5)', opacity: 0 }),
  //       animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
  //     ]),
  //   ]),
  // ],
})
export class MessageSentDialogComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const icon = document.querySelector('.sent-icon');
    const message = document.querySelector('.sent-message');

    // Step 1: Fly the icon from left to center
    gsap.fromTo(
      icon,
      {
        x: -300,
        y: 100,
        opacity: 0,
        rotation: -45,
        scale: 0.5,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1.5,
        duration: 1.2,
        ease: 'power2.out',
      }
    );

    // Step 2: Show message after icon lands
    gsap.from(message, {
      opacity: 0,
      y: 20,
      delay: 1.2,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
}

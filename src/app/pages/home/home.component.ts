import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, DestroyRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MatCardModule],
  standalone: true,
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private destroyRef: DestroyRef
  ) {}

  private textArray: string[] = [
    'Welcome to the World of Geetansh Sharma , a Software Developer, Expert in Node.js, NestJS, and Python ML',
  ];
  private typingSpeed: number = 100; // Speed of typing
  private erasingSpeed: number = 50; // Speed of erasing
  private newTextDelay: number = 2000; // Delay before typing the next string
  private currentIndex: number = 0; // Index of the current string
  private charIndex: number = 0; // Index of the current character
  private isErasing: boolean = false; // Whether the text is being erased
  private typingTimeoutId: number | null = null; // Store timeout ID for cleanup

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingEffect();
    }
  }

  private startTypingEffect(): void {
    const dynamicTextElement = document.getElementById('dynamic-text');

    if (dynamicTextElement) {
      if (
        !this.isErasing &&
        this.charIndex < this.textArray[this.currentIndex].length
      ) {
        // Typing characters
        dynamicTextElement.textContent += this.textArray[
          this.currentIndex
        ].charAt(this.charIndex);
        this.charIndex++;
        this.typingTimeoutId = window.setTimeout(() => this.startTypingEffect(), this.typingSpeed);
        this.destroyRef.onDestroy(() => {
          if (this.typingTimeoutId !== null) clearTimeout(this.typingTimeoutId);
        });
      } else if (this.isErasing && this.charIndex > 0) {
        // Erasing characters
        dynamicTextElement.textContent = this.textArray[
          this.currentIndex
        ].substring(0, this.charIndex - 1);
        this.charIndex--;
        this.typingTimeoutId = window.setTimeout(() => this.startTypingEffect(), this.erasingSpeed);
        this.destroyRef.onDestroy(() => {
          if (this.typingTimeoutId !== null) clearTimeout(this.typingTimeoutId);
        });
      } else {
        // Switch between typing and erasing
        this.isErasing = !this.isErasing;

        if (!this.isErasing) {
          // Move to the next string in the array
          this.currentIndex = (this.currentIndex + 1) % this.textArray.length;
        }
        this.typingTimeoutId = window.setTimeout(() => this.startTypingEffect(), this.newTextDelay);
        this.destroyRef.onDestroy(() => {
          if (this.typingTimeoutId !== null) clearTimeout(this.typingTimeoutId);
        });
      }
    }
  }
}

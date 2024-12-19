import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule],
})
export class HomeComponent implements OnInit {
  private textArray: string[] = [
    'Welcome to the World of Geetansh Sharma , a Software Developer, Expert in Node.js, NestJS, and Python ML',
  ];
  private typingSpeed: number = 100; // Speed of typing
  private erasingSpeed: number = 50; // Speed of erasing
  private newTextDelay: number = 2000; // Delay before typing the next string
  private currentIndex: number = 0; // Index of the current string
  private charIndex: number = 0; // Index of the current character
  private isErasing: boolean = false; // Whether the text is being erased

  ngOnInit(): void {
    this.startTypingEffect();
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
        setTimeout(() => this.startTypingEffect(), this.typingSpeed);
      } else if (this.isErasing && this.charIndex > 0) {
        // Erasing characters
        dynamicTextElement.textContent = this.textArray[
          this.currentIndex
        ].substring(0, this.charIndex - 1);
        this.charIndex--;
        setTimeout(() => this.startTypingEffect(), this.erasingSpeed);
      } else {
        // Switch between typing and erasing
        this.isErasing = !this.isErasing;

        if (!this.isErasing) {
          // Move to the next string in the array
          this.currentIndex = (this.currentIndex + 1) % this.textArray.length;
        }
        setTimeout(() => this.startTypingEffect(), this.newTextDelay);
      }
    }
  }
}

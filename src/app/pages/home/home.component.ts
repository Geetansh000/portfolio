import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('cardAnimation', [
      state('collapsed', style({ height: '0px', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent {
  private textArray: string[] = [
    'Welcome to my portfolio!',
    "Hi, I'm Geetansh Sharma.",
    'A passionate Software Developer.',
    'Expertise in Node.js, NestJS, and Python.',
    'Building scalable applications.',
    'Enjoy exploring my work!',
  ];

  messages: string[] = [];
  cardState = 'collapsed';

  ngOnInit() {
    this.displayMessages();
  }

  displayMessages() {
    this.cardState = 'expanded';
    let i = 0;
    const interval = setInterval(() => {
      if (i < this.textArray.length) {
        this.messages.push(this.textArray[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.messages = [];
          this.cardState = 'collapsed';
        }, 2000);
      }
    }, 1000);
  }
}

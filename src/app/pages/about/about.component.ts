import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { RoadmapComponent } from './roadmap/roadmap.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [MatCardModule, CommonModule, RoadmapComponent, SharedModule],
  standalone: true,
})
export class AboutComponent {}

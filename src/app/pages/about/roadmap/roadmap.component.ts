import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { StepDetailDialogComponent } from './step-detail-dialog/step-detail-dialog.component';

interface JourneyStep {
  title: string;
  description: string;
  longDescription: string;
  strongWords: string[];
  year: string;
  badge: string;
  icon: string;
}

@Component({
  selector: 'app-roadmap',
  standalone: true,
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss',
  imports: [MatCardModule, SharedModule, CommonModule],
})
export class RoadmapComponent {
  // List of steps
  steps: JourneyStep[] = [
    {
      title: 'Academic Spark',
      description: 'State rank in class 10 board exams',
      longDescription:
        'My journey began with strong academic foundations: In my 10th board exams, I achieved a state ranking as the 13th holder – an early sign of dedication and excellence.',
      strongWords: ['10th board exams', 'state ranking', '13th'],
      year: '2018',
      badge: 'Foundation',
      icon: 'assets/icons/journey/foundation.svg',
    },
    {
      title: 'PCM Hat-Trick',
      description: '95 marks in Physics, Chemistry, and Mathematics',
      longDescription:
        'The foundation of my academic journey was firmly established during my 12th grade, where I secured a district-level top rank in the physics exam, achieving an exceptional hat-trick score of 95 in Physics, Chemistry, and Mathematics. This phase was instrumental in refining my analytical thinking and setting the stage for my future in engineering and technology.',
      strongWords: [
        '12th grade',
        'district-level',
        'top rank',
        'physics exam',
        'hat-trick score',
        'Physics, Chemistry, and Mathematics',
        'analytical thinking',
        'engineering and technology',
        '95',
      ],
      year: '2020',
      badge: 'Academic Peak',
      icon: 'assets/icons/journey/academic-peak.svg',
    },
    {
      title: 'AI/ML Engineering',
      description: 'B.Tech specialization in Artificial Intelligence and Machine Learning',
      longDescription:
        'Driven by a passion for technology, I pursued a Bachelor of Technology at Chandigarh University with a specialization in Artificial Intelligence and Machine Learning, studying from August 2020 to June 2024. This phase exposed me to cutting-edge innovations and practical problem-solving projects.',
      strongWords: [
        'Chandigarh University',
        'Artificial Intelligence',
        'Machine Learning',
        'August 2020',
        'June 2024',
      ],
      year: '2020-2024',
      badge: 'University Track',
      icon: 'assets/icons/journey/ai-ml.svg',
    },
    {
      title: 'Industry Launch',
      description: 'Software Engineer at Daffodil Softwares',
      longDescription:
        'Transitioning from academia to the professional world, I started my career as a Software Engineer at Daffodil Softwares in January 2024. Here, I apply the knowledge gained from my studies to develop and deploy scalable software solutions in real-world scenarios.',
      strongWords: [
        'Daffodil Softwares',
        'January 2024',
        'real-world scenarios',
      ],
      year: '2024',
      badge: 'Professional',
      icon: 'assets/icons/journey/industry-launch.svg',
    },
    {
      title: 'Real-World Impact',
      description: 'Rapid delivery, strong ownership, and high client confidence',
      longDescription:
        'From academic excellence to real-world impact, I’ve been recognized for quickly mastering new technologies, exceeding client expectations, and contributing reliably to team success — all reflected in the projects.',
      strongWords: [
        'academic excellence',
        'real-world impact',
        'mastering new technologies',
        'client expectations',
        'the projects',
      ],
      year: 'Now',
      badge: 'Growth Mode',
      icon: 'assets/icons/journey/impact.svg',
    },
  ];

  constructor(private dialog: MatDialog) {}

  private activeDialogRef: MatDialogRef<StepDetailDialogComponent> | null = null;

  openStepDetail(step: JourneyStep): void {
    if (this.activeDialogRef) return; // already open
    this.activeDialogRef = this.dialog.open(StepDetailDialogComponent, {
      autoFocus: false,
      restoreFocus: true,
    });
    this.activeDialogRef.componentInstance.step = step;
    this.activeDialogRef.beforeClosed().subscribe(() => {
      this.activeDialogRef = null;
    });
    this.activeDialogRef.afterClosed().subscribe(() => {
      this.activeDialogRef = null;
    });
  }

  currentStep = -1;

  goToStep(index: number): void {
    this.currentStep = index;
    this.openStepDetail(this.steps[index]);
  }
  //   // List of roadmap steps
  //   steps = [
  //     { title: 'Step 1', shortDescription: 'Introduction' },
  //     { title: 'Step 2', shortDescription: 'Learning Angular' },
  //     { title: 'Step 3', shortDescription: 'Building Projects' },
  //     { title: 'Step 4', shortDescription: 'Advanced Concepts' },
  //     { title: 'Step 5', shortDescription: 'Deployment' },
  //   ];

  //   currentStep: number = 0; // Active step index
  //   planePosition: number = 0; // Position of the airplane on the scroll
  //   stepOffsets: number[] = []; // Holds top offsets for each step

  //   // Initialize step offsets after view is loaded
  //   ngAfterViewInit(): void {
  //     this.calculateStepOffsets();
  //   }

  //   // Dynamically calculate top positions of steps
  //   calculateStepOffsets(): void {
  //     const stepElements = document.querySelectorAll('.step-card');
  //     this.stepOffsets = Array.from(stepElements).map((step: any) =>
  //       step.offsetTop
  //     );
  //   }

  //   // Host listener for scroll detection
  //   @HostListener('window:scroll', ['$event'])
  //   onWindowScroll(): void {
  //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //     const container = document.querySelector(
  //       '.roadmap-container'
  //     ) as HTMLElement;

  //     if (container) {
  //       const containerTop = container.offsetTop;
  //       const containerHeight = container.offsetHeight;
  //       const scrollRange = containerHeight - window.innerHeight;

  //       // Update airplane position based on scroll
  //       this.planePosition = Math.min(
  //         Math.max(
  //           (scrollTop - containerTop) * (containerHeight / scrollRange),
  //           0
  //         ),
  //         containerHeight - 50 // Keep airplane within bounds
  //       );

  //       // Update active step dynamically on scroll
  //       this.updateActiveStep(scrollTop);
  //     }
  //   }

  //   // Dynamically set active step based on scroll position
  //   updateActiveStep(scrollTop: number): void {
  //     for (let i = 0; i < this.stepOffsets.length; i++) {
  //       if (
  //         scrollTop >= this.stepOffsets[i] - 200 && // Offset threshold
  //         (i === this.stepOffsets.length - 1 || scrollTop < this.stepOffsets[i + 1] - 200)
  //       ) {
  //         this.currentStep = i;
  //         break;
  //       }
  //     }
  //   }

  //   // Navigate to a specific step when card is clicked
  //   goToStep(index: number): void {
  //     this.currentStep = index;
  //     const stepElement = document.querySelectorAll('.step-card')[index] as HTMLElement;

  //     if (stepElement) {
  //       window.scrollTo({
  //         top: stepElement.offsetTop - 100,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }

  //   // Placeholder for pop-up or step details
  //   openStepDetail(step: any): void {
  //     alert(`Details for ${step.title}: ${step.shortDescription}`);
  //   }
}

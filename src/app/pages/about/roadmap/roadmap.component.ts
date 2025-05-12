import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { StepDetailDialogComponent } from './step-detail-dialog/step-detail-dialog.component';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  imports: [MatCardModule, SharedModule, CommonModule],
})
export class RoadmapComponent {
  // List of steps
  steps = [
    {
      title: 'Step 1',
      description: 'Start of your journey',
      longDescription:
        'My journey began with strong academic foundations: In my 10th board exams, I achieved a state ranking as the 13th holder – an early sign of dedication and excellence.',
      strongWords: ['10th board exams', 'state ranking', '13th'],
    },
    {
      title: 'Step 2',
      description: 'Building your foundation',
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
    },
    {
      title: 'Step 3',
      description: 'Exploring new technologies',
      longDescription:
        'Driven by a passion for technology, I pursued a Bachelor of Technology at Chandigarh University with a specialization in Artificial Intelligence and Machine Learning, studying from August 2020 to June 2024. This phase exposed me to cutting-edge innovations and practical problem-solving projects.',
      strongWords: [
        'Chandigarh University',
        'Artificial Intelligence',
        'Machine Learning',
        'August 2020',
        'June 2024',
      ],
    },
    {
      title: 'Step 4',
      description: 'Deploying scalable solutions',
      longDescription:
        'Transitioning from academia to the professional world, I started my career as a Software Engineer at Daffodil Softwares in January 2024. Here, I apply the knowledge gained from my studies to develop and deploy scalable software solutions in real-world scenarios.',
      strongWords: [
        'Daffodil Softwares',
        'January 2024',
        'real-world scenarios',
      ],
    },
    {
      title: 'Step 5',
      description: 'Achieving milestones',
      longDescription:
        'From academic excellence to real-world impact, I’ve been recognized for quickly mastering new technologies, exceeding client expectations, and contributing reliably to team success — all reflected in the projects.',
      strongWords: [
        'academic excellence',
        'real-world impact',
        'mastering new technologies',
        'client expectations',
        'the projects',
      ],
    },
  ];

  constructor(private dialog: MatDialog) {}

  openStepDetail(step: any): void {
    const dialogRef = this.dialog.open(StepDetailDialogComponent);
    // Pass the data to the dialog component using its instance
    dialogRef.componentInstance.step = step;
  }

  currentStep = -1; // Active step
  aeroplanePosition = 0; // Aeroplane's position in percentage

  // Function to move to a particular step
  goToStep(index: number): void {
    this.currentStep = index;
    this.openStepDetail(this.steps[index]);
    // this.aeroplanePosition = (index / (this.steps.length - 1)) * 100; // Move aeroplane
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const container = document.querySelector(
      '.roadmap-container'
    ) as HTMLElement;

    if (container) {
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollRange = containerHeight - window.innerHeight;

      // Calculate plane position relative to scroll
      this.aeroplanePosition = Math.min(
        Math.max(
          ((scrollTop - containerTop) / scrollRange) * containerHeight,
          0
        ),
        containerHeight - 150 // Keep the plane within bounds
      );
    }
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

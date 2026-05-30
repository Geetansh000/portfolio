import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ApiRoutesService } from '../../shared/api-routes.service';
import { LoaderDialogComponent } from '../../shared/loader-dialog/loader-dialog.component';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnDestroy {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private readonly projectService: ApiRoutesService,
    private readonly cdr: ChangeDetectorRef
  ) {}
  selectedProject: any;
  display = false;
  projects: any[] = [];
  activeIndex = 0;
  @ViewChild('projectSlider', { static: false }) slider!: ElementRef;
  private autoSlideInterval: any;
  private autoSlideStarted = false;
  private dialogRef: MatDialogRef<LoaderDialogComponent> | null = null;
  private pendingTimeouts: number[] = [];

  ngOnInit(): void {
    // Keep ngOnInit side-effect free to avoid NG0100 in Angular 21 dev mode.
  }

  ngAfterViewInit() {
    const initTimeout = window.setTimeout(() => {
      this.dialogRef = this.dialog.open(LoaderDialogComponent);
      this.getProjectList();

      // Second call after 10 seconds if still no projects
      const retryTimeout = window.setTimeout(() => {
        if (!this.projects.length) {
          this.getProjectList();
        }
      }, 10000);
      this.pendingTimeouts.push(retryTimeout);

      // Close loader after 20 seconds if still no data
      const closeTimeout = window.setTimeout(() => {
        if (!this.projects.length) {
          this.dialogRef?.close();
        }
      }, 20000);
      this.pendingTimeouts.push(closeTimeout);

      this.scrollToActive();
      this.attachScrollListener();
    }, 0);
    this.pendingTimeouts.push(initTimeout);
  }

  getProjectList() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        const renderTimeout = window.setTimeout(() => {
          this.projects = [...data];
          this.activeIndex = this.getActiveIndex();
          this.cdr.detectChanges();

          if (!this.autoSlideStarted && this.projects.length > 1) {
            this.startAutoSlide();
            this.autoSlideStarted = true;
          }

          const closeTimeout = window.setTimeout(() => {
            this.dialogRef?.close();
            this.display = true;
            this.cdr.detectChanges();
          }, 300); // smoother transition
          this.pendingTimeouts.push(closeTimeout);
        }, 0);
        this.pendingTimeouts.push(renderTimeout);
      },

      error: (err) => {
        console.error('Failed to load projects', err);
      },
    });
  }
  attachScrollListener() {
    if (this.slider?.nativeElement) {
      this.slider.nativeElement.addEventListener(
        'scroll',
        this.handleScroll.bind(this)
      );
    }
  }

  handleScroll() {
    const container = this.slider.nativeElement as HTMLElement;
    const children = Array.from(container.querySelectorAll('.project-card'));

    const containerCenter = container.offsetLeft + container.offsetWidth / 2;

    let closestCard: HTMLElement | null = null;
    let minDistance = Number.MAX_VALUE;

    children.forEach((child) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
      }
    });

    if (closestCard) {
      this.setActiveCard(closestCard);
    }
  }
  setActiveCard(activeCard: HTMLElement) {
    const cards = this.slider.nativeElement.querySelectorAll('.project-card');

    cards.forEach((card: HTMLElement, index: any) => {
      card.classList.remove('active', 'blurred-left', 'blurred-right');
    });

    const activeIndex = Array.from(cards).indexOf(activeCard);

    cards.forEach((card: HTMLElement, index: any) => {
      if (index === activeIndex) {
        card.classList.add('active');
      } else if (index === activeIndex - 1) {
        card.classList.add('blurred-left');
      } else if (index === activeIndex + 1) {
        card.classList.add('blurred-right');
      }
    });
  }
  scrollLeft() {
    const last = this.projects.pop();
    if (last) {
      this.projects.unshift(last);
      this.activeIndex = this.getActiveIndex();
      this.triggerCardAnimation();
      this.scrollToActive();
    }
  }

  scrollRight() {
    const first = this.projects.shift();
    if (first) {
      this.projects.push(first);
      this.activeIndex = this.getActiveIndex();
      this.triggerCardAnimation();
      this.scrollToActive();
    }
  }
  triggerCardAnimation() {
    const animTimeout = window.setTimeout(() => {
      const container = this.slider.nativeElement as HTMLElement;
      container.querySelectorAll('.project-card').forEach((card) => {
        card.classList.remove('entering');
      });

      const activeCard = container.querySelector('.project-card.active');
      if (activeCard) {
        activeCard.classList.add('entering');
      }
    }, 0);
    this.pendingTimeouts.push(animTimeout);
  }

  scrollToActive() {
    const container = this.slider.nativeElement as HTMLElement;
    const activeCard = container.querySelector(
      '.project-card.active'
    ) as HTMLElement;

    if (activeCard) {
      activeCard.classList.add('entering');
      const cleanupTimeout = window.setTimeout(() => activeCard.classList.remove('entering'), 600);
      this.pendingTimeouts.push(cleanupTimeout);

      const containerCenter = container.offsetWidth / 2;
      const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
      container.scrollTo({
        left: cardCenter - containerCenter,
        behavior: 'smooth',
      });
    }
  }

  getActiveIndex(): number {
    return Math.floor(this.projects.length / 2);
  }
  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval); // 🧹 Clean up interval
    this.pendingTimeouts.forEach((timeoutId) => clearTimeout(timeoutId)); // 🧹 Clean up timeouts
    this.pendingTimeouts = [];
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.scrollRight(); // 👉 Move to the next project
    }, 3000); // 3 seconds
  }

  viewProjectDetails(project: any): void {
    this.selectedProject = project;
    this.router.navigate(['/projects/detail', project.slug]);
  }
}

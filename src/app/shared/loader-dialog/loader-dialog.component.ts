import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, // <-- Make sure this is included
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './loader-dialog.component.html',
  styleUrls: ['./loader-dialog.component.scss'],
})
export class LoaderDialogComponent {}

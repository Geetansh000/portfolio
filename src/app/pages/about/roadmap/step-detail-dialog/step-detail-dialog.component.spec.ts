import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDetailDialogComponent } from './step-detail-dialog.component';

describe('StepDetailDialogComponent', () => {
  let component: StepDetailDialogComponent;
  let fixture: ComponentFixture<StepDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

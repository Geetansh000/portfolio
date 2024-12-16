import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, NavbarComponent],
  exports: [NavbarComponent],
})
export class SharedModule {}

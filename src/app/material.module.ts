import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

const Modules = [
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
];

@NgModule({
  imports: [Modules],
  exports: [Modules],
})
export class MaterialModule {}

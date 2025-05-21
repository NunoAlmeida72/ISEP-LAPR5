import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatButtonModule,MatToolbarModule,MatMenuModule,MatStepperModule,MatIconModule,MatSnackBarModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatProgressSpinnerModule,MatCardModule,MatSortModule,MatTableModule,MatDialogModule
  ],
  exports: [
    MatButtonModule,MatToolbarModule,MatMenuModule,MatStepperModule,MatIconModule,MatSnackBarModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatProgressSpinnerModule,MatCardModule,MatSortModule,MatTableModule,MatDialogModule
  ],
})
export class MaterialModule { }

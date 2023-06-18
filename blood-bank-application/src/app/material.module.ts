import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatRadioModule } from '@angular/material/radio';

import { MatListModule, MatSelectionList } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';

import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    MatGridListModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: [
    MatGridListModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
  ],
})
export class MyMaterialModule {}

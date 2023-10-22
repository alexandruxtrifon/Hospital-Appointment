import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { AddPacientComponent } from './add-pacient/add-pacient.component';
import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { AppConfigComponent } from './app-config/app-config.component';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import { DateTime } from 'luxon';
import { MatSortModule } from '@angular/material/sort';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import {Sort} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    AddAppointmentComponent,
    AddPacientComponent,
    AppConfigComponent,
    EditAppointmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    CdkDrag,
    CdkDropList,
    MatSnackBarModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

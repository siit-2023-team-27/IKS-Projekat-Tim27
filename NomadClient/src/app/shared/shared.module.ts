import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SnackBarComponent} from './snack-bar/snack-bar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { SocketComponent } from './socket/socket.component';


@NgModule({
  declarations: [
    MapComponent,
    SnackBarComponent,
    SocketComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ],
  exports: [
      MapComponent,
    SnackBarComponent
  ]
})
export class SharedModule { }

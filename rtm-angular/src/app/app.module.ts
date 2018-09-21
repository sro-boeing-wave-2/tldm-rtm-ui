import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatButtonModule, MatCheckboxModule, MatCardModule,
  MatSidenavModule, MatInputModule, MatToolbarModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { ChatService } from './chat.service';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import {NgxAutoScroll} from "ngx-auto-scroll";
import {ToastrModule} from 'ngx-toastr'

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';

import { AddChannelComponent } from './add-channel/add-channel.component';
import { MainContentComponent } from './main-content/main-content.component';
import { InviteMembersComponent } from './invite-members/invite-members.component';
import { AddMembersToChannelComponent } from './add-members-to-channel/add-members-to-channel.component';
import { Ng2Webstorage } from 'ngx-webstorage';


@Component({
  selector: 'app-root',
})
export class SampleComponent {
   @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;

   public forceScrollDown(): void {
       this.ngxAutoScroll.forceScrollDown();
   }
}

@NgModule({
  declarations: [
    AppComponent,
    AddChannelComponent,
    MainContentComponent,
    InviteMembersComponent,
    AddMembersToChannelComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    NgxAutoScrollModule,
    ScrollDispatchModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    Ng2Webstorage
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }

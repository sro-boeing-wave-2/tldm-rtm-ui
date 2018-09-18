import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddChannelComponent } from './add-channel/add-channel.component';
import {Location} from '@angular/common';
import { MainContentComponent } from './main-content/main-content.component';
import { InviteMembersComponent } from './invite-members/invite-members.component';
import { AddMembersToChannelComponent } from './add-members-to-channel/add-members-to-channel.component';

const routes : Routes = [
  { path: 'addChannel', component: AddChannelComponent},
  { path: '', component: MainContentComponent},
  { path: 'invite', component: InviteMembersComponent},
  { path: 'addMembersToChannel', component: AddMembersToChannelComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [Location],
})
export class AppRoutingModule { }

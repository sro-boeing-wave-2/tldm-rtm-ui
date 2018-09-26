import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ChatService } from '../chat.service';
import { Channel } from '../Channel';

@Component({
 selector: 'app-leave-channel-dialog',
 templateUrl: './leave-channel-dialog.component.html',
 styleUrls: ['./leave-channel-dialog.component.css']
})
export class LeaveChannelDialogComponent implements OnInit {

 channel: Channel;
 currentEmail: string;
 constructor(
   public thisDialogRef: MatDialogRef<LeaveChannelDialogComponent>,
   private chatservice: ChatService
 ) { }

 ngOnInit() {
   this.chatservice.currentEmailId.subscribe(email => this.currentEmail = email);
   this.chatservice.channelselected.subscribe(channel => this.channel = channel);
 }

 onCloseConfirm() {
   console.log(this.channel);
   var channelid = this.channel.channelId;
   this.chatservice.deleteUserFromChannel(channelid, this.currentEmail).subscribe();
   this.thisDialogRef.close('Confirm');
 }
 onCloseCancel() {
   this.thisDialogRef.close('Cancel');
 }

}

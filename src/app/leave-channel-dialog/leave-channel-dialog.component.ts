import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ChatService } from '../chat.service';
import { Channel } from '../Channel';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { User } from '../User';

@Component({
  selector: 'app-leave-channel-dialog',
  templateUrl: './leave-channel-dialog.component.html',
  styleUrls: ['./leave-channel-dialog.component.css']
})
export class LeaveChannelDialogComponent implements OnInit {

  channel: Channel;
  currentEmail: string;
  currentuser: User;
  public _hubConnection: HubConnection;
  constructor(

    public thisDialogRef: MatDialogRef<LeaveChannelDialogComponent>,
    private chatservice: ChatService
  ) {


  }

  ngOnInit() {
    this.chatservice.currentuser.subscribe(user => this.currentuser = user);
    this.chatservice.channelselected.subscribe(channel => this.channel = channel);
  }

  onCloseConfirm() {
    // this._hubConnection = new HubConnectionBuilder()
    //   .withUrl('http://172.23.238.230:5004/chat')
    //   .build();

    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://13.233.42.222/chat-api/chat')
      .build(); // aws

    this._hubConnection
      .start()
      .then(() => {
        console.log('Connection started!')
        console.log(this.channel);
        var channelid = this.channel.channelId;
        var currentEmail = this.currentuser.emailId;
        this.chatservice.deleteUserFromChannel(channelid, currentEmail).subscribe();
        this.thisDialogRef.close('Confirm');
        this._hubConnection
          .invoke('LeaveChannelNotification', channelid, this.currentuser)
          .then(s => {
            this.chatservice.setUserAddedRemovedProperty("removed");
          })
          .catch(err => console.error(err));
      })

  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}

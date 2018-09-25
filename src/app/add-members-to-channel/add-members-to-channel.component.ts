import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from '../User';
import { Channel } from '../Channel';
@Component({
  selector: 'app-add-members-to-channel',
  templateUrl: './add-members-to-channel.component.html',
  styleUrls: ['./add-members-to-channel.component.css']
})
export class AddMembersToChannelComponent implements OnInit {
  currentUser: User;
  allUsers: User[] = [];
  currentEmail;
  currentWorkspace;
  channelSelected:Channel;
  userSelected:User[]=[];
  constructor(
    private chatService: ChatService
  ) { }
  ngOnInit() {
    //getting current user in context
    this.chatService.currentuser.subscribe(user => this.currentUser = user);
    //console.log(this.currentUser);
    //getting workspacename and email of current user
    this.chatService.currentEmailId.subscribe(email => this.currentEmail = email);
    this.chatService.currentWorkspace.subscribe(workspace => this.currentWorkspace = workspace);
    //getting list of users in workspace
    this.chatService.currentListOfUsers.subscribe(users => this.allUsers = users);
    //this.currentUser = this.allUsers.find(x => x.emailId == this.currentEmail);
    console.log(this.allUsers);
    //getting channel in which members are to be added
    this.chatService.channelselected.subscribe(channel => this.channelSelected = channel);
    //console.log(this.channelSelected);
    //removing users which are already present in the channel from the array
     for( let user of this.channelSelected.users){
       //this.allUsers.splice(this.allUsers.indexOf(user), 1);
       this.allUsers = this.allUsers.filter(x => x.id !== user.id);
     }
    //console.log(this.allUsers);
  }
  addMembersToChannel(){
    for(let user of this.userSelected){
      console.log(user);
      this.chatService.addMemberToChannel(user, this.channelSelected.channelId).subscribe();
    }
  }
}
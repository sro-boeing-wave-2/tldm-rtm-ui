// import { Component, OnInit, Output } from '@angular/core';
// import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
// import { ChatService } from '../chat.service';
// import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
// import { Workspace } from '../Workspace';
// import { Channel } from '../Channel';
// import { ActivatedRoute, Router } from '@angular/router';
// import { User } from '../User';
// import { Message } from '../Message';
// import { Observable } from 'rxjs';
// //import { EventEmitter } from 'protractor';

// @Component({
//   selector: 'app-main-content',
//   templateUrl: './main-content.component.html',
//   styleUrls: ['./main-content.component.css']
// })
// export class MainContentComponent implements OnInit {

//   public _hubConnection: HubConnection;
//   channelmessage = '';
//   channelmessages = [];
//   workspacenamebyuser = '';
//   newusertoworkspace = '';
//   channelId: string;
//   workspaceName: string;
//   channel: Channel;
//   userid: string;
//   allUsers=[];
//   //username: string;
//   emailId: string;
//   channelArray: Channel[];
//   channelName: string;
// currentuser:User;
// directMessageChat: Channel[] = [];


//   public joinChannel(channelId: string): void {
//     this._hubConnection
//       .invoke('JoinChannel', channelId)
//       .catch(err => console.error(err));
//     console.log("in join Channel");
//   }

//   public sendMessageInChannel(): void {
//     this._hubConnection
//       .invoke('SendMessageInChannel', this.emailId, this.channelmessage, this.channelId)
//       .then(() => this.channelmessage = '')
//       .catch(err => console.error(err));
//   }


//   orderObj;
//   ngOnInit() {
//     this.route.queryParamMap.subscribe(params => {
//       this.orderObj = { ...params.keys, ...params };
//       console.log(this.orderObj["params"]["email"]);
//     });
//     this.emailId = this.orderObj["params"]["email"];
//     this.workspaceName = this.orderObj["params"]["workspace"];

//     this.chatservice.setEmailAndWorkspace(this.emailId, this.workspaceName);

//     //Get list of users in the workspace
//     this.getListOfUsersInWorkspace();
//     console.log(this.allUsers);

//     //this.currentuser = this.allUsers.find(x => x.emailId == this.emailId);
//     //console.log(currentUser);
//     this.chatservice.setListOfUsers(this.allUsers);

//     //Get list of channels in workspace
//     this.ListAllChannels();
//   }

//   getListOfUsersInWorkspace() {
//     console.log("get list of users in workspace");
//     console.log(this.workspaceName);
//     this.chatservice.getAllUsersInWorkspace(this.workspaceName)
//       .subscribe(s => {
//         this.allUsers = s;
//         this.currentuser = s.find(x => x.emailId == this.emailId);
//       });
//       console.log(this.allUsers);
//   }


//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private chatservice: ChatService,
//     private fb: FormBuilder) {
//     this.channelArray = new Array<Channel>();
//     this._hubConnection = new HubConnectionBuilder()
//       .withUrl('http://172.23.238.230:5004/chat')
//       .build();

//     this._hubConnection.on('JoinChannel', (channelId: string) => {
//       console.log("in joinchannel method" + channelId);
//     });


//     this._hubConnection.on('SendMessageInChannel', (username: string, receivedMessage: string) => {
//       console.log("in sendtochannel method");
//       const text = [];
//       text.push(username);
//       text.push(receivedMessage);
//       // const text = `${username}: ${receivedMessage}`;
//       this.channelmessages.push(text);
//       if(username != this.emailId){
//       this.notify();
//       }
//     });

//     this._hubConnection
//       .start()
//       .then(() => { console.log('Connection started!') })
//       .catch(err => console.log('Error while establishing connection :('));

//     console.log(this._hubConnection);
//   }


//   startChannelCommunication(): void {
//     //console.log("in startChannelCommunication ");
//     this.chatservice.getChannelIdByWorkspaceName(this.workspaceName)
//       .subscribe(s => this.channelId = s.channelId);
//     this.messageAutoScroll();
//   }

//   ListAllChannels(){
//     console.log("in list channel function");
//     this.chatservice.getUserChannels(this.emailId, this.workspaceName)
//       .subscribe(s => {
//         console.log(s);
//         this.channelArray = s;
//         for(let channel of s){
//           let c = channel as Channel;
//           //console.log(this.currentuser);
//           var index = c.channelName.indexOf(this.currentuser.userId);
//           console.log(index);
//           if(c.channelName.indexOf(this.currentuser.userId) != -1){
//             this.directMessageChat.push(c);
//             console.log(this.channelArray.indexOf(c))
//             this.channelArray.splice(this.channelArray.indexOf(c), 1);
//           }

//         }
//         console.log(this.directMessageChat);
//       });
//     console.log(this.channelArray);

//    }
//   getChannelName(channel: Channel) {
//     console.log("get channel id");
//     console.log(channel.channelName);
//     this.channelName = channel.channelName;
//     this.channelId = channel.channelId;
//     console.log(this.channelName);
//     this.channelmessages = [];
//     this.joinChannel(channel.channelId);
//   }

//   // @Output()
//   // currentUserEmail = new EventEmitter();

//   Channel() {
//     this.chatservice.setListOfUsers(this.allUsers);
//     this.router.navigate(['addChannel']);
//     //this.currentUserEmail.emit(this.emailId);
//   }

//   public notify() {
//     let audio = new Audio();
//     audio.src = "../assets/sounds/unconvinced.mp3";
//     audio.load();
//     audio.play();
//   }

//   public messageAutoScroll() {
//     var elmnt = document.getElementById("messagecard");
//     elmnt.scrollIntoView();
// }

// }

// kanikas code///////////////////////////////////////////////////////////////////

import { Component, OnInit, Output } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatService } from '../chat.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Workspace } from '../Workspace';
import { Channel } from '../Channel';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { Message } from '../Message';
import { Observable } from 'rxjs';

//import { EventEmitter } from 'protractor';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  public _hubConnection: HubConnection;
  channelmessage = '';
  channelmessages = new Array<Message>();
  workspacenamebyuser = '';
  newusertoworkspace = '';
  channelId: string;
  workspaceName: string;
  channel: Channel;
  userid: string;
  allUsers = [];
  //username: string;
  emailId: string;
  channelArray: Channel[];
  channelName: string;
  currentuser: User;
  //directMessageChat: Channel[] = [];
  channelSelected: Channel;
  workspaceObject: Workspace;
  defaultChannels: Channel[];
  numberOfMessages:number;
  // rahuls variable of online users
  loggedInUsers: String[] = [];
  //

  _loginHomeUrl: string ="http://172.23.238.244:4200";

  messageObject: Message = {
    "messageId": "",
    "messageBody": "",
    "timestamp": "",
    "isStarred": "",
    "sender": {
      "id": "",
      "emailId": "",
      "firstName": "",
      "lastName": "",
      "userId": ""
    },
    "channelId": ""
  }
  public joinChannel(channelId: string): void {
    this._hubConnection
      .invoke('JoinChannel', channelId)
      .catch(err => console.error(err));
  }
  public sendMessageInChannel(): void {
    if(this.channelmessage!= ""){
      this.messageObject.messageBody = this.channelmessage;
      this.messageObject.sender = this.currentuser;
      this.messageObject.isStarred = "false";
      this.messageObject.timestamp = new Date().toISOString();
      this.messageObject.channelId = this.channelId;
      this._hubConnection
        .invoke('SendMessageInChannel', this.emailId, this.messageObject, this.channelId)
        .then(() => this.channelmessage = '')
        .catch(err => console.error(err));
    }
  }
  orderObj;

  // rahuls code for online users
  noofusers(): void {
    // console.log("in no of users");
    this._hubConnection
      .invoke('SendToAllconnid', this.emailId)
      .catch(err => console.error(err));
  }
  //

  ngOnInit() {
    console.log("ng onit");
    // rahuls code for online users
    setInterval(() => this.noofusers(), 1000);
    //
    this.route.queryParamMap.subscribe(params => {
      this.orderObj = { ...params.keys, ...params };
      // console.log(this.orderObj["params"]["email"]);
    });
    this.emailId = this.orderObj["params"]["email"];
    console.log(this.emailId);
    this.workspaceName = this.orderObj["params"]["workspace"];
    this.chatservice.setEmailAndWorkspace(this.emailId, this.workspaceName);

    //get workspace object
    this.chatservice.getWorkspaceObjectByWorspaceName(this.workspaceName)
      .subscribe(s => {
        this.workspaceObject = s;
        this.allUsers = s.users;
        this.channelArray = s.channels;
        this.currentuser = this.allUsers.find(x => x.emailId == this.emailId);
        this.defaultChannels = s.defaultChannels;
        //Instantiating chat context with the first default channel
        this.getSelectedChannelDetails(this.defaultChannels[0]);
        for (let channel of s.channels) {
          setTimeout(() => this.joinChannel(channel.channelId), 300);
        }
        for (let defaultChannel of s.defaultChannels) {
          setTimeout(() => this.joinChannel(defaultChannel.channelId), 300);
        }

      });
    console.log(this.workspaceObject);
    //this.allUsers = this.workspaceObject.users;
    //this.channelArray = this.workspaceObject.channels;

    //Get list of users in the workspace
    // this.getListOfUsersInWorkspace();
    // console.log(this.allUsers);
    //this.currentuser = this.allUsers.find(x => x.emailId == this.emailId);
    //console.log(currentUser);
    this.chatservice.setListOfUsers(this.allUsers);
    //Get list of channels in workspace
    // this.ListAllChannels();
  }
  // getListOfUsersInWorkspace() {
  //   console.log("get list of users in workspace");
  //   console.log(this.workspaceName);
  //   this.chatservice.getAllUsersInWorkspace(this.workspaceName)
  //     .subscribe(s => {
  //       this.allUsers = s;
  //       this.currentuser = s.find(x => x.emailId == this.emailId);
  //     });
  //     console.log(this.allUsers);
  // }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatservice: ChatService,
    private fb: FormBuilder) {
    this.channelArray = new Array<Channel>();
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://172.23.238.230:5004/chat')
      .build();
    this._hubConnection.on('JoinChannel', (channelId: string) => {
      console.log("in joinchannel method" + channelId);
    });
    this._hubConnection.on('SendMessageInChannel', (username: string, receivedMessage: Message) => {
      console.log("in sendtochannel method");
      console.log(receivedMessage);
      if(receivedMessage.channelId == this.channelId){this.channelmessages.push(receivedMessage);}
      //const text = `${username}: ${receivedMessage}`;
      //this.channelmessages.push(text);
      if (username != this.emailId) {
        this.notify();
      }
    });
    this._hubConnection
      .start()
      .then(() => { console.log('Connection started!') })
      .catch(err => console.log('Error while establishing connection :('));
    console.log(this._hubConnection);

    // rahuls code for online users
    this._hubConnection.on('SendToAllconnid', (activeusers: string[]) => {
      // console.log("in SendToAllconnid method");
      // console.log(activeusers);
      this.loggedInUsers = activeusers;
      // console.log(this.loggedInUsers.includes(this.currentuser.emailId));
    });
    //
  }
  startChannelCommunication(): void {
    //console.log("in startChannelCommunication ");
    this.chatservice.getChannelIdByWorkspaceName(this.workspaceName)
      .subscribe(s => this.channelId = s.channelId);
  }

  getSelectedChannelDetails(channel: Channel) {
    console.log(this.workspaceObject);

    this.chatservice.getChannelById(channel.channelId)
      .subscribe(s => {
        this.channelSelected = s;
        this.channelmessages = s.messages;
      });

    //this.channelSelected = channel;
    console.log(this.channelSelected);

    this.channelName = channel.channelName;
    this.channelId = channel.channelId;

    //this.channelmessages = this.channelSelected.messages;

    //this.joinChannel(channel.channelId);
  }

  getDirectMessageDetails(user: User) {
    this.chatservice.getOneToOneChannel(this.emailId, user.emailId, this.workspaceName)
      .subscribe(s => {
        this.channelSelected = s;
        this.channelmessages = s.messages;
        this.channelId = s.channelId;
      });

    this.channelName = user.firstName;
    this.channelId = this.channelSelected.channelId;
    setTimeout(()=>this.joinChannel(this.channelSelected.channelId),300) ;
  }

  // @Output()
  // currentUserEmail = new EventEmitter();
  Channel() {
    this.chatservice.setListOfUsers(this.allUsers);
    this.router.navigate(['addChannel']);
    //this.currentUserEmail.emit(this.emailId);
  }

  addMembersToChannel() {
    this.chatservice.setChannelSelected(this.channelSelected);
    this.chatservice.setCurrentUser(this.currentuser);
    this.chatservice.setListOfUsers(this.allUsers);
    //console.log(this.allUsers);
    this.router.navigate(['addMembersToChannel']);
  }

  loadMoreMessages(){
    var loadedMessages = [];
    this.numberOfMessages = this.channelmessages.length + 10;
    this.chatservice.loadMoreMessages(this.channelId, this.numberOfMessages).subscribe(s => {
      loadedMessages = s;
      loadedMessages.reverse()
      for(let i of loadedMessages){
        this.channelmessages.unshift(i);
      }
    });
    setTimeout(()=>console.log(loadedMessages),500);
    //this.channelmessages.unshift(loadedMessages)
  }

  public notify() {
    let audio = new Audio();
    audio.src = "../assets/sounds/unconvinced.mp3";
    audio.load();
    audio.play();
  }
}

 // ListAllChannels(){
  //   console.log("in list channel function");
  //   this.chatservice.getUserChannels(this.emailId, this.workspaceName)
  //     .subscribe(s => {
  //       console.log(s);
  //       this.channelArray = s;
  //       //one line to be added for join channel
  //       // for(let channel of s){
  //       //   let c = channel as Channel;
  //       //   //console.log(this.currentuser);
  //       //   //var index = c.channelName.indexOf(this.currentuser.userId);
  //       //   //console.log(index);
  //       //   if(c.channelName.indexOf(this.currentuser.userId) != -1){
  //       //     this.directMessageChat.push(c);
  //       //     console.log(this.channelArray.indexOf(c))
  //       //     this.channelArray.splice(this.channelArray.indexOf(c), 1);
  //       //   }
  //       // }
  //       //console.log(this.directMessageChat);
  //     });
  //   console.log(this.channelArray);
  //  }
  //  getSelectedChannelDetails(channel: Channel) {
  //   //console.log("get channel id");
  //   //console.log(channel.channelName);
  //   this.channelSelected = channel;
  //   console.log(this.channelSelected);
  //   //console.log(this.channelSelected);
  //   this.channelName = channel.channelName;
  //   this.channelId = channel.channelId;
  //   //console.log(this.channelName);
  //   this.channelmessages = this.channelSelected.messages;
  //   console.log(this.channelmessages);
  //   this.joinChannel(channel.channelId);
  // }

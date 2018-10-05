// kanikas code//
import { DomSanitizer } from '@angular/platform-browser'
import { Component, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatService } from '../chat.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Workspace } from '../Workspace';
import { Channel } from '../Channel';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { Message } from '../Message';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import { LocalStorageService } from 'ngx-webstorage';
import { CookieStorage } from 'cookie-storage';
import { WorkspaceState } from '../WorkspaceState';
import { ChannelState } from '../ChannelState';
import { MatDialog } from '@angular/material';
import { LeaveChannelDialogComponent } from '../leave-channel-dialog/leave-channel-dialog.component';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
 constructor(private sanitized: DomSanitizer) {}
 transform(value) {
  //  console.log(this.sanitized.bypassSecurityTrustHtml(value))
   return this.sanitized.bypassSecurityTrustHtml(value);
 }
}

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  // variable declarations
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
  emailId: string;
  channelArray: Channel[];
  channelName: string;
  currentuser: User;
  channelSelected: Channel;
  workspaceObject: Workspace;
  defaultChannels: Channel[];
  numberOfMessages: number;
  Currentlytyping: string;
  selectedchannel: string;
  workspaceStateObject: WorkspaceState;
  channelStateObject: ChannelState[];
  currentypingChannelId: string;
  typingCount = 0;
  toggleflag = 0;
  toastmessage: string;
  // rahuls variable of online users
  loggedInUsers: String[] = [];

  // notification channel to redirect
  notigchannel: Channel;
  token: string;

  // _loginHomeUrl: string = "http://172.23.238.206:7001";
  _loginHomeUrl: string = "http://13.233.42.222"; // aws
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

  public notify() {
    let audio = new Audio();
    audio.src = "..src/assets/sounds/unconvinced.mp3";
    audio.load();
    audio.play();
  }

  public sendMessageInChannel(): void {
    if (this.channelmessage != "") {
      this.messageObject.messageBody = this.channelmessage;
      this.messageObject.sender = this.currentuser;
      this.messageObject.isStarred = "false";
      this.messageObject.timestamp = new Date().toLocaleTimeString();
      this.messageObject.channelId = this.channelId;
      console.log("in sendmessage");
      console.log(this.messageObject.timestamp);
      this._hubConnection
        .invoke('SendMessageInChannel', this.emailId, this.messageObject, this.channelId, this.workspaceName)
        .then(() => this.channelmessage = '')
        .catch(err => console.error(err));
    }
  }

  getNotificationCount(): void {
    //console.log("in get count invoke method")
    var timestamp = new Date().toISOString();
    this._hubConnection
      .invoke('GetNotificationsForChannelsInWorkspace', this.workspaceName, this.emailId, this.channelId, timestamp)
      .then(s => {
        //console.log(s);
        //this.workspaceStateObject = s;
        //this.channelStateObject = this.workspaceStateObject.listOfChannelState;
      })
      .catch(err => console.error(err));
  }

  orderObj;

  // rahuls code for online users
  noofusers(): void {
    this._hubConnection
      .invoke('SendToAllconnid', this.emailId)
      .catch(err => console.error(err));
  }

  getWorkspaceObject(): void {
    this._hubConnection
      .invoke('SendWorkspaceObject', this.workspaceName, this.emailId)
      .catch(err => console.error(err));
  }

  ngOnInit() {

    this._hubConnection
      .start()
      .then(() => {
        console.log('Connection started!')
        const cookie = new CookieStorage();
        cookie.setItem("abc", "def");
        console.log("Token From Chat FrontEnd= ", this.localStorage.retrieve("token"));
        // rahuls code for online users
        setInterval(() => this.noofusers(), 1000);

        this.route.queryParamMap.subscribe(params => {
          this.orderObj = { ...params.keys, ...params };
        });

        // this.emailId = this.orderObj["params"]["email"];
        // console.log("Email from onboarding",this.localStorage.retrieve('email'));
        // console.log("Workspace From Onboarding",this.localStorage.retrieve('workspacename'));
        this.emailId = this.localStorage.retrieve('email');
        this.workspaceName = this.orderObj["params"]["workspace"];
        this.localStorage.store('workspaceName', this.workspaceName);
        this.localStorage.retrieve('workspaceName')
        // this.workspaceName = this.localStorage.retrieve('workspacename');
        this.chatservice.setEmailAndWorkspace(this.emailId, this.workspaceName);
        // this.localStorage.store("token", this.orderObj["params"]["token"]);
        this.token = this.localStorage.retrieve('token');
        console.log(this.localStorage.retrieve("token"));
        //get workspace object
        // this.chatservice.getWorkspaceObjectByWorspaceName(this.workspaceName)
        //   .subscribe(s => {
        //     this.workspaceObject = s;
        //     this.allUsers = s.users;
        //     this.channelArray = s.channels;
        //     this.currentuser = this.allUsers.find(x => x.emailId == this.emailId);

        //     this.defaultChannels = s.defaultChannels;
        //     //Instantiating chat context with the first default channel
        //     this.getSelectedChannelDetails(this.defaultChannels[0]);
        //     for (let channel of s.channels) {
        //       setTimeout(() => this.joinChannel(channel.channelId), 300);
        //     }
        //     for (let defaultChannel of s.defaultChannels) {
        //       setTimeout(() => this.joinChannel(defaultChannel.channelId), 300);
        //     }
        //   });
        setInterval(() => this.getWorkspaceObject(), 1000);
        // this.getWorkspaceObject();
        setTimeout(() => this.getDefaultChannelDetails(this.defaultChannels[0]), 2000);

        setTimeout(() => {
          for (let channel of this.workspaceObject.channels) {
            setTimeout(() => this.joinChannel(channel.channelId), 300);
          }
        }, 2000)

        setTimeout(() => {
          for (let defaultChannel of this.workspaceObject.defaultChannels) {
            setTimeout(() => this.joinChannel(defaultChannel.channelId), 300);
          }
        }, 2000)
        this.chatservice.setListOfUsers(this.allUsers);
      })
      .catch(err => console.log('Error while establishing connection :('));


  }

  constructor(
    public dialog: MatDialog,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private chatservice: ChatService,
    private fb: FormBuilder) {
    this.channelArray = new Array<Channel>();
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://13.233.42.222/chat-api/chat')
      .build(); // aws
    // this._hubConnection = new HubConnectionBuilder()
    //   .withUrl('http://172.23.238.206:7001/chat-api/chat')
    //   .build(); // api gateway
    // this._hubConnection = new HubConnectionBuilder()
    //   .withUrl('http://172.23.239.174:5004/chat')
    //   .build();
    this._hubConnection.on('JoinChannel', (channelId: string) => {
      console.log("in joinchannel method" + channelId);
    });

    this._hubConnection.on('SendMessageInChannel', (username: string, receivedMessage: Message) => {

      if (receivedMessage.channelId == this.channelId) {
        this.channelmessages.push(receivedMessage);
      }
      if (username != this.emailId) {
        this.notify();
      };
      if (username != this.emailId && receivedMessage.channelId != this.channelId) {
        this.launch_toast(receivedMessage.channelId, receivedMessage.sender.firstName + " : " + receivedMessage.messageBody);
      }
    });

    this._hubConnection.on('ReceiveLeaveInChannelNotification', (user: User, channelid: string) => {
      console.log(user);
      var channel = this.channelArray.find(x => x.channelId == channelid)
      if (user.emailId != this.emailId) {
        this.launch_toast(channelid, channel.channelName + " : " + user.firstName + " left the channel");
      }
    })

    this._hubConnection.on('ReceiveAddInChannelNotification', (user: User, channelid: string) => {
      console.log(user);
      var channel = this.channelArray.find(x => x.channelId == channelid)

      this.launch_toast(channelid, channel.channelName + " : " + user.firstName + " added to the channel");

    })

    this._hubConnection.on('ReceiveUpdatedWorkspace', (workspaceobject: Workspace, workspacestateobject: WorkspaceState) => {
      //console.log(workspaceobject)
      // console.log(workspacestateobject);
      this.workspaceObject = workspaceobject;
      this.workspaceStateObject = workspacestateobject;
      this.channelStateObject = workspacestateobject.listOfChannelState;
      //console.log(this.workspaceObject);
      this.allUsers = workspaceobject.users;
      console.log(this.allUsers);
      this.channelArray = workspaceobject.channels;
      this.currentuser = this.allUsers.find(x => x.emailId == this.emailId);
      this.defaultChannels = workspaceobject.defaultChannels;
    })

    this._hubConnection.on("whoistyping", (currentlytyping: string, currentypingChannelId: string, currenttypingName: string) => {
      if (currentypingChannelId == this.channelId) {
        this.Currentlytyping = currentlytyping + ' ...';
        var div = document.createElement('div');
        setTimeout(() => {
          div.innerHTML = `<span>${this.Currentlytyping}</span>`;
          document.getElementById('typing').appendChild(div);
          div.style.position = 'absolute';
          div.style.zIndex = "6000000";
          div.style.paddingLeft = "10px"
        }, 0);
        setTimeout(() => {
          div.remove();
        }, 4000);
      }
    });

    // rahuls code for online users
    this._hubConnection.on('SendToAllconnid', (activeusers: string[]) => {
      this.loggedInUsers = activeusers;
    });
  }

  startChannelCommunication(): void {
    this.chatservice.getChannelIdByWorkspaceName(this.workspaceName)
      .subscribe(s => this.channelId = s.channelId);
  }

  getSelectedChannelDetails(channel: Channel) {
    this.selectedchannel = "channel";
    this.chatservice.getChannelById(channel.channelId)
      .subscribe(s => {
        this.channelSelected = s;
        this.channelmessages = s.messages;
      });

    this.channelName = channel.channelName;
    this.channelId = channel.channelId;
    setInterval(() => this.getNotificationCount(), 2000);
    // this.closeSidenav();
  }

  getDefaultChannelDetails(channel: Channel) {
    this.selectedchannel = "defaultchannel";
    console.log(this.workspaceObject);
    this.chatservice.getChannelById(channel.channelId)
      .subscribe(s => {
        this.channelSelected = s;
        this.channelmessages = s.messages;
      });

    this.channelName = channel.channelName;
    this.channelId = channel.channelId;
    setInterval(() =>this.getNotificationCount(),2000);

  }

  getDirectMessageDetails(user: User) {
    this.selectedchannel = "directmessage";
    this.chatservice.getOneToOneChannel(this.emailId, user.emailId, this.workspaceName)
      .subscribe(s => {
        console.log(s);
        this.channelSelected = s;
        this.channelmessages = s.messages;
        this.channelId = s.channelId;
      });
    // console.log

    this.channelName = user.firstName;
    //this.channelId = this.channelSelected.channelId;
    setTimeout(() => this.joinChannel(this.channelSelected.channelId), 300);
    // this.closeSidenav()
  }

  Channel() {
    this.chatservice.setListOfUsers(this.allUsers);
    this.router.navigate(['addChannel']);
  }

  addMembersToChannel() {
    this.chatservice.setChannelSelected(this.channelSelected);
    this.chatservice.setCurrentUser(this.currentuser);
    this.chatservice.setListOfUsers(this.allUsers);
    this.router.navigate(['addMembersToChannel']);
  }

  loadMoreMessages() {
    var loadedMessages = [];
    this.numberOfMessages = this.channelmessages.length + 10;
    this.chatservice.loadMoreMessages(this.channelId, this.numberOfMessages).subscribe(s => {
      loadedMessages = s;
      loadedMessages.reverse()
      for (let i of loadedMessages) {
        this.channelmessages.unshift(i);
      }
    });
    setTimeout(() => console.log(loadedMessages), 500);
  }



  launch_toast(channelId: string, message: string) {
    this.toastmessage = message;
    var x = document.getElementById("toast");
    this.chatservice.getChannelById(channelId)
      .subscribe(s => {
        this.notigchannel = s;
      });
    console.log("inside launch toast");
    console.log(this.notigchannel);
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
  }

  typingfunction() {
    this.typingCount += 1;
    console.log("in the typing function");
    console.log(this.channelId);
    if (this.typingCount < 2) {
      this._hubConnection
        .invoke('whoistyping', this.channelId, this.currentuser.firstName)
        .catch(err => console.error(err));
      setTimeout(() => {
        this.typingCount = 0;
      }, 6000);
    }
    else {
      console.log('cannot invoke');
    }
  }

  leaveChannel() {
    this.chatservice.setChannelSelected(this.channelSelected);
    this.chatservice.setCurrentUser(this.currentuser);
    let dialogRef = this.dialog.open(LeaveChannelDialogComponent, {
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog box closed")
    });
    var refreshId = setInterval(() => {
      var prop
      this.chatservice.userAddedRemoved.subscribe(s => {
        prop = s;
      });
      if (prop == "removed") {
        this.getDefaultChannelDetails(this.defaultChannels[0]);
        clearInterval(refreshId);
      }
    }, 2000)
  }
  openSidenav() {
    console.log("opensidenv called")
    // document.getElementById("content").style.marginLeft = "30%" ;

    document.getElementById("content").style.width = "75%" ;
    document.getElementById("sidebar").style.width = "25%";
    document.getElementById("sidebar").style.display = "inline";
    document.getElementById("content").style.display = "inline";
    document.getElementById("message-form-input").style.display = "none" ;
  }

  closeSidenav() {
    console.log("closesidenav called")
    // document.getElementById("content").style.marginLeft = "0" ;
    document.getElementById("content").style.width = "100%" ;
    document.getElementById("sidebar").style.display = "none" ;
    document.getElementById("content").style.display = "block" ;
    document.getElementById("message-form-input").style.display = "inline" ;
  }
  toggleFunction() {
    console.log(this.toggleflag);
    if(this.toggleflag == 0) {
      this.closeSidenav();
      this.toggleflag = 1;
    }
    else{
      this.openSidenav();
      this.toggleflag = 0
    }

  }

  putEmoji1() {
    console.log("in emoji")

      this.messageObject.messageBody = "<i class='em em---1'></i>";
      this.messageObject.sender = this.currentuser;
      this.messageObject.isStarred = "false";
      this.messageObject.timestamp = new Date().toLocaleTimeString();
      this.messageObject.channelId = this.channelId;
      console.log("in sendmessage");
      console.log(this.messageObject.timestamp);
      this._hubConnection
        .invoke('SendMessageInChannel', this.emailId, this.messageObject, this.channelId, this.workspaceName)
        .then(() => this.channelmessage = '')
        .catch(err => console.error(err));

  }

  putEmoji2() {
    console.log("in emoji")

      this.messageObject.messageBody = "<i class='em em-slightly_smiling_face'></i>";
      this.messageObject.sender = this.currentuser;
      this.messageObject.isStarred = "false";
      this.messageObject.timestamp = new Date().toLocaleTimeString();
      this.messageObject.channelId = this.channelId;
      console.log("in sendmessage");
      console.log(this.messageObject.timestamp);
      this._hubConnection
        .invoke('SendMessageInChannel', this.emailId, this.messageObject, this.channelId, this.workspaceName)
        .then(() => this.channelmessage = '')
        .catch(err => console.error(err));

  }

  putEmoji3() {
    console.log("in emoji")

      this.messageObject.messageBody = "<i class='em em-crossed_fingers'></i>";
      this.messageObject.sender = this.currentuser;
      this.messageObject.isStarred = "false";
      this.messageObject.timestamp = new Date().toLocaleTimeString();
      this.messageObject.channelId = this.channelId;
      console.log("in sendmessage");
      console.log(this.messageObject.timestamp);
      this._hubConnection
        .invoke('SendMessageInChannel', this.emailId, this.messageObject, this.channelId, this.workspaceName)
        .then(() => this.channelmessage = '')
        .catch(err => console.error(err));

  }

}

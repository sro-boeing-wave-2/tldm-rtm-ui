// import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
// import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
// import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';
// import { ChatService } from '../chat.service';
// import { User } from '../User';
// import { Channel } from '../Channel';
// import { Message } from '../Message';

// @Component({
//   selector: 'app-add-channel',
//   templateUrl: './add-channel.component.html',
//   styleUrls: ['./add-channel.component.css']
// })
// export class AddChannelComponent implements OnInit {

//   visible = true;
//   selectable = true;
//   removable = true;
//   addOnBlur = false;
//   separatorKeysCodes: number[] = [ENTER, COMMA];
//   userCtrl = new FormControl();
//   filteredUsers: Observable<User[]>;
//   users: string[] = [];
//   userSelected: User[];
//   channelForm: FormGroup;
//   currentEmail;
//   currentWorkspace;

//   public channelToCreate:Channel = {
//     "channelId": "",
//     "messages": [],
//     "workspaceId": "",
//     "channelName": "",
//     "users": [],
//     "admin":{
//       "id": "",
//       "emailId": "",
//       "firstName": "",
//       "lastName": "",
//       "userId": ""
//     }
//   };

//   allUsers: User[] = [];

//   @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;


//   constructor(
//     private route: ActivatedRoute,
//     private fb: FormBuilder,
//     // private location: Location,
//     private router: Router,
//     private chatService: ChatService
//   ) {
//   }

//   ngOnInit() {
//     this.chatService.currentEmailId.subscribe(email => this.currentEmail = email);
//     this.chatService.currentWorkspace.subscribe(workspace => this.currentWorkspace = workspace);

//     this.chatService.currentListOfUsers.subscribe(users => this.allUsers = users);
// console.log(this.allUsers);
//     this.channelForm = this.fb.group({
//       channelName: new FormControl()
//     });


//     // this.getListOfUsersInWorkspace();
//   }

//   // getListOfUsersInWorkspace() {
//   //   console.log("get list of users in workspace");
//   //   console.log(this.currentWorkspace);
//   //   this.chatService.getAllUsersInWorkspace(this.currentWorkspace)
//   //     .subscribe(s => this.allUsers = s);
//   //     console.log(this.allUsers);
//   // }

//   addNewChannel() {
//     console.log(this.allUsers);
//     console.log("In addNewChannel");
//     console.log(this.channelForm.value.channelName);
//     for (let user of this.userSelected) {
//       let u = user as User;
//       this.channelToCreate["users"].push(u);
//     }

//     this.channelToCreate.channelName = this.channelForm.value.channelName;
//     var currentUser = this.allUsers.find(x => x.emailId == this.currentEmail);
//     console.log(currentUser);
//     console.log(currentUser.emailId);
//     this.channelToCreate["users"].push(currentUser);
//     this.channelToCreate.admin.id = currentUser.id;
//     this.channelToCreate.admin.emailId = currentUser.emailId;
//     this.channelToCreate.admin.firstName = currentUser.firstName;
//     this.channelToCreate.admin.lastName = currentUser.lastName;
//     this.channelToCreate.admin.userId = currentUser.userId;

//     this.chatService.createNewChannel(this.channelToCreate, this.currentWorkspace).subscribe();
//     console.log(this.channelToCreate);
//   }


//   private _filter(value: User): User[] {
//     const filterValue = value.firstName.toLowerCase();
//     return this.allUsers.filter(x => x.firstName.toLowerCase().indexOf(filterValue) === 0);
//   }
// }

// kanikas code//////////////////////////////////////

import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChatService } from '../chat.service';
import { User } from '../User';
import { Channel } from '../Channel';
import { Message } from '../Message';
@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<User[]>;
  users: string[] = [];
  userSelected: User[];
  channelForm: FormGroup;
  currentEmail;
  currentWorkspace;
  public channelToCreate:Channel = {
    "channelId": "",
    "messages": [],
    "workspaceId": "",
    "channelName": "",
    "users": [],
    "admin":{
      "id": "",
      "emailId": "",
      "firstName": "",
      "lastName": "",
      "userId": ""
    }
  };
  allUsers: User[] = [];
  currentUser: User;
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private location: Location,
    private router: Router,
    private chatService: ChatService
  ) {
  }
  ngOnInit() {
    this.chatService.currentEmailId.subscribe(email => this.currentEmail = email);
    this.chatService.currentWorkspace.subscribe(workspace => this.currentWorkspace = workspace);
    this.chatService.currentListOfUsers.subscribe(users => this.allUsers = users);
    //console.log(this.allUsers);
    //Getting current user in context
    this.currentUser = this.allUsers.find(x => x.emailId == this.currentEmail);
    //Removing current users from list of all users
    this.allUsers.splice(this.allUsers.indexOf(this.currentUser), 1);
    this.channelForm = this.fb.group({
      channelName: new FormControl()
    });
    //console.log(this.currentUser);
    // this.getListOfUsersInWorkspace();
  }
  // getListOfUsersInWorkspace() {
  //   console.log("get list of users in workspace");
  //   console.log(this.currentWorkspace);
  //   this.chatService.getAllUsersInWorkspace(this.currentWorkspace)
  //     .subscribe(s => this.allUsers = s);
  //     console.log(this.allUsers);
  // }
  addNewChannel() {
    //console.log(this.allUsers);
    //console.log("In addNewChannel");
    //console.log(this.channelForm.value.channelName);
    for (let user of this.userSelected) {
      let u = user as User;
      this.channelToCreate["users"].push(u);
    }
    this.channelToCreate.channelName = this.channelForm.value.channelName;
    //var currentUser = this.allUsers.find(x => x.emailId == this.currentEmail);
    //console.log(currentUser);
    //console.log(currentUser.emailId);
    //Adding current user to channel by default
    this.channelToCreate["users"].push(this.currentUser);
    //console.log(this.currentUser);
    //Appending current user as admin by default
    this.channelToCreate.admin.id = this.currentUser.id;
    this.channelToCreate.admin.emailId = this.currentUser.emailId;
    this.channelToCreate.admin.firstName = this.currentUser.firstName;
    this.channelToCreate.admin.lastName = this.currentUser.lastName;
    this.channelToCreate.admin.userId = this.currentUser.userId;
    this.chatService.createNewChannel(this.channelToCreate, this.currentWorkspace).subscribe();
    setTimeout(()=>this.router.navigate([''], { queryParams: { email: this.currentEmail, workspace: this.currentWorkspace}}),300);
    // this.router.navigate([''], { queryParams: { email: this.currentEmail, workspace: this.currentWorkspace}});
    //console.log(this.channelToCreate);
  }
  // private _filter(value: User): User[] {
  //   const filterValue = value.firstName.toLowerCase();
  //   return this.allUsers.filter(x => x.firstName.toLowerCase().indexOf(filterValue) === 0);
  // }
}

import { Component, OnInit } from '@angular/core';
// import {UserAccount} from '../Model';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invite-members',
  templateUrl: './invite-members.component.html',
  styleUrls: ['./invite-members.component.css']
})
export class InviteMembersComponent implements OnInit {

  emailForm: FormGroup;
  submitted = false;
  workspace : string;

  constructor(private inviteservice: ChatService, private router: Router, private form : FormBuilder) { }

  ngOnInit() {
      this.inviteservice.currentWorkspace .subscribe(workspace => this.workspace = workspace)
    // .subscribe(workspace => this.workspace = workspace)
    this.emailForm = this.form.group({
      EmailId: ['', [Validators.required, Validators.email]],
    })
     }
     get f() { return this.emailForm.controls; }

     onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.emailForm.invalid) {
          return;
      }
      else{
        this.PostToGmail();
        // this.newMessage();

      }


  }

  PostToGmail() {
    console.log("Open Gmail");
    var Email = {
      "emailId": this.emailForm.value.EmailId,
      "workspace" : this.workspace
    };    this.inviteservice.sendInviteMail(Email).subscribe(data => console.log('success'), err => console.log(err));
  }

  // newMessage() {
  //   console.log(this.emailForm.value);
  //   this.inviteservice.showEmailId(this.emailForm.value.EmailId);
  // }

  }



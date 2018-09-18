import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatService } from '../app/chat.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Workspace } from './Workspace';
import { Channel } from './Channel';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from './User';
import { Message } from './Message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
}

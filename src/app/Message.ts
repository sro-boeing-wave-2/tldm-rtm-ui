import {User} from './User';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Message{
  messageId:string;
  messageBody:string;
  timestamp: string;
  isStarred:string;
  sender:User;
  channelId: string
 }

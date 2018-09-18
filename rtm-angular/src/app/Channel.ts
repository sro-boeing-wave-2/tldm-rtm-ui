import {Message} from './Message';
import {User} from './User';

export class Channel{
  channelId:string;
  channelName:string;
  users:User[];
  admin:User;
  messages:Message[];
  workspaceId:string;
 }

import {Channel} from './Channel';
import {User} from './User';

export class Workspace{
  workspaceId:string;
  workspaceName:string;
  channels:Channel[];
  users:User[];
  defaultChannels:Channel[];
 }

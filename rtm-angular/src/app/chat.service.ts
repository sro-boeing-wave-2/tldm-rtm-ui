import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from './User';
import { Message } from './Message';
import { Channel } from './Channel';
import { Workspace } from './Workspace';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private emailId = new BehaviorSubject('');
  currentEmailId = this.emailId.asObservable();
  private workspace = new BehaviorSubject('');
  currentWorkspace = this.workspace.asObservable();

  private listOfUsers = new BehaviorSubject([]);
  currentListOfUsers = this.listOfUsers.asObservable();
  user: User;
 private currentUser = new BehaviorSubject(this.user);
 currentuser = this.currentUser.asObservable();

 channel: Channel;
 private channelSelected = new BehaviorSubject(this.channel);
 channelselected = this.channelSelected.asObservable();

  private _chaturl = "http://172.23.238.230:5004/api/chat/workspaces";///////check port

//  private _chaturl = "http://172.23.238.165:7000/connect/api/chat/workspaces";

//  private _ipaddress = "http://172.23.238.165:7000";
 private inviteusers: string = "http://172.23.238.206:7000/onboard/invite";

  constructor(private http: HttpClient) { }

  setEmailAndWorkspace(email: string, workspace: string) {
    console.log("setting workspace");
    this.emailId.next(email);
    this.workspace.next(workspace);
    console.log(this.workspace.value);
  }

  setListOfUsers (listofusers:User[]){
    this.listOfUsers.next(listofusers);
  }

  setCurrentUser(user: User){
    this.currentUser.next(user);
  }

  setChannelSelected(channel:Channel){
    this.channelSelected.next(channel);
  }

  CreateWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.http.post<Workspace>(this._chaturl, workspace, httpOptions).pipe(

      catchError(this.handleError<Workspace>('CreateWorkspace'))
    );
  }


  addUserToWorkSpace(user: User): Observable<User> {
    const url = `${this._chaturl + "/user"}`;
    return this.http.put(url, user, httpOptions).pipe(
      catchError(this.handleError<any>('addUserToWorkSpace'))
    );
  }

  createNewChannel(channel:Channel, workspacename:string): Observable<Channel> {
    var x= `${this._chaturl}/${workspacename}`;

    console.log(x);
    return this.http.put(`${this._chaturl}/${workspacename}`, channel, httpOptions).pipe(
      catchError(this.handleError<any>('createNewChannel'))
    )
  }

  getChannelIdByWorkspaceName(workspacename: string):Observable<Channel>{
    return this.http.get<Channel>(`${this._chaturl}/${workspacename}`).pipe(

      catchError(this.handleError<any>('getChannelIdByWorkspaceName'))
    );

  }

  getUserById(userid:string):Observable<User>{
    const url = "http://172.23.238.230:5004/api/chat/user"
    return this.http.get<User>(`${url}/${userid}`).pipe(
      catchError(this.handleError<any>('getUserById'))
    );
  }

  getUserChannels(emailId:string,workSpaceName:string):Observable<Channel[]>{
    return this.http.get<Channel[]>(`${this._chaturl}/${workSpaceName}/${emailId}`).pipe(
      catchError(this.handleError<any>('getUserChannels'))
    );
  }

  getAllUsersInWorkspace(workspaceName:string):Observable<User[]>{
    const url = "http://172.23.238.230:5004/api/chat/workspaces/user";
    return this.http.get<User[]>(`${url}/${workspaceName}`).pipe(
      catchError(this.handleError<any>('getAllUsersInWorkspace'))
    );
  }

  addMemberToChannel(user:User, channelid:string):Observable<Channel> {
    const url = `${this._chaturl + "/channel"}/${channelid}`;
    console.log(url);
    return this.http.put(url, user, httpOptions).pipe(
      catchError(this.handleError<any>('addMemberToChannel')
    ));
  }

  getWorkspaceObjectByWorspaceName(workspaceName: string):Observable<Workspace>{
    const url = `${this._chaturl}/${workspaceName}`;
    return this.http.get(url).pipe(
      catchError(this.handleError<any>('getWorkspaceObjectByWorspaceName'))
    )
  }
   getChannelById(channelId: string):Observable<Channel>{
    const url = `${this._chaturl +"/channelId"}/${channelId}`;
    return this.http.get(url).pipe(
      catchError(this.handleError<any>('getChannelById'))
    )
  }
   getOneToOneChannel(senderMail:string, receiverMail:string, workspaceName:string):Observable<Channel>{
    const url = `${this._chaturl + "/onetoone"}/${workspaceName}/${senderMail}/${receiverMail}`;
    console.log(url);
    return this.http.get(url).pipe(
      catchError(this.handleError<any>('getOneToOneChannel'))
    )
  }

  loadMoreMessages(channelid:string, N:number):Observable<Message[]>{
    const url = `${this._chaturl + "/channel/messages"}/${channelid}/${N}`;
    console.log(url);
    return this.http.get(url).pipe(
      catchError(this.handleError<any>('loadMoreMessages'))
    )
  }
  /*============================================================== */
  sendInviteMail(email: any) {
    console.log(email);
    return this.http.post(this.inviteusers, email, httpOptions);
  }

  // showEmailId(message: string) {
  //   console.log(message);
  //   this.messageSourceEmail.next(message)
  // }

  /*============================================================== */

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      ///this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

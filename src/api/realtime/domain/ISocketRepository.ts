export interface ISocketRepository{
    disconnectUser(socket:any):void;
    handleMessage(socket:any, io:any, message:string):void;
}
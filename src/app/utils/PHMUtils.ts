import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PHMUtils {

  private _serverIp: string;
  private _serverPort: string;
  private _ctx: string;

  public createPHMServerURL(uri: string):string {
    return `http://${this._serverIp}:${this._serverPort}/${this._ctx}/${uri}`;

  }

  public setServerIp(value: string) {

    this._serverIp = value;
  }

  public setServerPort(value: string) {
    this._serverPort = value;
  }


  public setCtx(value: string) {
    this._ctx = value;
  }
}

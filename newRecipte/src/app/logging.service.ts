import { Injectable } from '@angular/core';

@Injectable()
export class LogginngService {

  lastlog: string;

  printLog( message: string) {
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
  }

}

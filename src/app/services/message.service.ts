import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  messages: string[] = [];

  debug(author: string, message: string) {
    const wrap = this.wrapAuthor(author, message);
    console.debug(wrap);
    // this.messages.push(wrap);
  }

  info(author: string, message: string) {
    const wrap = this.wrapAuthor(author, message);
    console.info(wrap);
    // this.messages.push(wrap);
  }

  warn(author: string, message: string) {
    const wrap = this.wrapAuthor(author, message);
    console.warn(wrap);
    this.messages.push(wrap);
  }

  error(author: string, message: string, error?: Error) {
    const wrap = this.wrapAuthor(author, message, error);
    console.error(wrap);
    // console.error(error);
    // console.log(error?.message);
    this.messages.push(wrap);
  }

  private wrapAuthor(author: string, message: string, error?: Error): string {
    let wrap = author ? `${author}: ${message}` : message;
    if (error) {
      wrap += ` - ${error.message}`;
    }
    return wrap;
  }

  clear() {
    this.messages = [];
  }
}

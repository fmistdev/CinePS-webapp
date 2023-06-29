import { Injectable } from '@angular/core';
import { Membre } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private tokenKey = 'token';
  private membreKey = 'member';

  // local storage permet de partager le token entre les onglets, et de resister malgre la fermeture du navigateur
  private storage = localStorage;
  // private storage = sessionStorage;

  constructor() { }

  setToken(token: string): void {
    this.storage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.storage.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.storage.removeItem(this.tokenKey);
  }

  //---------------------

  removeAll(): void {
    this.storage.clear();
  }

  //------------------------

  setMember(member: Membre) {
    this.storage.setItem(this.membreKey, JSON.stringify(member));
  }

  getMember(): string | null {
    const jsonMember = this.storage.getItem(this.membreKey);
    if(!jsonMember) {
      return null;
    }
    return JSON.parse(jsonMember);
  }

  removeMember(): void {
    this.storage.removeItem(this.membreKey);
  }

}

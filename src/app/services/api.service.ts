import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import {
  CurrentSemaine,
  HavingVotedMember,
  HavingVotedMemberResponse,
  PatchSemaineBody,
  PostPropositionBody,
  PostSaveVotePropositionBody,
  Proposition,
} from '../models/api.model';
import { env } from '../environment/environment';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private message: MessageService) {}

  getCurrentSemaine(): Observable<CurrentSemaine> {
    this.message.debug(this.constructor.name, 'try to getCurrentSemaine');
    return this.http
      .get<CurrentSemaine[]>(`${env.apiUrl}/api/currentSemaine`, httpOptions)
      .pipe(map((x) => x[0]));
  }

  aVoteCurrentSemaine(idMembre: number): Observable<boolean> {
    this.message.debug(this.constructor.name, 'try to get aVoteCurrentSemaine');
    return this.http.get<boolean>(
      `${env.apiUrl}/aVoteCurrentSemaine/${idMembre}`,
      httpOptions
    );
  }

  patchSemaine(
    idSemaine: number,
    patchSemaineBody: PatchSemaineBody
  ): Observable<CurrentSemaine> {
    this.message.debug(
      this.constructor.name,
      `try to patch Semaine id:${idSemaine}`
    );
    return this.http.patch<CurrentSemaine>(
      `${env.apiUrl}/api/semaine/${idSemaine}`,
      patchSemaineBody,
      httpOptions
    );
  }

  postProposition(
    postPropositionBody: PostPropositionBody
  ): Observable<Proposition> {
    this.message.debug(this.constructor.name, `try to post proposition`);
    return this.http.post<Proposition>(
      `${env.apiUrl}/api/proposition`,
      postPropositionBody,
      httpOptions
    );
  }

  postAVote(idMembre: number): Observable<CurrentSemaine> {
    this.message.debug(this.constructor.name, `try to post AVote`);
    return this.http.post<CurrentSemaine>(
      `${env.apiUrl}/api/avote/${idMembre}`,
      {},
      httpOptions
    );
  }

  postSaveVoteProposition(
    postSaveVotePropositionBody: PostSaveVotePropositionBody
  ): Observable<CurrentSemaine> {
    this.message.debug(
      this.constructor.name,
      `try to post SaveVoteProposition`
    );
    return this.http.post<CurrentSemaine>(
      `${env.apiUrl}/api/saveVoteProposition`,
      postSaveVotePropositionBody,
      httpOptions
    );
  }

  // les membres ayant deja voté cette semaine
  getHavingVotedMembers(idSemaine: number): Observable<HavingVotedMember[]> {
    this.message.debug(this.constructor.name, 'try to getVotants');
    return this.http
      .get<HavingVotedMemberResponse[]>(
        `${env.apiUrl}/membreVotant/${idSemaine}`,
        httpOptions
      )
      .pipe(map((response) => response.map((item) => item.votant)));
  }
}

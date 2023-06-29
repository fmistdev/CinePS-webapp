//---------------------------- login --------------------
export interface Token {
  token: string;
}

export interface DecodedToken {
  roles: string[];
  username: string;
  exp: number;
  expirationDateUTC: string;
  expirationDateFR: string;
}

export interface Credentials {
  email: string;
  password: string;
}

// ----------------------------- Current Semaine ---------------

export interface CurrentSemaine {
  id: number;
  jour: string;
  proposition_termine: boolean;
  theme?: string;
  propositions: Proposition[];
  proposeur: Proposeur;
}

export interface Proposition {
  id: number;
  film: Film;
  score: number;
}

export interface Film {
  titre: string;
  date: string; // a priori date de la prochaine ps (un vendredi)
  sortie_film: number;
  imdb: string;
}

export interface Proposeur {
  id: number;
  Nom: string;
}

export interface HavingVotedMember {
  id: string;
  Nom: string;
}

// -------------------------- Membres -----------------------

export interface Membre {
  id: number;
  Nom: string;
  Prenom: string;
  mail: string;
}

export const defaultMember = {
  id: -1,
  Nom: 'defaultMember',
  Prenom: 'defaultMember',
  mail: 'defaultMember',
};

// -------------------------- api body / response -----------------------

export interface PatchSemaineBody {
  theme?: string;
  proposition_terminee?: boolean;
}

export interface PostPropositionBody {
  titre_film: string;
  sortie_film: number; // année
  imdb_film: string;
}

export interface PropositionVote {
  propositionId: number;
  score: number;
}

export interface PostSaveVotePropositionBody {
  membre: number; // membreId
  proposition: number; // propositionId
  vote: number;
}

export interface HavingVotedMemberResponse {
  votant: HavingVotedMember;
}

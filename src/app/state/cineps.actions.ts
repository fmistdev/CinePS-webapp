import { PostPropositionBody, PropositionVote } from '../models/api.model';

export namespace CinePsActions {
  export class GetCurrent {
    static readonly type = '[CinePs] Get Current Semaine';
  }

  export class HasUserVoted {
    static readonly type = '[CinePs] has user voted on current semaine';
  }

  export class SetTheme {
    static readonly type = '[CinePs] Set Theme';
    constructor(public theme: string) {}
  }

  export class TogglePropositionTerminee {
    static readonly type = '[CinePs] Toggle Proposition Terminee';
  }

  export class ProposeFilm {
    static readonly type = '[CinePs] Propose Film';
    constructor(public postPropositionBody: PostPropositionBody) {}
  }

  export class GetHavingVotedMembers {
    static readonly type = '[CinePs] Get Having Voted Members';
  }

  export class VoteProposition {
    static readonly type = '[CinePs] Vote Proposition';
    constructor(public propositionVote: PropositionVote) {}
  }

  export class CloseVote {
    static readonly type = '[CinePs] Close Vote';
  }
}

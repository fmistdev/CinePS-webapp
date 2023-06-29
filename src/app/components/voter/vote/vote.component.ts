import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import {
  PostSaveVotePropositionBody,
  PropositionVote,
} from 'src/app/models/api.model';
import { CinePsActions } from 'src/app/state/cineps.actions';
import { CinePsSelectors } from 'src/app/state/cineps.state';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent {
  propositions$ = this.store.select(CinePsSelectors.propositions);

  @Input() userId: number = -1;

  constructor(private store: Store) {}

  dragstart(e: any) {
    // console.log('dragstart', e);
    e.dataTransfer.setData('text/plain', e.target.id);
    // e.dataTransfer.dropEffect = "copy";
  }

  dragover(e: any) {
    // console.log("dragover", e);
    e.preventDefault();
    // e.dataTransfer.dropEffect = "move";
    const data = e.dataTransfer.getData('text/plain');

    const draggedElmt = document.getElementById(data);

    if (!draggedElmt) {
      return;
    }
    const belowElmt = e.target;
    const parentElmt = belowElmt.parentNode;

    const position = draggedElmt.compareDocumentPosition(belowElmt);

    switch (position) {
      case 0:
        // console.log(`${draggedElmt.innerText} immobile`);
        break;

      case Node.DOCUMENT_POSITION_PRECEDING:
        // l'element deplacé se situe avant l'element survolé
        // console.log(`${belowElmt.innerText} avant`);
        // parentElmt.insertBefore(draggedElmt, belowElmt);
        parentElmt.insertBefore(belowElmt, draggedElmt.nextSibling);
        break;

      case Node.DOCUMENT_POSITION_FOLLOWING:
        // l'element deplacé se situe apres l'element survolé
        // console.log(`${belowElmt.innerText} apres`);
        parentElmt.insertBefore(belowElmt, draggedElmt);
        // parentElmt.insertBefore(draggedElmt, belowElmt.nextSibling);
        break;

      default:
        break;
    }
  }

  drop(e: any) {
    // console.log('drop', e);
    e.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    // const data = e.dataTransfer.getData("text/plain");
    // e.target.appendChild(document.getElementById(data));
  }

  getVoteOrder(): number[] {
    const listElmt = document.getElementById('testlist');
    if (!listElmt) {
      return [];
    }
    const vote = Array.from(listElmt.getElementsByClassName('proposition')).map(
      (n) => {
        // console.log("child node", n.id)
        return extractId(n.id);
      }
    );
    // console.log("vote", vote);
    return vote;
  }

  wrapPropositionId = wrapId;

  endVote() {
    const voteOrder = this.getVoteOrder();

    const userId = this.userId;

    if (userId < 0) {
      return;
    }

    // const dd: PostSaveVotePropositionBody[] = voteOrder.map(
    //   (propositionId, index) => {
    //     return {
    //       membre: userId,
    //       proposition: propositionId,
    //       vote: index + 1,
    //     };
    //   }
    // );

    console.log('voteOrder', voteOrder);

    voteOrder
      .map(mapIntoPropositionVote)
      .forEach((propositionVote) =>
        this.store.dispatch(new CinePsActions.VoteProposition(propositionVote))
      );

    this.store.dispatch(new CinePsActions.CloseVote());
  }
}

function mapIntoPropositionVote(
  propositionId: number,
  index: number
): PropositionVote {
  return {
    propositionId: propositionId,
    score: index + 1,
  };
}

const salt = 'proposition';

function wrapId(id: number): string {
  return `${salt}-${id}`;
}

function extractId(htmlId: string): number {
  // console.log("htmlId",htmlId);
  // const regex = /^proposition-([\d]+)$/;
  const regex = new RegExp(`^${salt}-([\\d]+)$`);
  // console.log("regex",regex);
  const result = regex.exec(htmlId);
  if (!result) {
    throw new Error(`Cannot extract Id of the string: ${htmlId}`);
  }
  // console.log("result",result);
  // console.log("parseInt(result[1], 10)",parseInt(result[1], 10));
  return parseInt(result[1], 10);
}

import createEvent from "./create-event.js";
import createPlayer from "./create-player.js";

export default async function playBattleship(gameUI /* winListeners */) {
  const playerOne = createPlayer();
  const playerTwo = createPlayer();
  const winEvent = createEvent();
  // winListeners.forEach((fn) => winEvent.addListener(fn));

  // decide which player goes first
  // loop until game ends: (find a good way to end loop)
  //   render gameboards (remove ships from opponent board somewhere first?)
  gameUI.render(playerTwo.board.getState(), playerOne.board.getState());
  //   listen for player attack
  //     send attack to opponent, render attack results, remove listener
  //   listen for turn to end
  //     change pov (dis/enable ui if computer player),
  //     change turns, remove listener
  winEvent.send(/* winner details */);
}

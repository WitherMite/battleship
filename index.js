import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import playBattleship from "./src/play-battleship.js";

playBattleship(createBrowserGameUI());

// TODO list:
//   change playBattleship to be event based instead of dep. injection
//   get game loop working
//   dont hardcode game config (boardsize, ships, etc.)
//   document api for playBattleship fn

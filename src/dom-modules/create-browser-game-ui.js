import drawGameGrid from "./draw-game-grid.js";
import renderGameboard from "./render-gameboard.js";
import switchUITemplate from "./switch-ui-template.js";
import playerAttack from "./player-attack.js";
import playerPlaceShips from "./player-place-ships.js";
import getOpponentType from "./get-opponent-type.js";
import endTurnBtn from "./end-turn-btn.js";

export default function createBrowserGameUI() {
  const gameWindow = document.querySelector(".game-window");
  const winDialog = document.querySelector(".win-popup");
  return {
    setNewGameBtns(callback) {
      const btns = document.querySelectorAll(".restart-btn");
      btns.forEach((btn) =>
        btn.addEventListener("click", function fn() {
          if (
            btn.classList.contains("win-restart-btn") ||
            confirm("This will end the current game.")
          ) {
            btn.removeEventListener("click", fn);
            callback();
          }
        })
      );
      winDialog.close();
    },

    async chooseOpponent(makeComputer) {
      this.changeUI("menu");
      const type = await getOpponentType();
      return type === "p2" ? this.createPlayerInput() : makeComputer();
    },

    render(boardState, radarState) {
      const grids = gameWindow.querySelectorAll(".game-grid");
      grids.forEach((grid) => drawGameGrid(grid, boardState.length));

      const playerBoard = gameWindow.querySelector(
        ".player-board .game-tile-container"
      );
      renderGameboard(playerBoard, boardState);
      if (radarState) {
        const playerRadar = gameWindow.querySelector(
          ".radar .game-tile-container"
        );
        renderGameboard(playerRadar, radarState);
      }
    },

    changeUI(uiType, playerPov) {
      switch (uiType) {
        case "menu":
          return switchUITemplate("menu-ui-template");
        case "place-ships":
          return playerPov === "computer"
            ? switchUITemplate("pregame-cpu-ui-template")
            : switchUITemplate("pregame-ui-template");
        case "gameplay":
          return switchUITemplate("main-ui-template");
      }
    },

    showWinDialog(player) {
      const message = `Winner: ${player.name}`;
      const msgEle = winDialog.querySelector(".win-msg");
      msgEle.textContent = message;
      winDialog.showModal();
    },

    createPlayerInput() {
      return {
        name: "Player",
        povType: "human",
        attack: playerAttack,
        placeShips: playerPlaceShips,
        async endTurn(opponentType) {
          if (opponentType === "computer") return;
          await endTurnBtn();
          switchUITemplate("hide-screen-template");
          return new Promise((resolve) => {
            const button = document.querySelector(".show-screen-btn");
            button.addEventListener("click", resolve);
          });
        },
      };
    },
  };
}

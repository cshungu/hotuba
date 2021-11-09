/**
    * @description      : Fichier principal
    * @author           : christian
    * @group            : 
    * @created          : 06/10/2021 - 00:54:31
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/10/2021
    * - Author          : christian
    * - Modification    : 
**/
import "./sass/app.scss";
import { Card } from "./ts/Card";
import { Player } from "./ts/Player";

(function () {
    Card.init();
    if (document.getElementById("players")) {
        window.addEventListener("load", () => {
            let player: Player = new Player("players");
            player.init();
        });
    }
})();
<div id="game">
    <button type="button" class="active" id="start">Start</button>
    <canvas id="canvasgame"></canvas>
</div>
<div id="game_control">
    <h2>Controles</h2>
    <h3>Joueur 1</h3>
    <p><button type="button">Z</button> Monter</p>
    <p><button type="button">S</button> Descendre</p>
    <p><button type="button">ESPACE</button> Accélérer</p>
    <hr>
    <h3>Joueur 2</h3>
    <p><button type="button">↑</button> Monter</p>
    <p><button type="button">↓</button> Descendre</p>
    <p><button type="button">ENTER</button> Accélérer</p>
    <hr>
    <button type="button" id="nbrjoueurswitch">UN/DEUX JOUEURS</button>
    <p id="nbrjoueuraffiche">Un joueur</p>
</div>
<!-- SCRIPT JS -->
<script src="jeu/Pong/js/classes.js" defer></script>
<script src="jeu/Pong/js/utils.js" defer></script>
<script src="jeu/Pong/index.js" defer></script>
<script src="Ajax/Ajax.js" defer></script>

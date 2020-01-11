new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function (){
            this.heroAttack();
            this.monsterAttack();
        },
        specialAttack: function() {
            let damage = this.calculateDamage(25, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage,
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        heal: function() {
            if(this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10',
            });
            this.monsterAttack();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttack: function() {
            let damage = this.calculateDamage(15, 5);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage,
            });
            this.checkWin()
        },
        heroAttack: function() {
            let damage = this.calculateDamage(10, 3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage,
            });
            if (this.checkWin()) {
                return;
            }
        },
        calculateDamage: function(maxDamage, minDamage) {
           return Math.max( Math.floor(Math.random() * maxDamage) + 1, minDamage); 
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm("You won the game. You want to start a new one?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.monsterHealth = 0;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("You lost the game. You want to start a new one?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.playerHealth = 0;
                }
                return true;
            } else {
                return false;
            }
        }
    }
});
//import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.esm.browser.js'

//random integer
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vue.component('letter-button', {
    props: ['letter', 'gameOver', 'twoPlayers'],
    template: `<button class='keyboard-row-letter' :id='letter' :disabled='disabled' @click='clicked()'>
                {{letter}}
                </button>`,
    data: function() {
        return {
            disabled: false
        };
    },
    methods: {
        clicked: function() {
            this.disabled = true;
            this.$emit('check');
        }
    },
    watch: {
        gameOver: function(newValue) {
            this.disabled = newValue;
        },
        twoPlayers: function(newValue) {
            this.disabled = false;
        }
    },
});

var app = new Vue({
    el: '#app',
    data: {
        letters: [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["Z", "X", "C", "V", "B", "N", "M"]
        ],
        words: [
            "BUTTERCUP",
            "PANSY",
            "PIGEON",
            "REPTILE",
            "HAWK",
            "CAPYBARA",
            "DELICATE",
            "OFFICIAL",
            "ALIMONY",
            "GRANOLA",
            "IMPERATIVE",
            "DELICIOUS",
            "ANTICIPATION",
            "APPLE",
            "BANANA",
            "BILIOUS",
            "INTESTINE",
            "AMPLIFY",
            "TROUBLE",
            "UNBELIEVABLE"
        ],
        currentWord: "",
        wordDivs: [],
        guesses: 0,
        gameOver: false,
        lose: false,
        twoPlayers: false,
        canvas: "",
        ctx: ""
    },
    methods: {
        drawGallows: function(ctx) {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = '#eb34c9';
            ctx.strokeStyle = '#eb34c9';
            ctx.beginPath();
            //left
            ctx.moveTo(this.canvas.width / 10, this.canvas.height / 10);
            ctx.lineTo(this.canvas.width / 10, this.canvas.height * 0.95);
            //bottom
            ctx.lineTo(this.canvas.width * 0.8, this.canvas.height * 0.95);
            //top
            ctx.moveTo(this.canvas.width / 10, this.canvas.height / 10);
            ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 10);
            //hanger
            ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 5);
            ctx.stroke();
            ctx.closePath();
        },
        makeBlanks: function() {
            for (var i = 0; i < this.currentWord.length; i++) {
                this.wordDivs.push("");
            }
        },
        updateCanvas: function(ctx) {
            if (this.guesses === 0) {
                //head
                ctx.beginPath();
                ctx.arc(this.canvas.width * 0.4, (this.canvas.height / 5) + 20, 20, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
            } else if (this.guesses === 1) {
                //body
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 40);
                ctx.lineTo(this.canvas.width * 0.4, this.canvas.height / 2);
                ctx.stroke();
                ctx.closePath();
            } else if (this.guesses === 2) {
                //right leg
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, this.canvas.height / 2);
                ctx.lineTo((this.canvas.width * 0.4) + 30, this.canvas.height * 0.7);
                ctx.stroke();
                ctx.closePath();
            } else if (this.guesses === 3) {
                //left leg
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, this.canvas.height / 2);
                ctx.lineTo((this.canvas.width * 0.4) - 30, this.canvas.height * 0.7);
                ctx.stroke();
                ctx.closePath();
            } else if (this.guesses === 4) {
                //right arm
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 55);
                ctx.lineTo((this.canvas.width * 0.4) + 35, (this.canvas.height / 2) + 10);
                ctx.stroke();
                ctx.closePath();
            } else if (this.guesses === 5) {
                //left arm
                ctx.beginPath();
                ctx.moveTo(this.canvas.width * 0.4, (this.canvas.height / 5) + 55);
                ctx.lineTo((this.canvas.width * 0.4) - 35, (this.canvas.height / 2) + 10);
                ctx.stroke();
                ctx.closePath();
                //handle game over
                ctx.font = "24px Roboto, sans-serif";
                ctx.fillText("GAME OVER", this.canvas.width * 0.4 - 30, this.canvas.height * 0.9);
                this.gameOver = true;
                this.lose = true;
                //fill in answer 
                for (var i = 0; i < this.currentWord.length; i++) {
                    Vue.set(this.wordDivs, i, this.currentWord[i]);
                }
            }
            this.guesses++;
        },
        check: function(letter) {
            if (!this.gameOver) {
                var guessCorrect = false;
                for (var i = 0; i < this.currentWord.length; i++) {
                    if (letter == this.currentWord[i]) {
                        Vue.set(this.wordDivs, i, letter);
                        guessCorrect = true;
                    }
                }
                if (!this.wordDivs.some(function(value) {return value == ''})) {
                    this.gameOver = true;
                    this.ctx.font = "24px Roboto, sans-serif";
                    this.ctx.fillText("YOU WIN!", this.canvas.width * 0.4 - 30, this.canvas.height * 0.9);
                }
                if (!guessCorrect) {
                    this.updateCanvas(this.ctx);
                }
            }
        },
        restart: function() {
            this.gameOver = false;
            this.lose = false;
            this.guesses = 0;
            this.wordDivs.splice(0);
            this.drawGallows(this.ctx);
            this.makeBlanks();
        },
        onePlayer: function() {
            if (this.twoPlayers) {
                this.twoPlayers = false;
                this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
                this.restart();
            }
        },
        twoPlayer: function() {
            if (!this.twoPlayers) {
                this.gameOver = true;
                this.twoPlayers = true;
                this.wordDivs.splice(0);
                try {
                    this.currentWord = prompt('Enter a word!').toUpperCase();
                } 
                catch(e) {
                    this.onePlayer();
                    return;
                }
                var letters = /^[A-Za-z]+$/;
                while (!letters.test(this.currentWord)) {
                    try {
                        this.currentWord = prompt('Only letters please! Enter a word:').toUpperCase();
                    }
                    catch(e) {
                        this.onePlayer();
                        return;
                    }
                }
                this.restart();
            }
        },
        playAgain: function() {
            if (this.twoPlayers) {
                try {
                    this.currentWord = prompt('Enter a word!').toUpperCase();
                }
                catch(e) {
                    this.onePlayer();
                    return;
                }
                var letters = /^[A-Za-z]+$/;
                while (!letters.test(this.currentWord)) {
                    try {
                        this.currentWord = prompt('Only letters please! Enter a word:').toUpperCase();
                    }
                    catch(e) {
                        this.onePlayer();
                        return;
                    }
                }
            } else {
                this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
            }
            this.restart()
        },
    },
    mounted: function() {
        this.canvas = document.getElementById('board-canvas');
        this.canvas.width = document.getElementById('board').offsetWidth;
        this.canvas.height = document.getElementById('board').offsetHeight;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = 2;
        this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
        this.makeBlanks();
    }
});
var Gam = {
    Config: {}
};
Gam.Config.sound = !0, Gam.Config.animations = !0, Gam.Config.gameType = "BlocksPuzzle", Gam.Config.font = "Roboto,sans-serif,Arial", Gam.Config.scores = [], Gam.Config.android = false, Gam.Config.version = "1.3.0", Gam.Sfx = function() {}, Gam.Sfx.prototype = {
    load: function() {
        Gam.Config.android ? (this.click = new Media("/android_asset/www/assets/sfx/13266__hartboy__glitch-two.ogg", null, null), this.error = new Media("/android_asset/www/assets/sfx/13265__hartboy__glitch-one.ogg", null, null), this.button = new Media("/android_asset/www/assets/sfx146722__leszek-szary__menu-click.ogg", null, null), this.swish = new Media("/android_asset/www/assets/sfx/swish2.ogg", null, null), this.magic = new Media("/android_asset/www/assets/sfx/264981__renatalmar__sfx-magic.ogg", null, null), this.button2 = new Media("/android_asset/www/assets/sfx/button.ogg", null, null), this.click2 = new Media("/android_asset/www/assets/sfx/click.ogg", null, null), this.pop = new Media("/android_asset/www/assets/sfx/pop.ogg", null, null), this.victory = new Media("/android_asset/www/assets/sfx/victory.ogg", null, null)) : (game.load.audio("click", "assets/sfx/13266__hartboy__glitch-two.mp3"), game.load.audio("error", "assets/sfx/13265__hartboy__glitch-one.mp3"), game.load.audio("button", "assets/sfx/146722__leszek-szary__menu-click.mp3"), game.load.audio("swish", "assets/sfx/swish2.mp3"), game.load.audio("magic", "assets/sfx/264981__renatalmar__sfx-magic.mp3"), game.load.audio("button2", "assets/sfx/button.mp3"), game.load.audio("click2", "assets/sfx/click.mp3"), game.load.audio("pop", "assets/sfx/pop.mp3"), game.load.audio("victory", "assets/sfx/victory.mp3"))
    },
    create: function() {
        Gam.Config.android || (this.click = game.add.audio("click"), this.error = game.add.audio("error"), this.button = game.add.audio("button"), this.swish = game.add.audio("swish"), this.magic = game.add.audio("magic"), this.button2 = game.add.audio("button2"), this.click2 = game.add.audio("click2"), this.pop = game.add.audio("pop"), this.victory = game.add.audio("victory"))
    },
    play: function(t) {
        game.user.sound && ("click" == t ? this.click.play() : "error" == t ? this.error.play() : "button" == t ? this.button.play() : "swish" == t ? this.swish.play() : "magic" == t ? this.magic.play() : "button2" == t ? this.button2.play() : "click2" == t ? this.click2.play() : "pop" == t ? this.pop.play() : "victory" == t && this.victory.play())
    }
}, Gam.Boot = function(t) {}, Gam.Boot.prototype = {
    preload: function() {},
    create: function() {
        this.input.maxPointers = 1, this.stage.disableVisibilityChange = !1, game.tweens.frameBased = !1, game.time.advancedTiming = !0, game.forceSingleUpdate = !0, game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL, game.scale.pageAlignHorizontally = !0, game.scale.pageAlignVertically = !0, game.sfx = new Gam.Sfx, Gam.s.add("onNewGame", "onGameStart", "onGameOver", "onGamePause", "onGameResume", "onScores", "onSound", "onMessage", "onCongrats", "onAbout", "onColor", "onDialogOpen", "onDialogClose"), Gam.Local.loadUser(), Gam.Local.incUser(), 2 < game.user.starts && 2 < game.user.plays && tigerVerifyConsent(), this.game.state.start("Preloader")
    }
}, Gam.Preloader = function(t) {}, Gam.Preloader.prototype = {
    preload: function() {
         
		this.load.image("title", "assets/blockspuzzle.png"), 
		this.load.atlas("all", "assets/sprites.png", "assets/sprites.json"), 
		this.load.atlas("spritesheet", "assets/spritesheet.png", "assets/spritesheet.json"), 
		this.load.bitmapFont("font", "assets/font/font.png", "assets/font/font.xml"), 
		game.sfx.load();
    },
    create: function() {
        game.sfx.create();
		this.game.state.start("Menu");
    }
}, Gam.n = function(t) {
    return t
}, Gam.s = {
    clearOnStageChange: !1,
    add: function() {
        for (var t = Array.isArray(arguments[0]) ? arguments[0] : arguments, e = 0, s = t.length; e < s; e++) this[t[e]] || (this[t[e]] = new Phaser.Signal);
        this.clearOnStageChange || game.state.onStateChange.add(this.clear, this)
    },
    clear: function() {
        Object.keys(this).forEach(function(t) {
            this[t].removeNonPermanent && this[t].removeNonPermanent()
        }, this)
    }
}, Gam.Local = {
    getUser: function() {
        return {
            sound: !0,
            plays: 0,
            starts: 0,
            bestscore: 0,
            bestscoreexperimental: 0,
            noads: !1,
            noadsnum: 0,
            rate: !1,
            close: !1
        }
    },
    saveUser: function() {
        localStorage.setItem("blockspuzzle", JSON.stringify(game.user))
    },
    loadUser: function() {
        game.showrate = !1;
        var t = localStorage.getItem("blockspuzzle");
        t ? (game.user = JSON.parse(t), void 0 === game.user.bestscoreexperimental && (game.user.bestscoreexperimental = 0, Gam.Local.saveUser())) : game.user = this.getUser()
    },
    incUser: function() {
        game.user.starts || (game.user.starts = 0), game.user.rate || (game.user.rate = !1), game.user.starts++, this.saveUser()
    },
    clear: function() {
        game.user = this.getUser(), this.saveUser()
    }
}, Gam.Menu = function(t) {}, Gam.Menu.prototype = {
    create: function() {
        //this.game.stage.backgroundColor = "#ac99db", 
		game.add.image(game.width / 2, 250, "title").anchor.set(.5);
        var e = new Gam.Button(game.width / 2, 550, "buttonbig", this.playRegular, this, "Classic");
        game.add.existing(e);
        var s = new Gam.Button(game.width / 2, 650, "buttonbig", this.playExperiment, this, "Experiment");
        game.add.existing(s)
    },
    playRegular: function() {
		gradle.event('Button_Classic');
        game.state.start("Game", !0, !1, "regular")
    },
    playExperiment: function() {
		gradle.event('Button_Experiment');
        game.state.start("Game", !0, !1, "experimental")
    }
};
Gam.Piece = function(t, e, color) {
	//console.log(color);
    Phaser.Image.call(this, game, t, e), 
	this.setColor(color), 
	Gam.loadTexture(this, "b" + color, "all"), 
	this.width = 42, this.height = 42, 
	this.anchor.set(.5), this.rewind();
};
var SQUARESIZE = 42,
    SQUARESIZEHALF = 21;
Gam.Piece.prototype = Object.create(Phaser.Image.prototype), Gam.Piece.prototype.constructor = Gam.Piece, Gam.Piece.prototype.setColor = function(t) {
    this.color = t, Gam.loadTexture(this, "b" + t, "all")
}, Gam.Piece.prototype.rewind = function() {
    this.rotation = 0, this.timer = 0, this.alpha = 1
}, Gam.Piece.prototype.fly = function() {
    this.rotation = 0, this.timer = 0, this.alpha = 1, this.dx = Math.random() - .5, this.dy = -Math.random() - .3
}, Gam.PieceButton = function(t, e, color) {
    Phaser.Image.call(this, game, 0, 0), 
	this.id = t, 
	this.color = color,
	this.array = e, 
	this.inputEnabled = !0, 
	this.dragging = !1, 
	this.offset = e[0].length * SQUARESIZE / 2, this.input.enableDrag(!0);
	//console.log(t);
    for (var s = 0; s < e.length; s++)
        for (var a = 0; a < e[s].length; a++)
            if (1 == e[s][a]) {
                var o = new Gam.Piece(SQUARESIZE * a - this.offset, SQUARESIZE * s, SHAPES_COLOR[t]);
				o.anchor.set(0), this.addChild(o)
            }
    this.events.onDragStart.add(this.onDragStart, this), 
	this.events.onDragStop.add(this.onDragStop, this)
}, Gam.PieceButton.prototype = Object.create(Phaser.Image.prototype), Gam.PieceButton.prototype.constructor = Gam.PieceButton, 
Gam.PieceButton.prototype.setSpot = function(t, e) {
    this.x = this.initX = t - this.width / 2, this.y = this.initY = e
}, Gam.PieceButton.prototype.onDragStart = function() {
	//console.log('start:'+this.color);
    game.sfx.play("click2"), this.dragging = !0
}, Gam.PieceButton.prototype.returnToSpot = function() {
    this.x = this.initX, this.y = this.initY
}, Gam.PieceButton.prototype.onDragStop = function(t, e) { // stop drag 
	//console.log('stop:'+this.color);
    this.dragging = !1, 
	//console.log(this.color),
	board.addBlocks(e.x - this.offset, e.y, t.id, this.color) 
		? 
			(this.parent.removeButton(this), game.sfx.play("click"), board.checkGameOver() && Gam.s.onGameOver.dispatch()) 
		: 
			(this.x = this.initX, this.y = this.initY, game.sfx.play("error"))

}, Gam.ToolBox = function() {
    Phaser.Group.call(this, game), this.buttonsValues = [], this.buttons = [];
	
    for (var t = 0; t < SHAPES.length; t++) 
		this.buttonsValues[t] = new Gam.PieceButton(t, SHAPES[t], SHAPES_COLOR[t]);
	
    Gam.s.onGameStart.add(this.onGameStart, this), 
	Gam.s.onGameOver.add(this.onGameStop, this), 
	Gam.s.onGamePause.add(this.onGamePause, this), 
	Gam.s.onGameResume.add(this.onGameResume, this)
}, Gam.ToolBox.prototype = Object.create(Phaser.Group.prototype), Gam.ToolBox.prototype.constructor = Gam.ToolBox, 
Gam.ToolBox.prototype.remap = function() {
    this.clear();
    for (var t = 0; t < 3; t++) {
        var e = Math.floor(Math.random() * this.buttonsValues.length),
            s = this.buttonsValues[e];
        this.buttonsValues.splice(e, 1), 
		this.buttons.push(s), 
		s.inputEnabled = !0, 
		this.add(this.buttons[t]);
        var a = 130 + t % 3 * 150;
        this.buttons[t].setSpot(a, 600)
    }
}, Gam.ToolBox.prototype.onGameStart = function() {
    this.remap()
}, Gam.ToolBox.prototype.onGameStop = function() {
    for (var t = 0; t < this.buttons.length; t++) this.buttons[t].inputEnabled = !1
}, Gam.ToolBox.prototype.onGamePause = function() {
    for (var t = 0; t < this.buttons.length; t++) this.buttons[t].inputEnabled = !1
}, Gam.ToolBox.prototype.onGameResume = function() {
    for (var t = 0; t < this.buttons.length; t++) this.buttons[t].inputEnabled = !0
}, Gam.ToolBox.prototype.removeButton = function(t) {
    var e = this.buttons.indexOf(t);
    this.buttons.splice(e, 1), 
	this.removeChild(t), 
	this.buttonsValues.push(t), 
	0 == this.buttons.length && this.remap()
}, Gam.ToolBox.prototype.clear = function() {
    for (var t; t = this.buttons.pop();) t.parent.removeChild(t), this.buttonsValues.push(t)
}, Gam.ToolBox.prototype.clearAll = function() {
    for (var t; t = this.buttons.pop();) t.parent.removeChild(t), t.destroy();
    for (; t = this.buttonsValues.pop();) t.destroy();
    this.buttons = null, this.buttonsValues = null, Gam.s.onGameStart.remove(this.onGameStart, this), Gam.s.onGameOver.remove(this.onGameStop, this), Gam.s.onGamePause.remove(this.onGamePause, this), Gam.s.onGameResume.remove(this.onGameResume, this)
}, 




Gam.Board = function() {
    Phaser.Group.call(this, game);
    var t = game.make.image(-7, -7, "spritesheet", "board");
    this.add(t), this.SIZEX = 10, this.SIZEY = 10, this.SQUARESIZE = 42, this.combo = 0, this.x = Math.floor((game.width - this.SIZEX * this.SQUARESIZE) / 2), this.y = 130, this.graphics = game.add.graphics(), this.add(this.graphics), this.graphics.lineStyle(2, 16777215, .3), this.graphics.drawRect(-1, -1, this.SQUARESIZE * this.SIZEX, this.SQUARESIZE * this.SIZEY);
    for (var e = 0; e < this.SIZEX; e++) this.graphics.moveTo(0, e * this.SQUARESIZE), this.graphics.lineTo(this.SIZEX * this.SQUARESIZE, e * this.SQUARESIZE), this.graphics.moveTo(e * this.SQUARESIZE, 0), this.graphics.lineTo(e * this.SQUARESIZE, this.SIZEY * this.SQUARESIZE);
    this.piecesGroup = game.make.group(), 
	this.add(this.piecesGroup), 
	this.texts = new Gam.AnimatedTextsGroup, this.add(this.texts), this.animatedPieces = [], this.pieces = [];
    for (e = 0; e < this.SIZEY; e++) {
        this.pieces[e] = [];
        for (var s = 0; s < this.SIZEX; s++) this.pieces[e][s] = null
    }
    this.initGame(), Gam.s.onGameStart.add(this.initGame, this)
}, 

Gam.Board.prototype = Object.create(Phaser.Group.prototype), Gam.Board.prototype.constructor = Gam.Board, Gam.Board.prototype.initGame = function() {
    for (var t = 0; t < this.SIZEY; t++)
        for (var e = 0; e < this.SIZEX; e++) this.pieces[t][e] && (this.pieces[t][e].kill(), this.pieces[t][e] = null)
}, 

Gam.Board.prototype.canAddBlocks = function(t, e, s) {
    if (t < 0 || e < 0 || t >= this.SIZEY || e >= this.SIZEX) return !1;
    if (t + SHAPES[s].length > this.SIZEY || e + SHAPES[s][0].length > this.SIZEX) return !1;
    for (var a = 0; a < SHAPES[s].length; a++)
        for (var o = 0; o < SHAPES[s][a].length; o++)
            if (1 == SHAPES[s][a][o] && null != this.pieces[t + a][e + o]) return !1;
    return !0
}, Gam.Board.prototype.addBlocks = function(t, e, s, color) {
    var a = Math.floor((t - this.x) / this.SQUARESIZE),
        o = Math.floor((e - this.y) / this.SQUARESIZE);
    if (-1 === a && (a = 0), -1 === o && (o = 0), a === this.SIZEX && (a = this.SIZEX - 1), o === this.SIZEY && (o = this.SIZEY - 1), !this.canAddBlocks(o, a, s)) return !1;
	//ADD Block :
	//console.log(SHAPES);
	var id=s;
    for (var i = 0; i < SHAPES[s].length; i++)
        for (var n = 0; n < SHAPES[s][i].length; n++){
			1 == SHAPES[s][i][n] && this.addPiece(o + i, a + n, color);
		}
    return 0 < this.stack() ? (this.combo++, 1 < this.combo && Gam.s.onCongrats.dispatch(this.combo + "X COMBO")) : this.combo = 0, !0
}, Gam.Board.prototype.stack = function() {
    for (var t = [], e = [], s = 0; s < this.pieces.length; s++) this.checkRow(s) && t.push(s), this.checkColumn(s) && e.push(s);
    var a = 10 * (t.length + e.length),
        o = t.length + e.length,
        i = "+" + a;
    for (s = 0; s < t.length; s++) this.removeBlocksHorizontally(t[s], i), game.score += a * this.SIZEX;
    for (s = 0; s < e.length; s++) this.removeBlocksVertically(e[s], i), game.score += a * this.SIZEY;
    if (game.score += 100 * a * this.combo, 3 < o) Gam.s.onCongrats.dispatch("UNBELIEVABLE!");
    else if (2 < o) {
        Math.random() < .5 ? Gam.s.onCongrats.dispatch("AMAZING!") : Gam.s.onCongrats.dispatch("PERFECT!")
    } else 1 < o && Gam.s.onCongrats.dispatch("COOL!");
    return 1 < o ? game.sfx.play("magic") : 0 < a && game.sfx.play("pop"), game.experimental && (game.timer += 500 * a, game.timer > game.TIMER && (game.timer = game.TIMER)), a
}, Gam.Board.prototype.checkRow = function(t) {
    for (var e = 0; e < this.SIZEX; e++)
        if (null === this.pieces[t][e]) return !1;
    return !0
}, Gam.Board.prototype.checkColumn = function(t) {
    for (var e = 0; e < this.SIZEY; e++)
        if (null === this.pieces[e][t]) return !1;
    return !0
}, Gam.Board.prototype.removeBlocksHorizontally = function(t, e) {
    for (var s = 0; s < this.pieces[t].length; s++) 
		null != this.pieces[t][s] && (this.animatedPieces.push(this.pieces[t][s]), this.pieces[t][s].fly(), this.texts.addPoints(this.pieces[t][s].x, this.pieces[t][s].y, e)), this.pieces[t][s] = null
}, Gam.Board.prototype.removeBlocksVertically = function(t, e) {
    for (var s = 0; s < this.pieces.length; s++) null != this.pieces[s][t] && (this.animatedPieces.push(this.pieces[s][t]), this.pieces[s][t].fly(), this.texts.addPoints(this.pieces[s][t].x, this.pieces[s][t].y, e)), this.pieces[s][t] = null
}, Gam.Board.prototype.addPiece = function(t, e, s) {
	//console.log(SHAPES.length);
    var a = this.piecesGroup.getFirstDead();
	
    a ? 
		(a = new Gam.Piece(e * this.SQUARESIZE + SQUARESIZEHALF, t * this.SQUARESIZE + SQUARESIZEHALF, s),/*a.reset(e * this.SQUARESIZE + SQUARESIZEHALF, t * this.SQUARESIZE + SQUARESIZEHALF), */a.rewind()) 
	: 
		a = new Gam.Piece(e * this.SQUARESIZE + SQUARESIZEHALF, t * this.SQUARESIZE + SQUARESIZEHALF, s), 
		this.pieces[t][e] = a, 
		this.piecesGroup.add(this.pieces[t][e]);
	//console.log(this.piecesGroup);
		
}, Gam.Board.prototype.update = function() {
    for (var t = this.animatedPieces.length - 1; 0 <= t; t--) {
        var e = this.animatedPieces[t];
        e.timer += game.timeDiff, e.x += e.dx * game.timeDiff * .2, e.y += e.dy * game.timeDiff * .2, e.dy += .008 * game.timeDiff, e.rotation += .01 * game.timeDiff, 1e3 < e.timer && (e.kill(), this.animatedPieces.splice(t, 1))
    }
    this.texts.update()
}, Gam.Board.prototype.canPutPiece = function(t) {
    t.array;
    for (var e = 0; e < this.pieces.length; e++) return !1
}, Gam.Board.prototype.checkGameOver = function() {
    if (game.experimental) return !1;
    if (0 == toolbox.buttons.length) return !1;
    for (var t = 0; t < toolbox.buttons.length; t++)
        for (var e = 0; e < this.pieces.length; e++)
            for (var s = 0; s < this.pieces[e].length; s++)
                if (this.canAddBlocks(e, s, toolbox.buttons[t].id)) return !1;
    return !0
}, Gam.Board.prototype.clearAll = function() {
    for (var t = 0; t < this.pieces.length; t++) this.pieces[t] = null;
    this.pieces = null, this.piecesGroup.destroy(!0), this.animatedPieces = null, this.texts.destroy(!0), Gam.s.onGameStart.remove(this.initGame, this)
}, Gam.AnimatedTextFormat = {
    font: "bold 20px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle"
}, Gam.AnimatedText = function(t, e, s) {
    Phaser.Text.call(this, game, t, e, s, Gam.AnimatedTextFormat), this.fill = "#ffffff", this.aling = "center", this.size = 10, this.font = "Arial,Roboto", this.stroke = "#000000", this.strokeThickness = 3, this.setShadow(3, 3, "rgba(0,0,0,0.5)", 5), this.anchor.set(.5)
}, Gam.AnimatedText.prototype = Object.create(Phaser.Text.prototype), Gam.AnimatedText.prototype.constructor = Gam.AnimatedText, Gam.AnimatedTextsGroup = function() {
    Phaser.Group.call(this, game)
}, Gam.AnimatedTextsGroup.prototype = Object.create(Phaser.Group.prototype), Gam.AnimatedTextsGroup.prototype.constructor = Gam.AnimatedTextsGroup, Gam.AnimatedTextsGroup.prototype.addPoints = function(t, e, s) {
    var a = this.getFirstDead();
    a ? (a.reset(t, e), a.setText(s)) : (a = new Gam.AnimatedText(t, e, s), this.add(a)), a.timer = 700
}, Gam.AnimatedTextsGroup.prototype.update = function() {
    for (var t = 0; t < this.children.length; t++) this.children[t].alive && (this.children[t].timer -= game.timeDiff, this.children[t].timer <= 0 && this.children[t].kill())
}, Gam.RollText = function(t, e, s) {
    Phaser.BitmapText.call(this, game, t, e, "font", s, 30), this.anchor.set(0, .3), this.value = 0, this.currentValue = 0
}, Gam.RollText.prototype = Object.create(Phaser.BitmapText.prototype), Gam.RollText.prototype.constructor = Gam.RollText, Gam.RollText.prototype.setValue = function(t) {
    this.value = t, this.currentValue = t, this.setText(this.currentValue)
}, Gam.RollText.prototype.updateValue = function(t) {
    this.value = t, this.currentValue = t, this.setText(this.currentValue)
}, Gam.RollText.prototype.update = function() {
    this.currentValue < this.value && (this.currentValue = this.value, this.setText(this.currentValue))
}, Gam.ToolBoxMove = function() {
    Phaser.Group.call(this, game), this.buttonsValues = [], this.buttons = [];
    for (var t = this.counter = 0; t < SHAPES.length; t++) 
		this.buttonsValues[t] = new Gam.PieceButton(t, SHAPES[t], SHAPES_COLOR[t]);
    Gam.s.onGameStart.add(this.onGameStart, this), Gam.s.onGameOver.add(this.onGameStop, this), Gam.s.onGamePause.add(this.onGamePause, this), Gam.s.onGameResume.add(this.onGameResume, this)
}, Gam.ToolBoxMove.prototype = Object.create(Phaser.Group.prototype), Gam.ToolBoxMove.prototype.constructor = Gam.ToolBoxMove, Gam.ToolBoxMove.prototype.remap = function() {
    this.clear(), 
	this.counter = 0, 
	this.addButton()
}, Gam.ToolBoxMove.prototype.update = function() {
    if (game.gameMode === Gam.GameMode.Play) {
        for (var t = this.buttons.length - 1; 0 <= t; t--) this.buttons[t].initX += .15 * game.timeDiff, this.buttons[t].dragging || (this.buttons[t].x = this.buttons[t].initX), this.buttons[t].x > game.width && (this.removeChild(this.buttons[t]), this.buttonsValues.push(this.buttons[t]), this.buttons.splice(t, 1));
        this.counter += game.timeDiff, 2e3 < this.counter && (this.counter = 0, this.addButton())
    }
}, Gam.ToolBoxMove.prototype.onGameStart = function() {
    this.remap()
}, Gam.ToolBoxMove.prototype.onGameStop = function() {
    for (var t = 0; t < this.buttons.length; t++) this.buttons[t].inputEnabled = !1
}, Gam.ToolBoxMove.prototype.onGamePause = function() {
    for (var t = 0; t < this.buttons.length; t++) this.buttons[t].inputEnabled = !1
}, Gam.ToolBoxMove.prototype.onGameResume = function() {
    for (var t = 0; t < this.buttons.length; t++) this.buttons[t].inputEnabled = !0
}, Gam.ToolBoxMove.prototype.addButton = function() {
    var t = Math.floor(Math.random() * this.buttonsValues.length),
        e = this.buttonsValues[t];
		this.buttonsValues.splice(t, 1), 
		this.buttons.push(e), 
		e.inputEnabled = !0, 
		this.add(e), 
		e.setSpot(0, 600);
}, Gam.ToolBoxMove.prototype.removeButton = function(t) {
    var e = this.buttons.indexOf(t);
    this.buttons.splice(e, 1), this.removeChild(t), this.buttonsValues.push(t)
}, Gam.ToolBoxMove.prototype.clear = function() {
    for (var t; t = this.buttons.pop();) t.parent.removeChild(t), this.buttonsValues.push(t)
}, Gam.ToolBoxMove.prototype.clearAll = function() {
    for (var t; t = this.buttons.pop();) t.parent.removeChild(t), t.destroy();
    for (; t = this.buttonsValues.pop();) t.destroy();
    this.buttons = null, this.buttonsValues = null, Gam.s.onGameStart.remove(this.onGameStart, this), Gam.s.onGameOver.remove(this.onGameStop, this), Gam.s.onGamePause.remove(this.onGamePause, this), Gam.s.onGameResume.remove(this.onGameResume, this)
}, Gam.Clock = function() {
    Phaser.Group.call(this, game), this.x = 43, this.y = 560;
    var t = game.make.graphics();
    this.add(t), t.beginFill(1837569), t.drawRect(0, 0, 435, 15), this.timer = game.make.graphics(3, 3), this.add(this.timer), this.timer.beginFill(13209945), this.timer.drawRect(0, 0, 430, 8), this.timer.beginFill(9525279), this.timer.drawRect(0, 8, 430, 2), this.targetTime = 0, this.currentTime = 0
}, Gam.Clock.prototype = Object.create(Phaser.Group.prototype), Gam.Clock.prototype.constructor = Gam.Clock, Gam.Clock.prototype.setTime = function(t, e, s) {
    var a = t / e;
    s && (this.timer.scale.x = a, this.currentTime = a), this.targetTime = a
}, Gam.Clock.prototype.addTime = function(t, e) {
    this.targetTime += t, 1 < this.targetTime && (this.targetTime = 1)
}, Gam.Clock.prototype.update = function() {
    game.gameMode === Gam.GameMode.Play && (this.targetTime > this.currentTime ? (this.currentTime += 2e-4 * game.timeDiff, this.currentTime > this.targetTime && (this.currentTime = this.targetTime), this.timer.scale.x = this.currentTime) : this.targetTime < this.currentTime && (this.currentTime -= 2e-4 * game.timeDiff, this.currentTime < this.targetTime && (this.currentTime = this.targetTime), this.timer.scale.x = this.currentTime))
}, Gam.Button = function(t, e, s, a, o, i) {
    if (Phaser.Button.call(this, game, t, e, null), s && Gam.loadTexture(this, s, "spritesheet"), this.anchor.setTo(.5), i) {
        var n = game.add.text(0, 0, i);
        n.font = "Arial", n.fontSize = 32, n.fill = "#ffffff", n.anchor.set(.5), this.addChild(n)
    }
    this.onClick = new Phaser.Signal, a && this.onClick.add(a, o || this), this.onInputDown.add(this.click, this)
}, Gam.Button.prototype = Object.create(Phaser.Button.prototype), Gam.Button.constructor = Gam.Button, Gam.Button.prototype.click = function() {
    this.onClick.dispatch(), game.sfx.play("button2")
}, Gam.Button.prototype.addText = function(t) {
    var e = game.add.text(0, 20, t);
    e.font = "Arial", e.fontSize = 19, e.fill = "#ffffff", e.stroke = "#991133", e.strokeThickness = 5, e.anchor.set(.5), this.addChild(e)
}, Gam.Dialog = function(t, e, s) {
    Phaser.Group.call(this, game), this.x = game.width / 2, this.y = 2 * game.height, this.opened = !1, s || (s = 0), this.bg = game.add.graphics(), this.add(this.bg), this.bg.lineStyle(3, 16777215, 1), s ? this.bg.beginFill(s, .9) : this.bg.beginFill(0, .8), this.bg.drawRoundedRect(-t / 2, -e / 2, t, e, 30), this.showTween = game.add.tween(this).to({
        y: game.height / 2
    }, 500, Phaser.Easing.Linear.None, !1), this.hideTween = game.add.tween(this).to({
        y: 2 * game.height
    }, 500, Phaser.Easing.Linear.None, !1), this.hideTween.onComplete.add(this.closeEnd, this), Gam.s.onGameStart.add(this.close, this)
}, Gam.Dialog.prototype = Object.create(Phaser.Group.prototype), Gam.Dialog.prototype.open = function(t, e) {
    this.opened || (this.opened = !0, this.visible = !0, game.world.bringToTop(this), game.sfx.play("swish"), t ? this.y = game.height / 2 : (this.y = 2 * game.height, this.showTween.start()), Gam.s.onDialogOpen.dispatch(e))
}, Gam.Dialog.prototype.close = function(t, e) {
    this.opened && (this.opened = !1, game.sfx.play("swish"), t ? (this.visible = !1, this.y = 2 * game.height) : this.hideTween.start(), Gam.s.onDialogClose.dispatch(e))
}, Gam.Dialog.prototype.closeEnd = function() {
    this.visible = !1
}, Gam.RateDialog = function() {
    var t;
    Gam.Dialog.call(this, 480, 480, 0), (t = game.add.text(0, -200, "Rate?")).anchor.set(.5), this.add(t), t.font = Gam.Config.font, t.fontSize = 53, t.fill = "#ffffff", (t = game.add.text(0, -90, "Like the game?")).anchor.set(.5), this.add(t), t.font = Gam.Config.font, t.fontSize = 40, t.align = "center", t.wordWrap = !0, t.wordWrapWidth = 440, t.fill = "#ffffff";
    var e = new Gam.Button(0, 40, "buttonbig", function() {
        Gam.Config.android && (game.user.rate = !0, Gam.Local.saveUser(), this.close(), ads = !1, window.open("", "_system")), this.close()
    }, this, "Rate");
    this.add(e);
    var s = new Gam.Button(0, 130, "buttonbig", function() {
        this.close()
    }, this, "Close");
    s.scale.set(.8), this.add(s), this.bg.y -= 30
}, Gam.RateDialog.prototype = Object.create(Gam.Dialog.prototype), Gam.SettingsDialog = function() {
	//Dialog PAUSE : monkey
    Gam.Dialog.call(this, 400, 620, 0);
    
    var a = new Gam.Button(0, -250, "buttonbig", function() {
		gradle.event('Menu');
        game.state.start("Menu", !0, !1);
    }, this, "Main Menu");
    this.add(a);
	
	var t = new Gam.Button(0, -150, "buttonbig", function() {
		gradle.event('Restart');
        Gam.s.onNewGame.dispatch(), this.close()
    }, this, "Restart");
	this.add(t);
    
    var o = new Gam.Button(0, -50, "buttonbig", function() {
		gradle.event('Sound');
        game.user.sound ? Gam.Config.sound = !1 : Gam.Config.sound = !0, game.user.sound = !game.user.sound, Gam.Local.saveUser(), Gam.s.onSound.dispatch()
    }, this, "Sound On/Off");
    this.add(o);
	
    var i = new Gam.Button(0, 50, "buttonbig", function() {
        gradle.event('more_games');
    }, this, "More Games");
    this.add(i);
	
    var n = new Gam.Button(0, 150, "buttonbig", function() {
        gradle.event('Privacy');
    }, this, "Privacy Settings");
    this.add(n), n.tint = 16563090;
    var r = new Gam.Button(0, 250, "buttonbig", function() {
		gradle.event('Close_Settings');
        this.close()
    }, this, "Close");
    this.add(r)
}, Gam.SettingsDialog.prototype = Object.create(Gam.Dialog.prototype), Gam.SettingsDialog.prototype.constructor = Gam.SettingsDialog, Gam.AboutDialog = function() {
    var t;
    Gam.Dialog.call(this, 480, 480, 0), (t = game.add.text(0, -200, "Blocks Puzzle")).anchor.set(.5), this.add(t), t.font = Gam.Config.font, t.fontSize = 30, t.fill = "#ffffff", (t = game.add.text(0, -130, "A game by Tiger Studio")).anchor.set(.5), this.add(t), t.font = Gam.Config.font, t.fontSize = 30, t.align = "center", t.wordWrap = !0, t.wordWrapWidth = 440, t.fill = "#ffffff", this.version = game.add.text(0, -50, "Version " + Gam.Config.version), this.version.anchor.set(.5), this.add(this.version), this.version.font = Gam.Config.font, this.version.fontSize = 21, this.version.align = "center", this.version.wordWrap = !0, this.version.wordWrapWidth = 440, this.version.fill = "#ffffff", this.version.inputEnabled = !0, this.count = 0, this.version.events.onInputDown.add(function() {
        this.count++, 8 < this.count && (ads = !1, this.version.setText("Version_" + Gam.Config.version), game.user.noads = !0, game.user.noadsnum = game.user.plays, Gam.Local.saveUser())
    }, this);
    var e = new Gam.Button(0, 30, "buttonbig", function() {
        Gam.Config.android ? window.open("", "_system") : window.open("", "_top")
    }, this, "More Games");
    this.add(e);
    var s = new Gam.Button(0, 130, "buttonbig", function() {
        this.close()
    }, this, "Close");
    this.add(s), this.bg.y -= 30
}, Gam.AboutDialog.prototype = Object.create(Gam.Dialog.prototype), Gam.GameOverDialog = function() {
    Gam.Dialog.call(this, 400, 400, 65793), this.medal = game.make.image(170, -210, "spritesheet", "medal"), this.medal.anchor.set(.5), this.add(this.medal);
    var t = game.add.text(0, 0, "Best\nScore".toUpperCase());
    t.anchor.set(.5), t.font = Gam.Config.font, t.fontSize = 20, t.align = "center", t.fill = "#ff0000", t.stroke = "#000000", t.strokeThickness = 5, this.medal.addChild(t);
    var e = game.add.text(0, -120, "Cool! Your score:");
    e.anchor.set(.5), e.font = Gam.Config.font, e.fontSize = 40, e.fill = "#ffffff", e.strokeThickness = 5, this.add(e), this.scoreText = game.add.text(0, -40, "000"), this.scoreText.anchor.set(.5), this.scoreText.font = Gam.Config.font, this.scoreText.fontSize = 53, this.scoreText.fill = "#ffffff", this.scoreText.stroke = "#000000", this.scoreText.strokeThickness = 5, this.add(this.scoreText), this.bestScoreText = game.add.text(0, 40, "Best Score: 000"), this.bestScoreText.anchor.set(.5), this.bestScoreText.font = Gam.Config.font, this.bestScoreText.fontSize = 21, this.bestScoreText.fill = "#ffffff", this.bestScoreText.stroke = "#000000", this.bestScoreText.strokeThickness = 5, this.add(this.bestScoreText), this.tweenBounce = game.add.tween(this.scale).to({
        x: 1.1,
        y: 1.1
    }, 90, Phaser.Easing.Sinusoidal.InOut, !1, 0, 0, !0), this.tweenBounce.onComplete.add(this.moveDown, this), this.bg.inputEnabled = !0, this.bg.events.onInputDown.add(this.bounce, this);
    var s = new Gam.Button(0, 150, "buttonbig", function() {
        Gam.s.onNewGame.dispatch(), showAds(), this.close()
    }, this, "OK");
    this.add(s)
}, Gam.GameOverDialog.prototype = Object.create(Gam.Dialog.prototype), Gam.GameOverDialog.prototype.constructor = Gam.GameOverDialog, Gam.GameOverDialog.prototype.open = function() {
	gradle.event('Game_Over');
    this.scoreText.setText("" + game.score), 
	game.experimental ? (this.bestScoreText.setText("Best Score: " + game.user.bestscoreexperimental), game.score > game.user.bestscoreexperimental ? this.medal.visible = !0 : this.medal.visible = !1) : (this.bestScoreText.setText("Best Score: " + game.user.bestscore), game.score > game.user.bestscore ? this.medal.visible = !0 : this.medal.visible = !1), 
	Gam.Dialog.prototype.open.call(this, !1, !0)
}, Gam.GameOverDialog.prototype.close = function() {
    Gam.Dialog.prototype.close.call(this, !1, !0)
}, Gam.GameOverDialog.prototype.bounce = function() {
    this.tweenBounce.yoyo(!0), this.tweenBounce.start()
}, Gam.GameOverDialog.prototype.moveDown = function() {
    this.scale.set(1)
}, Gam.Message = function(t) {
    Phaser.Group.call(this, game), this.x = game.width / 2, this.y = -game.height, this.opened = !1, this.text = game.make.bitmapText(0, 0, "font", t, 40), this.add(this.text), this.text.anchor.set(.5), this.showTween = game.add.tween(this).to({
        y: game.height / 2
    }, 1500, Phaser.Easing.Bounce.Out, !1), this.hideTween = game.add.tween(this).to({
        y: 2 * game.height
    }, 500, Phaser.Easing.Linear.None, !1), this.showTween.chain(this.hideTween), this.hideTween.onComplete.add(this.closeEnd, this)
}, Gam.Message.prototype = Object.create(Phaser.Group.prototype), Gam.Message.prototype.show = function(t) {
    this.opened = !0, this.visible = !0, t && this.text.setText(t), game.world.bringToTop(this), this.y = -game.height, this.showTween.start()
}, Gam.Message.prototype.closeEnd = function() {
    this.visible = !1
}, Gam.AnimatedMessage = function(t) {
    Phaser.Group.call(this, game), this.x = game.width / 2, this.y = game.height / 3, this.opened = !1, this.text = game.make.bitmapText(0, 0, "font", t, 50), this.add(this.text), this.text.anchor.set(.5), this.showTween = game.add.tween(this.scale).to({
        x: 1,
        y: 1
    }, 1300, Phaser.Easing.Bounce.Out, !1), this.hideTween = game.add.tween(this.scale).to({
        x: .1,
        y: .1
    }, 500, Phaser.Easing.Linear.None, !1), this.showTween.chain(this.hideTween), this.hideTween.onComplete.add(this.closeEnd, this)
}, Gam.AnimatedMessage.prototype = Object.create(Phaser.Group.prototype), Gam.AnimatedMessage.prototype.show = function(t) {
    this.opened = !0, this.visible = !0, t && this.text.setText(t), this.scale.set(.1), game.world.bringToTop(this), this.showTween.start()
}, Gam.AnimatedMessage.prototype.closeEnd = function() {
    this.visible = !1
}, Gam.loadTexture = function(t, e, s) {
    s ? t.loadTexture(s, e) : t.loadTexture(e)
}, Gam.GameMode = {}, Gam.GameMode.Init = 1, Gam.GameMode.Play = 2, Gam.GameMode.Pause = 3, Gam.GameMode.GameOver = 4, Gam.GameMode.Level = 5, Gam.Game = function(t) {
    this.scoreText, this.openDialogs, this.timeDiff = 0
}, Gam.Game.prototype = {
    init: function(t) {
        game.experimental = !1, "experimental" == t && (game.experimental = !0)
    },
    create: function() {
        this.initStructure(), this.initInterface(), game.type = 2, this.dialogs = 0, game.TIMER = 9e4, game.timer = game.TIMER, game.input.onDown.add(this.onTouchDown, this), game.input.onUp.add(this.onTouchUp, this), this.touchDown = !1, Gam.s.onNewGame.add(this.startGame, this), Gam.s.onDialogOpen.add(this.onDialogOpen, this), Gam.s.onDialogClose.add(this.onDialogClose, this), Gam.s.onCongrats.add(this.showAnimatedMessage, this), Gam.s.onAbout.add(this.showAbout, this), Gam.s.onGameOver.add(this.gameOver, this), this.startGame()
    },
    showAbout: function() {
        this.aboutDialog || (this.aboutDialog = new Gam.AboutDialog), this.aboutDialog.open()
    },
    showAnimatedMessage: function(t) {
        this.animatedMessage.show(t)
    },
    initInterface: function() {
        game.timeDiff = 0;
        var e = new Gam.Button(450, 50, "settings", this.onSettings, this);
        game.add.existing(e);
        var s = game.add.image(70, 30, "spritesheet", "trophy");
        s.scale.set(.4), s.anchor.set(.4), this.bestText = game.add.bitmapText(90, 30, "font", "0", 30), this.bestText.anchor.set(0, .3), this.scoreText = new Gam.RollText(90, 70, "0"), game.add.existing(this.scoreText), this.message = new Gam.Message("No more moves!"), this.animatedMessage = new Gam.AnimatedMessage("")
    },
    initStructure: function() {
        this.board = new Gam.Board, game.add.existing(this.board), window.board = this.board, game.experimental ? (this.clock = new Gam.Clock, game.add.existing(this.clock), this.toolbox = new Gam.ToolBoxMove) : this.toolbox = new Gam.ToolBox, game.add.existing(this.toolbox), window.toolbox = this.toolbox
    },
    startGame: function() {
        Gam.s.onGameStart.dispatch(), 
		game.gameMode = Gam.GameMode.Play, 
		game.timeDiff = 0, this.lastTime = 0, this.openDialogs = 0, this.touchDown = !1, game.score = 0, this.dialogs = 0, game.timer = game.TIMER, 
		game.experimental ? (this.clock.setTime(game.timer, game.TIMER, !0), this.bestText.setText(game.user.bestscoreexperimental)) : this.bestText.setText(game.user.bestscore), this.scoreText.setText(game.score), game.user.plays++, Gam.Local.saveUser()
    },
    onSettings: function() {
        this.settingsDialog || (this.settingsDialog = new Gam.SettingsDialog), this.settingsDialog.open()
    },
    onRate: function() {
        this.rateDialog || (this.rateDialog = new Gam.RateDialog), this.rateDialog.open()
    },
    onDialogOpen: function(t) {
        t || (0 == this.dialogs && (this.savedGameMode = game.gameMode, game.gameMode = Gam.GameMode.Pause, this.savedGameMode === Gam.GameMode.Play && Gam.s.onGamePause.dispatch()), this.dialogs++)
    },
    onDialogClose: function(t) {
        t || (this.dialogs--, this.dialogs <= 0 && (this.dialogs = 0, game.gameMode = this.savedGameMode, game.gameMode === Gam.GameMode.Play && Gam.s.onGameResume.dispatch()))
    },
    update: function() {
        this.now = Date.now(), game.timeDiff = this.now - this.lastTime, 30 < game.timeDiff && (game.timeDiff = 30), this.lastTime = this.now, adstimer += game.timeDiff, game.gameMode == Gam.GameMode.Play && (this.score != game.score && (this.scoreText.setText(game.score), this.score = game.score), game.experimental && (game.timer -= game.timeDiff, game.timer <= 0 && (game.timer = 0, this.gameOver()), this.clock.setTime(game.timer, game.TIMER)))
    },
    shutdown: function() {
        this.bestText.destroy(), this.scoreText.destroy(), this.settingsDialog && this.settingsDialog.destroy(!0), this.settingsDialog = null, this.message.destroy(!0), this.gameOverDialog && this.gameOverDialog.destroy(!0), this.gameOverDialog = null, this.clock && this.clock.destroy(!0), this.clock = null, this.animatedMessage.destroy(!0), this.toolbox.clearAll(), this.toolbox.destroy(!0), this.board.clearAll(), this.board.destroy(!0)
    },
    gameOver: function() {
        game.gameMode != Gam.GameMode.GameOver && (game.gameMode = Gam.GameMode.GameOver, game.experimental ? this.message.show("Time is UP!") : this.message.show("No more moves!"), game.time.events.add(3 * Phaser.Timer.SECOND, this.showGameOverDialog, this))
    },
    showGameOverDialog: function() {
        this.gameOverDialog || (this.gameOverDialog = new Gam.GameOverDialog), this.gameOverDialog.open(), game.experimental ? game.score > game.user.bestscoreexperimental && (game.user.bestscoreexperimental = game.score, Gam.Local.saveUser()) : game.score > game.user.bestscore && (game.user.bestscore = game.score, Gam.Local.saveUser()), Gam.Config.android && 1 < game.user.plays && !game.user.rate && !game.showrate && (game.showrate = !0, game.time.events.add(3 * Phaser.Timer.SECOND, this.onRate, this))
    },
    onTouchUp: function(t) {
        game.gameMode == Gam.GameMode.Play && (this.touchDown = !1)
    },
    onTouchDown: function(t) {
        this.touchDown = !0, game.gameMode, Gam.GameMode.Play
    }
};
var adstimer = 0,
    adsLoaded = !1,
    ads = !0,
    tigerConsent = 0;

function tigerVerifyConsent() {}

function tigerChangeConsent() {}

function prepareAds() {}

function showAds() {}
var SHAPES_COLOR = [];
function startGame() {
    window["GD_OPTIONS"] = {
        "gameId": "monkey-creative-2019",
        "onEvent": function(event) {
            switch (event.name) {
                case "SDK_GAME_START":
                    game.paused = false;
                    break;
                case "SDK_GAME_PAUSE":
                    game.paused = true;
                    break;
                case "SDK_GDPR_TRACKING":
                    // this event is triggered when your user doesn't want to be tracked
                    break;
                case "SDK_GDPR_TARGETING":
                    // this event is triggered when your user doesn't want personalised targeting of ads and such
                    break;
            }
        },
    };
    
    var game = new Phaser.Game(520, 800, Phaser.AUTO, '', null, true);
    game.gameMode = 0;
	
	var mk_rand = 1;
	
    for (var s = 0; s < SHAPES.length; s++){
		//var mk_rand = Math.floor(Math.random() * Math.floor(8));
		//if(mk_rand==0) mk_rand=1;
		SHAPES_COLOR[s] = mk_rand++;
		if(mk_rand==9) mk_rand=1;
	}
	//console.log(SHAPES, SHAPES_COLOR);
	
    game.state.add('Boot', Gam.Boot);
    game.state.add('Preloader', Gam.Preloader);
    game.state.add('Menu', Gam.Menu);
    game.state.add('Game', Gam.Game);
    game.state.start('Boot');
    window.game = game;
}

function onPause() {

}

function onBack() {

}

function onResumeEvent() {

}
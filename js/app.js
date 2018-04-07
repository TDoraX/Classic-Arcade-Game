// 项目参考论坛上 http://discussions.youdaxue.com/t/classic-arcade-game/36088 的主要思路
// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = speed;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    // 调用碰撞检测方法
    this.collisionDct(player);
    // 调用重制敌人位置的方法
    this.posReset();
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// 碰撞检测，在Enemy.prototype.update中调用
Enemy.prototype.collisionDct = function(player) {
    // 调整碰撞半径为83，若发生碰撞则分数减少，并重置位置
    if (this.y === player.y && (this.x + 83 >= player.x && this.x - 83 <= player.x)) {
        var score = document.getElementById('score');
        score.innerText = parseInt(score.textContent) === 0 ? 0 : parseInt(score.textContent) - 1;
        player.x = settings.col(2);
        player.y = settings.row(4);
    }
};
// 敌人移动至屏幕外的重置方法
Enemy.prototype.posReset = function() {
    if (this.x > settings.col(5)) {
        this.x = settings.col(settings.randomCol());
    }
}
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // 调用winner方法
    this.winner();
};

Player.prototype.render = function(mov) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// 胜利状态的判定，若胜利则加分，并重置位置，在Player.prototype.update中调用
Player.prototype.winner = function() {
    var score = document.getElementById('score');
    if (this.y <= 0) {
        score.innerText = parseInt(score.textContent) + 1;
        this.x = settings.col(2);
        this.y = settings.row(4);
    }
}
// Player移动指令，以及移动的范围限制
Player.prototype.handleInput = function(mov) {
    switch (mov) {
        case 'left':
            if (this.x >= 101) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x <= 303) {
                this.x += 101;
            }
            break;
        case 'up':
            if (this.y >= 55) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y <= 304) {
                this.y += 83;
            }
            break;
    }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

// settings对象中包含了游戏的初始设置，包括行，列，速度，随机数
var settings = {
    // 生成随机-6~-2之间的数字，用于随机分配敌人的起始X轴位置
    randomCol() {
        var range = 6 - 2;
        var ranNum = Math.random();
        var num = 2 + Math.round(ranNum * range);
        return -num;
    },
    //
    col(num) {
        var posX = num * 101;
        return posX;
    },
    // 固定Y轴位置（从上到下从0开始计数）
    row(num) {
        var posY = 83 * num + 55;
        return posY;
    },
    // 速度值初始化
    speed: {
        VERY_SLOW: 200,
        SLOW: 300,
        NORMAL: 350,
        FAST: 400,
        VERY_FAST: 500,
        EXTREME: 600
    }
}

var allEnemies = [
    new Enemy(settings.col(settings.randomCol()), settings.row(0), settings.speed.EXTREME),
    new Enemy(settings.col(settings.randomCol()), settings.row(0), settings.speed.SLOW),
    new Enemy(settings.col(settings.randomCol()), settings.row(1), settings.speed.VERY_FAST),
    new Enemy(settings.col(settings.randomCol()), settings.row(1), settings.speed.FAST),
    new Enemy(settings.col(settings.randomCol()), settings.row(2), settings.speed.NORMAL),
    new Enemy(settings.col(settings.randomCol()), settings.row(2), settings.speed.VERY_SLOW),
];
var player = new Player(settings.col(2), settings.row(4));

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

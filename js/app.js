"use strict";
// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量
    this.x = x;
    this.y = y;
    this.speed = speed;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
    this.x += this.speed * dt;
    // 调用碰撞检测方法
    this.collisionDct(player);
    // 调用重制敌人位置的方法
    this.posReset();
};

// 此为游戏必须的函数，用来在屏幕上画出敌人
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
        this.y = settings.row(settings.randomRow());
        this.speed = settings.speed[settings.randomSpeed()];
    }
}
// 实现玩家类
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
            if (this.x >= settings.TILE_WIDTH) {
                this.x -= settings.TILE_WIDTH;
            }
            break;
        case 'right':
            if (this.x <= settings.TILE_WIDTH * 3) {
                this.x += settings.TILE_WIDTH;
            }
            break;
        case 'up':
            if (this.y >= settings.TILE_HEIGHT * 0 + 55) {
                this.y -= settings.TILE_HEIGHT;
            }
            break;
        case 'down':
            if (this.y <= settings.TILE_WIDTH * 3 + 1) {
                this.y += settings.TILE_HEIGHT;
            }
            break;
    }
}

// settings对象中包含了游戏的初始设置，包括行，列，速度，随机数
var settings = {
    // 生成随机-6~-2之间的数字，用于随机分配敌人的X轴位置
    randomCol() {
        var range = 6 - 2;
        var ranNum = Math.random();
        var num = 2 + Math.round(ranNum * range);
        return -num;
    },
    // 生成随机0~2之间的数字，用于随机分配敌人的Y轴位置
    randomRow() {
        var range = 2 - 0;
        var ranNum = Math.random();
        var num = 0 + Math.round(ranNum * range);
        return num;
    },
    // 生成随机0~9之间的数字，用于随机分配敌人的速度
    randomSpeed() {
        var range = 9 - 0;
        var ranNum = Math.random();
        var num = 0 + Math.round(ranNum * range);
        return num;
    },
    // 固定X轴位置（从左到右从0开始计数）
    col(num) {
        var posX = num * this.TILE_WIDTH;
        return posX;
    },
    // 固定Y轴位置（从上到下从0开始计数）
    row(num) {
        var posY = this.TILE_HEIGHT * num + 55;
        return posY;
    },
    // 敌人的速度值初始化（数字从小到大由慢到快）
    speed: [200, 300, 350, 400, 500, 600, 700, 800, 850, 900],
    // 初始化格子的宽度和高度
    TILE_WIDTH: 101,
    TILE_HEIGHT: 83,
    // 初始化敌人最大数量
    MAX_ENEMIES: 6
}
// 实例化Enemy和Player
var allEnemies = [];
for (var i = 0; i < settings.MAX_ENEMIES; i++) {
    allEnemies.push(new Enemy(settings.col(settings.randomCol()), settings.row(settings.randomRow()), settings.speed[settings.randomSpeed()]));
}
var player = new Player(settings.col(2), settings.row(4));

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput() 方法里面
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
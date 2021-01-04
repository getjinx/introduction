<template>
    <div class="game_view">
        <div class="header">
            <div class="game_name">
                <div class="icon"></div>
                <div class="name"><p>贪吃蛇</p></div>
            </div>
            <div class="close">
                <div class="close_button"><i class="el-icon-close" @click="gameClose()"></i></div>
            </div>
        </div>
        <div class="game_container">
            <div class="navigator">
                <div class="box">
                    <el-button type="primary" class="button" @click="init()" :disabled="!restart">重新开始</el-button>
                </div>
                <div class="box">
                    <span class="diffculty">难度:</span>
                    <el-slider v-model="diffculty" :max="10" :min="1" :step="1" class="slider"></el-slider>
                </div>
                <div class="box">
                    <span class="score">当前的分: {{ score }}</span>
                </div>
                <div class="box">
                    <span class="rank_name"><i class="el-icon-s-flag">排行榜</i></span>
                </div>
                <div v-for="(item,index) in ranklist" :key="index" class="box">
                    <span class="rank">{{index + 1}}</span>
                    <span class="rank_name">{{ item }}</span>
                </div>
            </div>
            <canvas id="gc" width="700" height="500"></canvas>
        </div>
    </div>
</template>

<script>
import "../assets/iconfont/iconfont.css";
export default {
    data() {
        return {
            ctx: undefined,
            direct: "right",
            grid: new Array(3501).fill(false),  // ! 700 * 500 像素 以10像素为一个单位 总共3500个单位 且从1开始计算 标识蛇的身体占据了哪些像素
            snakeBody: [],                      // ! 蛇的身体队列数组 用于控制canvas渲染哪些像素图像
            headRow: 0,                         // ! 蛇头所在的行 1 - 50
            headCol: 0,                         // ! 蛇头所在的列 1 - 70
            food: 0,                            // ! 食物位置
            interval: undefined,                // ! 蛇移动定时器
            diffculty: 8,                       // ! 难度 默认1~10 默认3
                                                // ! 难度 定时器设置数组
            diffcult:[1000,500,350,200,150,100,75,60,40,30],                       
            score: 0,                           // ! 得分 
            time: 0,                            // ! 吃到一个食物的用时
            timeInterval: undefined,            // ! 吃食物用时定时器
            restart: true,                      // ! 重新开始是否可点击
            rank: [],                           // ! 本地分数记录
            ranklist: [],                       // ! 排行榜的分数记录
        };
    },

    methods: {
        
        snakeMove() {                       // & 蛇移动
            switch(this.direct) {                    // ! 判断当前方向
                case "left": this.headCol --; break;
                case "right": this.headCol ++; break;
                case "up": this.headRow --; break;
                case "down": this.headRow ++; break;
            }      
            if(!this.isRange() || this.biteOwn()) {           // ! 如果超出范围或者咬到自己则游戏结束
                this.gameOver();
                return undefined;
            }
            else {                          // ! 没超过范围并且没咬到自己往当前方向前进一格
                const now = (this.headRow - 1) * 70 + this.headCol;
                this.grid[now] = true;
                this.snakeBody.push(now);
                this.draw(now);
                if(now == this.food) {      // ! 如果吃到食物 则生成新事物
                    clearInterval(this.timeInterval);
                    this.generateFood();
                    this.addScore();
                    this.setTime();
                }
                else {                      // ! 没有吃到食物 则移动尾部
                    const tail = this.snakeBody.shift();
                    this.clear(tail);
                    this.grid[tail] = false;
                }
            }          
        },

        changeDirect(event) {               // & 按下键时修改方向
            switch(event.keyCode) {             // ! 相反方向不允许触发按键
                case 37: if(this.direct != "right") { this.direct = "left"; } break;
                case 38: if(this.direct != "down") { this.direct = "up"; }  break;
                case 39: if(this.direct != "left") { this.direct = "right"; } break;
                case 40: if(this.direct != "up") { this.direct = "down"; } break;
            }
        },

        biteOwn() {                         // & 判断是否咬到自己
            return this.grid[(this.headRow - 1) * 70 + this.headCol];
        },

        draw(num) {                       // & 绘制图像
            let row = Math.floor(num / 70);
            let col = num % 70;
            if(col == 0) {
                col = 70;
                row --;
            }
            this.ctx.fillRect((col - 1) * 10, row * 10, 10, 10);
        },

        clear(num) {                      // & 清除图像
            let row = Math.floor(num / 70);
            let col = num % 70;
            if(col == 0) {
                col = 70;
                row --;
            }
            this.ctx.clearRect((col - 1) * 10, row * 10, 10, 10);
        },

        isRange() {                     // & 判断是否出界
            return 1 <= this.headRow && this.headRow <= 50 && 1 <= this.headCol &&  this.headCol <= 70;
        },
        
        init() {                        // & 初始化
            this.ctx && this.clearAll();
            // this.ctx.drawImage('../assets/images/snakeHead.png',10,10,240,160);
            this.grid[143] = this.grid[144] = this.grid[145] = true;      // ! 默认占据第三排第三个位置开始的三个单位
            this.snakeBody.push(143,144,145);
            const c = document.querySelector("#gc");
            this.ctx = c.getContext("2d");
            this.ctx.fillStyle = "pink";
            this.ctx.fillRect(20, 20, 30, 10);
            this.headRow = 3;
            this.headCol = 5;
            this.score = 0;
            this.generateFood();
            this.setTime();
            this.restart = false;
            this.interval =  setInterval(() => {
                this.snakeMove();
            }, this.diffcult[this.diffculty - 1]);
        },

        generateIntenger(x = 0, y = 10) {                      // & 生成[x,y)之间的随机整数 10000以内
            const num = Math.round(Math.random() * 10000) % (y - x) + x;
            return this.grid[num] ? this.generateIntenger(x, y) : num;  // ! 防止出现新食物在蛇身体内部的情况
        },

        generateFood() {                                       // & 生成新的食物
            this.food = this.generateIntenger(1,3501);
            this.draw(this.food);
        },

        setTime() {                                            // & 根据吃到食物的用时设置定时器
            this.time = 0;
            this.timeInterval = setInterval(() => {
                this.time ++;
            }, 1000);
        },

        addScore() {                                           // & 吃到食物后增加分数
            this.score += 10 + this.diffculty + (this.time > 9 ? 1 : 10 - this.time);
        },

        gameOver() {                        // & 游戏结束
            alert("你输啦！ 你的得分：" + this.score);
            this.rank.push(this.score);
            this.updateRank();
            this.restart = true;
            clearInterval(this.interval);
        },

        clearAll() {                        // & 初始化所有数据
            this.ctx.clearRect(0,0,700,500);
            this.direct = "right";
            this.grid.fill(false);
            this.snakeBody.length = 0;
        },

        updateRank() {                     // & 更新排行榜
            if(!this.rank.length) {
                this.rank = localStorage.rank ? JSON.parse(localStorage.rank) : [];
            }
            else {
                localStorage.rank = JSON.stringify(this.rank);
            }
            this.ranklist = this.rank.sort((a,b) => b - a).slice(0,5);
        },

        gameClose() {
            this.$emit("closeGame");
        }
    },

    mounted() {
        window.addEventListener("keydown", this.changeDirect);
        this.updateRank();
    },
};
</script>

<style lang="scss" scoped>
.game_view {
    width: 100%;
    height: 100%;
    background-color: white;
    .header {
        width: 100%;
        height: 8%;
        border-bottom: 1px lightseagreen solid;
        display: flex;
        .close {
            width: 90px;
            height: 30px;
            margin: auto 10px auto auto;
            .close_button {
                text-align: right;
                :hover {
                    background-color: lightblue;
                }
            }
        }
        .game_name {
            width: 130px;
            height: 30px;
            margin: 10px 20px;
            display: flex;
            .icon {
                width: 30px;
                height: 30px;
                background: url("../assets/images/retroSnaker.jpg") no-repeat 0 0;
                background-size: 100% 100%;
            }
            .name {
                width: 100px;
                height: 30px;
                display: flex;
                p {
                    margin: auto 0 auto 10px;
                    color: lightcoral;
                }
            }
        }
    }
    .game_container {
        width: auto;
        height: auto;
        display: flex;
        .navigator {
            width: 180px;
            height: 500px;
            .box {
                width: 100%;
                height: 60px;
                display: flex;
                color: lightseagreen;   
                .button {
                    height: 40px;
                    margin: auto;
                }
                .diffculty {
                    margin: auto 0 auto 10px;
                }
                .score {
                    margin: auto;
                }
                .slider {
                    width: 60%;
                    margin: auto;
                }
                .rank_name {
                    margin: auto;
                }
                .rank {
                    margin: auto 0 auto 50px;
                }
            }
        }
        #gc {
            margin: 0 10px 0 auto;
            border: 1px lightseagreen solid;
        }
    }
}
</style>

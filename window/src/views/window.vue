<template>
    <div id="main">
        <div class="frame">
            <div class="shortcut" @contextmenu.prevent="rightClickDestop($event)" @click.prevent="leftClickDestop()">
                <div v-for="item in icon_shortcut" :key="item.name" class="shortcut_item"
                @click="selectShortcut(item.name)" @contextmenu.stop.prevent="openIconMenu()" @dblclick="openShortcut(item.name)"
                :class="[item.name == shortcutSelect ? 'shortcut_item_select' : '', 'shortcut_item_' + iconSize]">
                    <div class="shortcut_item_icon" :class="[item.icon,'shortcut_item_icon_' + iconSize]"></div>
                    <div class="shortcut_item_name">{{item.name}}</div>
                </div>
                <div class="volume_frame" v-show="volumeShow">
                    <div class="volume_top" @click="closeVolume">
                        <h2 class="hint">音源输出</h2>
                        <div class="back"></div>
                    </div>
                    <div class="volume_bottom">
                        <div class="volume_icon">
                            <div :class="volume"></div>
                        </div>
                        <div class="volume_step">
                            <el-slider v-model="volumeNow" @input="volumeChange()"></el-slider>
                        </div>
                        <div class="volume_number">
                            <div>{{volumeNow}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="taskbar">
                <div class="taskbar_view">
                    <div v-for="item in task_view" :key="item.name" class="taskbar_item"
                    :class="item.hover ? 'taskbarViewSelect' : ''"
                    @mouseover="taskbarViewHover(item.icon)" @mouseout="taskbarViewOut(item.icon)">
                        <div class="taskbar_item_icon" :class="item.hover ? item.icon + 'Hover' : item.icon"></div>
                    </div>
                </div>
                <div class="taskbar_quickstart">
                    <div v-for="item in start_view" :key="item.name" class="taskbar_item">
                        <div class="taskbar_quickstart_icon" :class="item.icon"></div>
                    </div>
                </div>
                <div class="taskbar_task_now">
                    <div v-for="item in now_view" :key="item.name" class="taskbar_item">
                        {{item.name}}
                    </div>
                </div>
                <div class="taskbar_show_desktop"></div>
                <div class="taskbar_time">
                    <div class="time">{{time}}</div>
                    <div class="date">{{date}}</div>
                </div>
                <div class="taskbar_icon">
                    <div v-for="item in icon_view" :key="item.name" class="taskbar_icon_item" @click="openIcon(item)">
                        <div class="taskbar_showicon" :class="item.icon"></div>
                    </div>
                </div>
            </div>
            <RetroSnaker :style="game_show" @closeGame="closeGame"></RetroSnaker>
            <RightClickDestop :style="rightClickDesktop_view_position" :size="iconSize" @changeSize="changeSize"></RightClickDestop>
        </div>
        <video autoplay loop muted class="background">
            <source src="../assets/videos/background.mp4"/>
        </video>
    </div>
</template>

<script>
import RightClickDestop from "../components/rightClickDesktop.vue";
import RetroSnaker from "../components/RetroSnaker.vue"
export default {
    components: {
        RightClickDestop,
        RetroSnaker
    },
    data() {
        return {
            task_view: [
                {
                    name: "windows",
                    icon: "windows",
                    hover: false,
                }, 
                {
                    name: "cortana",
                    icon: "circle",
                    hover: false,
                },
                {
                    name: "task",
                    icon: "view",
                    hover: false,
                }
            ],
            start_view: [
                {
                    name: "qqMusic",
                    icon: "qqMusic",
                },
                {
                    name: "wechat",
                    icon: "wechat",
                },
                {
                    name: "qq",
                    icon: "qq",
                },
                {
                    name: "chrome",
                    icon: "chrome",
                }
            ],
            now_view: [
                // {
                //     name: "QQ",
                //     icon: "",
                // },
                // {
                //     name: "QQY",
                //     icon: ""
                // }
            ],
            icon_view: [
                {
                    name: "volume",
                    icon: "volume1",
                },
                {
                    name: "net",
                    icon: this.online || "online",
                }
            ],
            icon_shortcut: [
                {
                    name: "此电脑",
                    icon: "computer",
                },
                {
                    name: "游戏",
                    icon: "game",
                }
            ],
            screenX: 1920,
            screenY: 1040,
            time: "10:00",
            date: "2020/9/10",
            shortcutSelect: "",
            shortcutHover: "",
            iconSize: "mid",
            volumeNow: 100,
            volumeShow: false,
            rightClickDesktop_view_position: {
                position: "absolute",
                width: "218px",
                height: "80px",
                top: "200px",
                left: "300px",
                animation: "",
                opacity: 0,
                display: "none",
                boxShadow: "2px 2px 5px rgb(73,74,88)"
            },
            game_show: {
                position: "absolute",
                top: "100px",
                left: "400px",
                width: "900px",
                height: "600px",
                display: "none",
            }
        }
    },
    methods: {
        getTime() {             // & 获取时间
            setInterval(() => {
                let hour = new Date().getHours(), minute = new Date().getMinutes(),
                    year = new Date().getFullYear(), month = new Date().getMonth() + 1, day = new Date().getDate();
                this.time = hour + ":" + (minute < 10 ? "0" + minute : minute);
                this.date = year + "/" + month + "/" + day;
            }, 1000);
        },

        taskbarViewHover(icon) {  // & 
            this.task_view.forEach(item => {
                if(item.icon == icon) {
                    item.hover = true;
                }
            });
        },

        taskbarViewOut(icon) {
            this.task_view.forEach(item => {
                if(item.icon == icon) {
                    item.hover = false;
                }
            });
        },

        selectShortcut(name) {
            this.shortcutSelect = name;
        },

        openIconMenu() {
            console.log("右击");
        },

        rightClickDestop(event) {   // & 桌面右击
            this.rightClickDesktop_view_position.top = event.clientY + 80 > this.screenY ? event.clientY - 80 + "px" : event.clientY + "px";
            this.rightClickDesktop_view_position.left = event.clientX + 218 > this.screenX ? event.clientX - 218 + "px" : event.clientX + "px";
            this.rightClickDesktop_view_position.display = "block";
            this.rightClickDesktop_view_position.opacity = 1;
        },

        changeSize(size) {      // & 修改图标大小
            this.iconSize = size;
            this.rightClickDesktop_view_position.display = "none";
            this.rightClickDesktop_view_position.animation = "";
            this.shortcutSelect = "";
        },

        leftClickDestop() {     // & 桌面左击
            this.rightClickDesktop_view_position.display = "none";
            this.volumeShow = false;
        }, 

        closeGame() {           // & 关闭游戏
            console.log("asd")
            this.game_show.display = "none";
        },

        openShortcut() {        // & 双击桌面图标
            this.game_show.display = "block";
        },

        closeVolume() {         // & 关闭音量控制界面
            this.volumeShow = false;
        },

        openIcon(item) {          // & 打开音量控制界面
            if(item.name == "volume") {
                this.volumeShow = true;
            }
        },

        volumeChange() {         // & 音量大小改变
            this.icon_view[0].icon = this.volume;
        }
    },

    created() {
        this.getTime();
    },

    computed: {
        online() {
            return navigator.online;
        },

        volume() {
            return this.volumeNow > 50 ? "volume2" : this.volumeNow > 0 ? "volume1" : "volume0";
        }
    },

    mounted() {
        this.volumeChange();
    }
}
</script>

<style lang="scss" scoped>
    #main {
        width: 100%;
        height: 100%;
        display: flex;

        .volume0 {
            background: url("../assets/images/volume-0.png") no-repeat 0 0;
        }

        .volume1 {
            background: url("../assets/images/volume-1.png") no-repeat 0 0;
        }

        .volume2 {
            background: url("../assets/images/volume-2.png") no-repeat 0 0;
        }

        .online {
            background: url("../assets/images/online.png") no-repeat 0 0;
        }

        .offline {
            background: url("../assets/images/offline.png") no-repeat 0 0;
        }

        .windows {
            background: url("../assets/images/windows.png") no-repeat 0 0;
        }

        .circle {
            background: url("../assets/images/circle.png") no-repeat 0 0;
        }

        .view {
            background: url("../assets/images/view.png") no-repeat 0 0;
        }

        .windowsHover {
            background: url("../assets/images/windowsHover.png") no-repeat 0 0;
        }

        .circleHover {
            background: url("../assets/images/circleHover.png") no-repeat 0 0;
        }

        .viewHover {
            background: url("../assets/images/viewHover.png") no-repeat 0 0;
        }

        .frame {
            cursor: default;
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 1;

            .taskbar {
                background-color: rgb(24, 36, 43);
                color: white;
                position: absolute;
                z-index: 2;
                width: 100%;
                height: 40px;
                bottom: 0;

                .taskbar_view {
                    display: flex;
                    width: auto;
                    max-width: 150px;
                    height: 40px;
                    justify-items: flex-start;
                    float: left;

                    .taskbar_item_icon {
                        width: 18px;
                        height: 18px;
                        margin: auto;
                        background-size: 100% 100% !important;
                    }

                    .taskbarViewSelect {
                        background: rgb(44, 55, 60);
                    }
                    
                }

                .taskbar_item {
                    width: 50px;
                    height: 40px;
                    display: flex;

                    &:hover {
                        background-color: rgb(70,80,88);
                    }
                }

                .taskbar_quickstart {
                    display: flex;
                    width: auto;
                    max-width: 500px;
                    height: 40px;
                    float: left;

                    .taskbar_quickstart_icon {
                        width: 25px;
                        height: 25px;
                        background-size: 100% 100% !important;
                        margin: auto;
                    }

                    .qqMusic {
                        background: url("../assets/images/Music.png") no-repeat 0 0;
                    }

                    .wechat {
                        background: url("../assets/images/wechat.png") no-repeat 0 0;
                    }

                    .qq {
                        background: url("../assets/images/qq.png") no-repeat 0 0;
                    }

                    .chrome {
                        background: url("../assets/images/chrome.png") no-repeat 0 0;
                    }
                }

                .taskbar_task_now {
                    display: flex;
                    width: auto;
                    max-width: 700px;
                    height: 40px;
                    float: left;
                }

                .taskbar_show_desktop {
                    display: flex;
                    width: 10px;
                    height: 40px;
                    float: right;
                }

                .taskbar_time {
                    font-size: 12px;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    width: 70px;
                    height: 40px;
                    float: right;
                    &>div {
                        width: 100%;
                        height: 20px;
                    }
                }

                .taskbar_icon {
                    display: flex;
                    float: right;
                    width: auto;
                    max-width: 400px;
                    height: 40px;
                    .taskbar_icon_item {
                        width: 25px;
                        height: 40px;
                        display: flex;
                        
                        &:hover {
                            background-color: rgb(70,80,88);
                        }
                        
                        .taskbar_showicon {
                            width: 20px;
                            height: 20px;
                            margin: auto;
                            background-size: 100% 100% !important;
                        }
                    }
                }
            }

            .shortcut {
                width: 100%;
                height: 96%;
                display: flex;
                flex-direction: column;

                .shortcut_item {
                    color: white;
                    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de;
                    font-size: 14px;

                    &:first-child {
                        margin-top: 10px;
                    }

                    &:not(:first-child) {
                        margin-top: 30px;
                    }
                }

                .shortcut_item_max {
                    width: 105px;
                    height: 118px;
                }

                .shortcut_item_mid {
                    width: 75px;
                    height: 70px;
                }
                
                .shortcut_item_min {
                    width: 75px;
                    height: 55px;
                }

                .shortcut_item_icon
                {
                    position: relative;
                    background-size: 100% 100% !important;
                }

                .shortcut_item_icon_max {
                    left: 7px;
                    width: 90px;
                    height: 90px;
                }

                .shortcut_item_icon_mid {
                    left: 10px;
                    width: 55px;
                    height: 50px;
                }
                
                .shortcut_item_icon_min {
                    left: 20px;
                    width: 35px;
                    height: 35px;
                }

                .shortcut_item_name {
                    text-align: center;
                }

                .computer {
                    background: url("../assets/images/computer.png") no-repeat 0 0;
                }

                .game {
                    background: url("../assets/images/game.png") no-repeat 0 0;
                }

                .shortcut_item_select {
                    background-color: rgb(48, 79, 103);
                    border: 1px rgb(174, 156, 144) solid;
                }

                .volume_frame {
                    width: 360px;
                    height: 100px;
                    position: absolute;
                    bottom: 40px;
                    right: 0;
                    background-color: rgb(28,30,32);

                    .volume_top {
                        width: 100%;
                        height: 50%;
                        color: rgb(240, 240, 240);

                        &:hover {
                            background-color: rgb(53,55,57);
                        }

                        .hint {
                            display: inline;
                            line-height: 50px;
                            position: relative;
                            left: 10px;
                        }

                        .back {
                            width: 20px;
                            height: 20px;
                            float: right;
                            position: relative;
                            right: 10px;
                            top: 15px;
                            background: url("../assets/images/down.png") no-repeat 0 0;
                            background-size: 100% 100%;
                        }
                    }

                    .volume_bottom {
                        width: 100%;
                        height: 50%;
                        &>div {
                            float: left;
                        }

                        .volume_icon {
                            width: 60px;
                            height: 100%;
                            display: flex;

                            div {
                                width: 30px;
                                height: 30px;
                                margin: auto;
                                background-size: 100% 100%;
                            }
                        }

                        .volume_step {
                            width: 240px;
                            height: 100%;
                            
                            .el-slider {
                                position: relative;
                                top: 5px;
                            }
                        }
                        
                        .volume_number {
                            width: 60px;
                            height: 100%;
                            display: flex;
                            color: rgb(240, 240, 240);

                            div {
                                font-size: 1.2em;
                                margin: auto;
                            }
                        }
                    }
                }
            }

        }

        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit:fill;
        }
    }
</style>

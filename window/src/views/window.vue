<template>
    <div id="main">
        <div class="frame">
            <div class="shortcut" @contextmenu.prevent="rightClickDestop($event)">
                <div v-for="item in icon_shortcut" :key="item.name" class="shortcut_item"
                @click="selectShortcut(item.name)" @contextmenu.stop.prevent="openIconMenu()"
                :class="[item.name == shortcutSelect ? 'shortcut_item_select' : '', 'shortcut_item_' + iconSize]">
                    <div class="shortcut_item_icon" :class="[item.icon,'shortcut_item_icon_' + iconSize]"></div>
                    <div class="shortcut_item_name">{{item.name}}</div>
                </div>
            </div>
            <div class="taskbar">
                <div class="taskbar_view">
                    <div v-for="item in task_view" :key="item.name" class="taskbar_item"
                    :class="item.hover ? 'taskbarViewSelect' : ''"
                    @mouseover="taskbarViewHover(item.icon)" @mouseout="taskbarViewOut(item.icon)">
                        <div class="taskbar_item_icon" :class="item.hover ? item.icon + 'Hover' : item.icon">
                        </div>
                    </div>
                </div>
                <div class="taskbar_quickstart">
                    <div v-for="item in start_view" :key="item.name" class="taskbar_item">
                        {{item.name}}
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
                    <div v-for="item in icon_view" :key="item.name" class="taskbar_icon_item">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <RightClickDestop :style="rightClickDesktop_view_position"></RightClickDestop>
        </div>
        <video autoplay loop muted class="background">
            <source src="../assets/videos/background.mp4"/>
        </video>
    </div>
</template>

<script>
import RightClickDestop from "../components/rightClickDesktop.vue";
export default {
    components: {
        RightClickDestop
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
                    name: "QQY",
                    icon: "",
                },
                {
                    name: "wx",
                    icon: "",
                },
                {
                    name: "QQ",
                    icon: "",
                },
                {
                    name: "web",
                    icon: "",
                }
            ],
            now_view: [
                {
                    name: "QQ",
                    icon: "",
                },
                {
                    name: "QQY",
                    icon: ""
                }
            ],
            icon_view: [
                {
                    name: "yl",
                    icon: "",
                },
                {
                    name: "wl",
                    icon: "",
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
            time: "10:00",
            date: "2020/9/10",
            shortcutSelect: "",
            shortcutHover: "",
            iconSize: "mid",
            rightClickDesktop_view_position: {
                position: "absolute",
                width: "218px",
                height: "80px",
                top: "200px",
                left: "300px",
                display: "none",
                animation: "",
                boxShadow: "2px 2px rgb(73,74,88)"
            }
        }
    },
    methods: {
        getTime() {
            let hour = new Date().getHours(), minute = new Date().getMinutes(),
                year = new Date().getFullYear(), month = new Date().getMonth() + 1, day = new Date().getDate();
            this.time = hour + ":" + (minute < 10 ? "0" + minute : minute);
            this.date = year + "/" + month + "/" + day;
            setTimeout(() => {
                this.getTime();
            }, 1000)
        },

        taskbarViewHover(icon) {
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
            console.log("右击")
        },

        rightClickDestop(event) {
            this.rightClickDesktop_view_position.top = event.clientY + "px";
            this.rightClickDesktop_view_position.left = event.clientX + "px";
            this.rightClickDesktop_view_position.animation = "fadeIn 1s";
            this.rightClickDesktop_view_position.display = "block";
        }
    },
    created() {
        this.getTime();
    }
}
</script>

<style lang="scss" scoped>
    #main {
        @keyframes fadeIn {
            from {
                display: none;
            }
            to {
                display: block;
            }
        }
        width: 100%;
        height: 100%;
        display: flex;

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

                    .taskbarViewSelect {
                        background: rgb(44, 55, 60);
                    }
                }

                .taskbar_item {
                    width: 50px;
                    height: 40px;
                    display: flex;
                }

                .taskbar_quickstart {
                    display: flex;
                    width: auto;
                    max-width: 500px;
                    height: 40px;
                    float: left;
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

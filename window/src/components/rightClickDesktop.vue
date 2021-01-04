<template>
    <div>
        <div class="option">
            <div v-for="item in item" :key="item.name" class="option_item" @click="selectIconSize(item.size)" @contextmenu.stop.prevent="selectIconSize(item.size)">
                <div class="item_left">
                    <div :class="size == item.size ? 'selected' : ''"></div>
                </div>
                <div class="item_mid">
                    <div>{{item.name}}</div>
                </div>
                <div class="item_right"></div>
            </div>
        </div>
    </div>
</template>

<script>
import "../assets/iconfont/iconfont.css";
export default {

    props: ["size"],

    data() {
        return {
            item: [
                {
                    name: "大图标",
                    size: "max"
                },
                {
                    name: "中等图标",
                    size: "mid"
                },
                {
                    name: "小图标",
                    size: "min"
                }
            ]
        }
    },
    
    methods: {
        selectIconSize(size) {      // & 触发桌面修改图标大小
            this.$emit('changeSize',size);
        }
    }
}
</script>

<style lang="scss" scoped>
.option {
    width: 218px;
    height: 80px;
    font-size: 14px;
    background: rgb(242, 242, 242);

    .option_item {
        width: 218px;
        height: 25px;
        margin-top: 2px;
        &>div {
            float: left;
        }
        &:hover {
            background-color: rgb(217, 217, 217);
        }

        .item_left {
            width: 35px;
            height: 25px;
            display: flex;
            .selected{
                width: 5px;
                height: 5px;
                margin: auto;
                background-color: black;
                border-radius: 50% 50%;
            }
        }

        .item_mid {
            div {
                line-height: 25px;
            }
        }
    }
}
</style>

<template>
    <div>
        <div class="option">
            <div v-for="item in item" :key="item.name" class="option_item">
                <div class="item_left"></div>
                <div class="item_mid">{{item.name}}</div>
                <div class="item_right"></div>
            </div>
        </div>
    </div>
</template>

<script>
import "../assets/iconfont/iconfont.css";
export default {
    data() {
        return {
            item: [
                {
                    name: "大图标"
                },
                {
                    name: "中等图标"
                },
                {
                    name: "小图标"
                }
            ]
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.option {
    width: 218px;
    height: 80px;
    background: rgb(242, 242, 242);
    .option_item {
        width: 218px;
        height: 27px;
    }
}
</style>

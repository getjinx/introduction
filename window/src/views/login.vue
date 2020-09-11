<template>
    <div id="main">
        <div class="frame">
            <div class="user"></div>
            <div class="login" @click="login()">登录</div>
        </div>
    </div>
</template>

<script>
import "../assets/iconfont/iconfont.css";
export default {
    data() {
        return {
            
        }
    },
    methods: {
        login() {
            this.$router.push("/window")
        }
    }
}
</script>

<style lang="scss">
    #main {
        background: url("../assets/images/login-background.jpg") no-repeat 0 0;
        background-size: 100% 100%;
        height: 100%;
        display: flex;
    }
</style>

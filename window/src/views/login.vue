<template>
    <div id="main">
        <div class="frame">
            <div class="user"></div>
            <div class="login" @click="login()">登录</div>
        </div>
    </div>
</template>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
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

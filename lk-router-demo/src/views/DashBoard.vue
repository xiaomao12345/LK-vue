<template>
    <div>
        <h3>主面板</h3>
        <!--设置路由导航-->
        <div id="nav">
            <router-link to="/dashboard/home">首页</router-link>
            <router-link to="/dashboard/about">关于</router-link>
            <router-link to="/dashboard/mine">我的</router-link>
        </div>
        <!--设置路由出口-->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "DashBoard"
    }
</script>

<style scoped>
    #nav{
        padding: 30px;
    }
    #nav a{
        font-size: 18px;
        color: #484848;
        margin: 0 10px;
    }

    #nav a.router-link-exact-active{
        color: #e9232c;
    }
</style>
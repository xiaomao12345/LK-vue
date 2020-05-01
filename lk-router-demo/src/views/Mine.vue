<template>
    <div id="mine">
        <h2>个人中心</h2>
    </div>
</template>

<script>
    export default {
        name: "Mine",
        beforeRouteEnter(to, from, next){
            console.log('进入之前调用');
            next();
        },
        beforeRouteUpdate(to, from, next){
            console.log('路由的参数变了');
            next();
        },
        beforeRouteLeave(to, from, next){
            console.log('路由离开前调用');
            next();
        }
    }
</script>

<style scoped>
    #mine{
        width: 300px;
        height: 500px;
        background-color: orange;
        margin: 0 auto;
    }
    h2{
        color: green;
    }
</style>
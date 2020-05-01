<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Header ref="header"/>
            <List :todos="todos" :delTodo="delTodo"/>
            <Footer>
                <input slot="isCheck" type="checkbox" v-model="isCheck"/>
                <span slot="finish">已完成{{finishedCount}}件 / 总计{{todos.length}}件</span>
                <button  slot="delete" class="btn btn-warning" @click="delFinishedTodos">清除已完成任务</button>
            </Footer>
        </div>
    </div>
</template>

<script>
    // 引入组件
    import Header from './components/Header'
    import List from './components/List'
    import Footer from './components/Footer'

    // 引入工具类
    import localStorageUtil from './utils/localStorageUtil'
    import PubSub from 'pubsub-js'

    export default {
        name: 'app',
        data() {
            return {
               todos: localStorageUtil.readTodos()
            }
        },
        computed: {
            finishedCount() {
                return this.todos.reduce((total, todo) => total + (todo.finished ? 1 : 0), 0);
            },
            isCheck: {
                get() {
                    return this.finishedCount === this.todos.length && this.todos.length > 0
                },
                set(value) {
                    this.selectedAllTodo(value);
                }
            }
        },
        components: {
            Header,
            List,
            Footer
        },
        mounted(){
           // 绑定自定义事件（addTodo）监听
           this.$refs.header.$on('addTodo', this.addTodo);
           // 订阅消息（delTodo）
           PubSub.subscribe('delTodo', (msg, token)=>{
               // console.log(msg, token);
               this.delTodo(token);
           });
        },
        methods:{
            // 插入一条数据
            addTodo(todo){
                 this.todos.unshift(todo);
            },
            // 根据索引删除一条记录
            delTodo(index){
                this.todos.splice(index, 1);
            },
            // 是否选中所有的任务
            selectedAllTodo(isCheck){
               this.todos.forEach(todo => {
                   todo.finished = isCheck
               })
            },
            delFinishedTodos(){
                this.todos = this.todos.filter(todo=> !todo.finished)
            }
        },
        watch: {
            // 深度监视
            todos: {
                handler: localStorageUtil.saveTodos,
                deep: true, // 深度监视
                // immediate: true
            }
        }
    }
</script>

<style>
    .todo-container {
        width: 600px;
        margin: 0 auto;
    }

    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>

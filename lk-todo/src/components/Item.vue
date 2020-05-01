<template>
    <li
      @mouseenter="dealShow(true)"
      @mouseleave="dealShow(false)"
      :style="{backgroundColor: bgColor}"
    >
        <label>
            <input type="checkbox" v-model="todo.finished"/>
            <span>{{todo.title}}</span>
        </label>
        <button v-show="isShowDelButton"  class="btn btn-warning" @click="delItem">删除</button>
    </li>
</template>

<script>
    import PubSub from 'pubsub-js'
    export default {
        name: "Item",
        props: {
            todo: Object,
            index: Number, // 当前任务在总任务数组中的下标位置
            delTodo: Function
        },
        data(){
          return{
              isShowDelButton: false,  // false 隐藏 true 显示
              bgColor: '#fff'
          }
        },
        methods: {
            dealShow(isShow){
                // 控制按钮的显示和隐藏
                this.isShowDelButton =  isShow;
                // 控制背景颜色
                this.bgColor = isShow ? '#ddd' : '#fff';
            },

            delItem(){
                if(window.confirm(`您确定删除 ${this.todo.title} 吗?`)){
                     // this.delTodo(this.index);
                     // 发布消息
                    PubSub.publish('delTodo', this.index)
                }
            }
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label {
        float: left;
        cursor: pointer;
    }

    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button {
        padding: 4px 10px;
        float: right;
        margin-top: 3px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }
</style>
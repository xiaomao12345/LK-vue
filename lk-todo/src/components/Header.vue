<template>
    <div class="todo-header">
        <input
            type="text"
            placeholder="请输入今天的任务清单，按回车键确认"
            v-model="title"
            @keyup.enter="addItem"
        />
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return {
                title: ''
            }
        },
        methods: {
            addItem(){
                // 1. 判断是否为空
                const title = this.title.trim();
                if(!title){
                    alert('输入的任务不能为空！');
                    return;
                }
                // 2. 生成一个todo对象
                let todo = {title, finished: false};
                // 3. 调用父组件的插入方法
                // this.addTodo(todo);
                this.$emit('addTodo', todo);

                // 4. 清空输入框
                this.title = '';
            }
        }
    }
</script>

<style scoped>
    .todo-header input {
        width: 560px;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 7px;
        outline: none;
    }

    .todo-header input:focus {
        outline: none;
        border-color: rgba(255, 0, 0, 0.8);
        box-shadow: inset 0 1px 1px rgba(255, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);
    }
</style>
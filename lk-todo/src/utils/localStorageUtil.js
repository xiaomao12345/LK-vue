const LK_TODO = 'lk_todo';
export default {
    readTodos(){
        return JSON.parse(localStorage.getItem(LK_TODO) || '[]');
    },
    saveTodos(todos){
        console.log(todos);
        localStorage.setItem(LK_TODO, JSON.stringify(todos));
    }
}
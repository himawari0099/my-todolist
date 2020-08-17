var filters = {
    '全て': function (todos) {
        return todos
    },
    '表示': function (todos) {
        return todos.filter(function (todo) {
            return !todo['非表示']
        })
    },
    '非表示': function (todos) {
        return todos.filter(function (todo) {
            return todo['非表示']
        })
    }
}
new Vue({
    el: '#app',
    data: {
        newToDo: '',
        todos: [],
        filter: '全て',
        filterTypes: ['全て', '表示', '非表示'],
        canSubmit: false
    },
    methods: {
        addToDo: function() {
            if(this.canSubmit) {
                this.todos.push({'done': false, 'todo': this.newToDo});
                this.newToDo = '';
                this.canSubmit = false;
            }
        },
        clearToDo: function() {
            this.todos = this.todos.filter(
                function(item) {
                    return item['done']===false;
                }
            )
        },
        doneEdit: function(index, editedToDo) {
            if(this.canSubmit){
                this.todos[index]['todo'] = editedToDo;
                this.canSubmit = false;
            }
        },
        cancelEdit: function(index, todo) {
            this.todos[index]['todo'] = '';
            this.todos[index]['todo'] = todo;
        },
        setCanSubmit: function() {
            this.canSubmit = true;
        }
    },
    computed: {
        filteredTodos: function() {
            return filters[this.filter](this.todos);
        },
        todoLength: function() {
            return filters['表示'](this.todos).length;
        }
    }
})
class StorageService {
    static getLocalUsers() {
        try {
            return JSON.parse(localStorage.getItem('localUsers') || '[]');
        } catch (error) {
            console.error('Error reading local users:', error);
            return [];
        }
    }

    static saveLocalUsers(users) {
        try {
            localStorage.setItem('localUsers', JSON.stringify(users));
        } catch (error) {
            console.error('Error saving local users:', error);
        }
    }

    static getLocalTodos() {
        try {
            return JSON.parse(localStorage.getItem('localTodos') || '[]');
        } catch (error) {
            console.error('Error reading local todos:', error);
            return [];
        }
    }

    static saveLocalTodos(todos) {
        try {
            localStorage.setItem('localTodos', JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving local todos:', error);
        }
    }

    static addLocalTodo(todo) {
        const todos = this.getLocalTodos();
        const newTodo = {
            ...todo,
            id: Math.max(...todos.map(t => t.id), 200) + 1
        };
        todos.push(newTodo);
        this.saveLocalTodos(todos);
        return newTodo;
    }
}
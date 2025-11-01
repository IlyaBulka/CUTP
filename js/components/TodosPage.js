class TodosPage {
    static async render(userId = null, searchTerm = '') {
        try {
            const [apiTodos, localTodos] = await Promise.all([
                ApiService.getTodos(),
                Promise.resolve(StorageService.getLocalTodos())
            ]);

            let allTodos = [...apiTodos, ...localTodos];
            
            if (userId) {
                allTodos = allTodos.filter(todo => todo.userId == userId);
            }

            if (searchTerm) {
                allTodos = allTodos.filter(todo => 
                    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            const todosGrid = this.createTodosGrid(allTodos);
            const content = document.getElementById('content');
            content.innerHTML = '';
            content.appendChild(todosGrid);

            Breadcrumbs.render();
        } catch (error) {
            this.showError('Ошибка загрузки задач');
        }
    }

    static createTodosGrid(todos) {
        const grid = ComponentUtils.createElement('div', {
            className: 'todos-grid'
        });

        if (todos.length === 0) {
            grid.appendChild(ComponentUtils.createElement('div', {
                className: 'empty-state'
            }, [
                ComponentUtils.createElement('h3', {}, 'Задачи не найдены'),
                ComponentUtils.createElement('p', {}, 'Попробуйте изменить поисковый запрос')
            ]));
        } else {
            todos.forEach(todo => {
                grid.appendChild(this.createTodoCard(todo));
            });
        }

        return grid;
    }

    static createTodoCard(todo) {
        return ComponentUtils.createElement('div', {
            className: `card todo-card ${todo.completed ? 'todo-completed' : ''}`
        }, [
            ComponentUtils.createElement('h4', {}, todo.title),
            ComponentUtils.createElement('p', {}, [
                'Статус: ',
                ComponentUtils.createElement('span', {
                    className: `status-badge ${todo.completed ? 'status-completed' : 'status-pending'}`
                }, todo.completed ? 'Выполнено' : 'В процессе')
            ]),
            ComponentUtils.createElement('p', {
                className: 'meta-info'
            }, `ID пользователя: ${todo.userId} | ID задачи: ${todo.id}`)
        ]);
    }

    static showError(message) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        content.appendChild(ComponentUtils.createElement('div', {
            className: 'error'
        }, message));
    }
}
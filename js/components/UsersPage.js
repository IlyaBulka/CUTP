class UsersPage {
    static async render(searchTerm = '') {
        try {
            const [apiUsers, localUsers] = await Promise.all([
                ApiService.getUsers(),
                Promise.resolve(StorageService.getLocalUsers())
            ]);

            const allUsers = [...apiUsers, ...localUsers];
            let filteredUsers = allUsers;

            if (searchTerm) {
                filteredUsers = allUsers.filter(user => 
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            const addUserForm = this.createAddUserForm();
            const usersGrid = this.createUsersGrid(filteredUsers);

            const content = document.getElementById('content');
            content.innerHTML = '';
            content.appendChild(addUserForm);
            content.appendChild(usersGrid);

            Breadcrumbs.render();
        } catch (error) {
            this.showError('Ошибка загрузки пользователей');
        }
    }

    static createAddUserForm() {
        return ComponentUtils.createElement('div', {
            className: 'add-user-form'
        }, [
            ComponentUtils.createElement('h3', {}, 'Добавить пользователя'),
            ComponentUtils.createFormGroup(
                'Имя пользователя',
                ComponentUtils.createInput('Введите имя', 'userName')
            ),
            ComponentUtils.createFormGroup(
                'Email',
                ComponentUtils.createInput('Введите email', 'userEmail', 'email')
            ),
            ComponentUtils.createButton('Добавить пользователя', () => this.addUser(), 'btn btn-success')
        ]);
    }

    static createUsersGrid(users) {
        const grid = ComponentUtils.createElement('div', {
            className: 'users-grid'
        });

        if (users.length === 0) {
            grid.appendChild(ComponentUtils.createElement('div', {
                className: 'empty-state'
            }, [
                ComponentUtils.createElement('h3', {}, 'Пользователи не найдены'),
                ComponentUtils.createElement('p', {}, 'Попробуйте изменить поисковый запрос')
            ]));
        } else {
            users.forEach(user => {
                grid.appendChild(this.createUserCard(user));
            });
        }

        return grid;
    }

    static createUserCard(user) {
        const isLocal = user.id > 10;
        
        return ComponentUtils.createElement('div', {
            className: `card user-card ${isLocal ? 'local-user' : ''}`
        }, [
            ComponentUtils.createElement('h3', {}, [
                user.name,
                isLocal ? ComponentUtils.createElement('span', {
                    className: 'local-badge'
                }, 'локальный') : ''
            ]),
            ComponentUtils.createElement('p', {
                className: 'user-email'
            }, user.email),
            ComponentUtils.createElement('div', {
                className: 'btn-group'
            }, [
                ComponentUtils.createButton('Задачи', () => Router.navigate('users#todos', user.id), 'btn btn-primary btn-sm'),
                ComponentUtils.createButton('Посты', () => Router.navigate('users#posts', user.id), 'btn btn-primary btn-sm'),
                isLocal ? ComponentUtils.createButton('Удалить', () => this.deleteUser(user.id), 'btn btn-danger btn-sm') : null
            ].filter(Boolean))
        ]);
    }

    static addUser() {
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();

        if (!name || !email) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        if (!this.isValidEmail(email)) {
            alert('Пожалуйста, введите корректный email');
            return;
        }

        const localUsers = StorageService.getLocalUsers();
        const newUser = {
            id: Math.max(...localUsers.map(u => u.id), 10) + 1,
            name,
            email,
            username: name.toLowerCase().replace(/\s+/g, '_'),
            address: {
                street: '',
                city: '',
                zipcode: '',
                geo: { lat: '', lng: '' }
            },
            phone: '',
            website: '',
            company: {
                name: '',
                catchPhrase: '',
                bs: ''
            }
        };

        localUsers.push(newUser);
        StorageService.saveLocalUsers(localUsers);
        
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        
        this.render();
    }

    static deleteUser(userId) {
        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            const localUsers = StorageService.getLocalUsers();
            const filteredUsers = localUsers.filter(user => user.id !== userId);
            StorageService.saveLocalUsers(filteredUsers);
            this.render();
        }
    }

    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static showError(message) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        content.appendChild(ComponentUtils.createElement('div', {
            className: 'error'
        }, message));
    }
}
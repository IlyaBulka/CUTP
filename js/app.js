class App {
    static init() {
        // Сначала создаем базовую структуру DOM
        this.createAppStructure();
        
        // Потом инициализируем роутер
        Router.init();
        SearchService.init();
        this.initializeSampleData();
    }

    static createAppStructure() {
        const app = document.getElementById('app');
        
        // Создаем структуру через ComponentUtils
        app.appendChild(ComponentUtils.createElement('div', {
            className: 'header'
        }, [
            ComponentUtils.createElement('h1', {}, 'CUTP'),
            ComponentUtils.createElement('p', {}, 'Управление пользователями, задачами и постами')
        ]));
        
        app.appendChild(ComponentUtils.createElement('div', {
            className: 'breadcrumbs',
            id: 'breadcrumbs'
        }));
        
        app.appendChild(ComponentUtils.createElement('div', {
            className: 'search-container'
        }, [
            ComponentUtils.createElement('input', {
                type: 'text',
                id: 'searchInput',
                className: 'search-input',
                placeholder: 'Поиск...'
            })
        ]));
        
        app.appendChild(ComponentUtils.createElement('div', {
            className: 'content',
            id: 'content'
        }, [
            ComponentUtils.createElement('div', {
                className: 'loading'
            }, 'Загрузка...')
        ]));
    }

    static initializeSampleData() {
        const localUsers = StorageService.getLocalUsers();
        if (localUsers.length === 0) {
            const sampleUsers = [
                {
                    id: 11,
                    name: "Локальный Пользователь 1",
                    email: "local.user1@example.com",
                    username: "localuser1",
                    address: {
                        street: "Локальная улица",
                        suite: "",
                        city: "Локальный город", 
                        zipcode: "123456",
                        geo: { lat: "", lng: "" }
                    },
                    phone: "+7 (123) 456-7890",
                    website: "localuser1.example.com",
                    company: {
                        name: "Локальная компания",
                        catchPhrase: "Локальные решения",
                        bs: "локальный-бизнес"
                    }
                }
            ];
            StorageService.saveLocalUsers(sampleUsers);
        }
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
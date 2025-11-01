class App {
    static init() {
        Router.init();
        SearchService.init();
        this.initializeSampleData();
    }

    static initializeSampleData() {
        const localUsers = StorageService.getLocalUsers();
        if (localUsers.length === 0) {
            const sampleUsers = [
                {
                    id: 11,
                    name: "Локальный",
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
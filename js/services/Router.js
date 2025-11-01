class Router {
    static init() {
        window.addEventListener('hashchange', () => this.route());
        this.route();
    }

    static route() {
        const hash = window.location.hash.slice(1);
        const [mainRoute, subRoute, param] = hash.split('#');
        
        const searchTerm = document.getElementById('searchInput').value;

        switch (mainRoute) {
            case 'users':
                if (subRoute === 'todos') {
                    TodosPage.render(param, searchTerm);
                } else if (subRoute === 'posts') {
                    PostsPage.render(param, searchTerm);
                } else if (subRoute === 'comments') {
                    CommentsPage.render(param, searchTerm);
                } else {
                    UsersPage.render(searchTerm);
                }
                break;
            default:
                UsersPage.render(searchTerm);
        }
    }

    static navigate(route, param = null) {
        let hash = `#${route}`;
        if (param) {
            hash += `#${param}`;
        }
        window.location.hash = hash;
    }
}
import { UsersPage } from '../components/UsersPage.js';
import { PostsPage } from '../components/PostsPage.js';
import { TodosPage } from '../components/TodosPage.js';
import { CommentsPage } from '../components/CommentsPage.js';

export class Router {
    static init() {
        window.addEventListener('hashchange', () => this.route());
        // Даем время на создание DOM элементов
        setTimeout(() => this.route(), 100);
    }

    static route() {
        const hash = window.location.hash.slice(1);
        const [mainRoute, subRoute, param] = hash.split('#');
        
        // Безопасное получение searchInput
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput ? searchInput.value : '';

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
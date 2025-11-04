import { ApiService } from '../services/ApiService.js';
import { StorageService } from '../services/StorageService.js';
import { ComponentUtils } from './ComponentUtils.js';
import { Router } from '../services/Router.js';
import { Breadcrumbs } from './Breadcrumbs.js';

export class PostsPage {
    static async render(userId = null, searchTerm = '') {
        try {
            const posts = await ApiService.getPosts();
            let filteredPosts = posts;

            if (userId) {
                filteredPosts = posts.filter(post => post.userId == userId);
            }

            if (searchTerm) {
                filteredPosts = filteredPosts.filter(post => 
                    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.body.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            const postsGrid = this.createPostsGrid(filteredPosts);
            const content = document.getElementById('content');
            content.innerHTML = '';
            content.appendChild(postsGrid);

            Breadcrumbs.render();
        } catch (error) {
            this.showError('Ошибка загрузки постов');
        }
    }

    static createPostsGrid(posts) {
        const grid = ComponentUtils.createElement('div', {
            className: 'posts-grid'
        });

        if (posts.length === 0) {
            grid.appendChild(ComponentUtils.createElement('div', {
                className: 'empty-state'
            }, [
                ComponentUtils.createElement('h3', {}, 'Посты не найдены'),
                ComponentUtils.createElement('p', {}, 'Попробуйте изменить поисковый запрос')
            ]));
        } else {
            posts.forEach(post => {
                grid.appendChild(this.createPostCard(post));
            });
        }

        return grid;
    }

    static createPostCard(post) {
        return ComponentUtils.createElement('div', {
            className: 'card post-card'
        }, [
            ComponentUtils.createElement('h3', {}, post.title),
            ComponentUtils.createElement('p', {}, post.body),
            ComponentUtils.createElement('div', {
                className: 'btn-group'
            }, [
                ComponentUtils.createButton('Комментарии', () => Router.navigate('users#posts#comments', post.id), 'btn btn-primary btn-sm')
            ]),
            ComponentUtils.createElement('p', {
                className: 'meta-info'
            }, `ID пользователя: ${post.userId} | ID поста: ${post.id}`)
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
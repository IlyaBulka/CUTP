import { ApiService } from '../services/ApiService.js';
import { StorageService } from '../services/StorageService.js';
import { ComponentUtils } from './ComponentUtils.js';
import { Router } from '../services/Router.js';
import { Breadcrumbs } from './Breadcrumbs.js';

export class CommentsPage {
    static async render(postId = null, searchTerm = '') {
        try {
            const comments = await ApiService.getComments();
            let filteredComments = comments;

            if (postId) {
                filteredComments = comments.filter(comment => comment.postId == postId);
            }

            if (searchTerm) {
                filteredComments = filteredComments.filter(comment => 
                    comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    comment.body.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            const commentsGrid = this.createCommentsGrid(filteredComments);
            const content = document.getElementById('content');
            content.innerHTML = '';
            content.appendChild(commentsGrid);

            Breadcrumbs.render();
        } catch (error) {
            this.showError('Ошибка загрузки комментариев');
        }
    }

    static createCommentsGrid(comments) {
        const grid = ComponentUtils.createElement('div', {
            className: 'comments-grid'
        });

        if (comments.length === 0) {
            grid.appendChild(ComponentUtils.createElement('div', {
                className: 'empty-state'
            }, [
                ComponentUtils.createElement('h3', {}, 'Комментарии не найдены'),
                ComponentUtils.createElement('p', {}, 'Попробуйте изменить поисковый запрос')
            ]));
        } else {
            comments.forEach(comment => {
                grid.appendChild(this.createCommentCard(comment));
            });
        }

        return grid;
    }

    static createCommentCard(comment) {
        return ComponentUtils.createElement('div', {
            className: 'card comment-card'
        }, [
            ComponentUtils.createElement('h4', {}, comment.name),
            ComponentUtils.createElement('p', {}, comment.body),
            ComponentUtils.createElement('p', {
                className: 'meta-info'
            }, [
                ComponentUtils.createElement('strong', {}, 'Email: '),
                comment.email,
                ComponentUtils.createElement('br', {}),
                `ID поста: ${comment.postId} | ID комментария: ${comment.id}`
            ])
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
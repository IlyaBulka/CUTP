import { App } from './app.js';
import { Router } from './services/Router.js';
import { SearchService } from './utils/SearchService.js';
import { StorageService } from './services/StorageService.js';
import { ComponentUtils } from './components/ComponentUtils.js';
import { UsersPage } from './components/UsersPage.js';
import { PostsPage } from './components/PostsPage.js';
import { TodosPage } from './components/TodosPage.js';
import { CommentsPage } from './components/CommentsPage.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { ApiService } from './services/ApiService.js';

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
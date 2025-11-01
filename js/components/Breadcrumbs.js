class Breadcrumbs {
    static render() {
        const hash = window.location.hash.slice(1);
        const parts = hash.split('#').filter(Boolean);
        const container = document.getElementById('breadcrumbs');
        
        const items = [
            ComponentUtils.createElement('span', {
                className: 'breadcrumb-item',
                onclick: () => Router.navigate('')
            }, 'Главная')
        ];

        if (parts.length > 0) {
            items.push(ComponentUtils.createElement('span', {
                className: 'breadcrumb-item',
                onclick: () => Router.navigate('users')
            }, 'Пользователи'));
        }

        if (parts.includes('todos')) {
            items.push(ComponentUtils.createElement('span', {
                className: 'breadcrumb-item'
            }, 'Задачи'));
        }

        if (parts.includes('posts')) {
            items.push(ComponentUtils.createElement('span', {
                className: 'breadcrumb-item'
            }, 'Посты'));
        }

        if (parts.includes('comments')) {
            items.push(ComponentUtils.createElement('span', {
                className: 'breadcrumb-item'
            }, 'Комментарии'));
        }

        container.innerHTML = '';
        items.forEach(item => container.appendChild(item));
    }
}
class SearchService {
    static init() {
        let timeout;
        const searchInput = document.getElementById('searchInput');
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                Router.route();
            }, 300);
        });

        // Очистка поиска при изменении хеша
        window.addEventListener('hashchange', () => {
            searchInput.value = '';
        });
    }
}
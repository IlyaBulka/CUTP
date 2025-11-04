export class ApiService {
    static async fetchWithDelay(url, delay = 200) {
        await new Promise(resolve => setTimeout(resolve, delay));
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    static async getUsers() {
        return this.fetchWithDelay('https://jsonplaceholder.typicode.com/users');
    }

    static async getTodos() {
        return this.fetchWithDelay('https://jsonplaceholder.typicode.com/todos');
    }

    static async getPosts() {
        return this.fetchWithDelay('https://jsonplaceholder.typicode.com/posts');
    }

    static async getComments() {
        return this.fetchWithDelay('https://jsonplaceholder.typicode.com/comments');
    }
}
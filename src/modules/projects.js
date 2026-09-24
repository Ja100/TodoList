export const createProjects = (name) => {
    const todos = [];

    const addTodo = (todo) => {
        todos.push(todo)
    };

    const removeTodo = (index) => {
        if (index >= 0 && index < todos.length) {
            todos.splice(index, 1);
        }
    };

    const getTodos = () => todos;

    return {
        name,
        addTodo, removeTodo, getTodos,
    };
};
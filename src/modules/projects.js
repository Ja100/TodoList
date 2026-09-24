export const createProjects = (name) => {
    const todos = [];

    const addTodo = (todo) => {
        todos.push(todo)
    };

    const removoTodo = (index) => {
        if (index >= 0 && index < todos.length) {
            todos.splice(index, 1);
        }
    };

    const getTodos = () => todos;

    return {
        name,
        addTodo, removoTodo, getTodos,
    };
};
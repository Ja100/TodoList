export const createTodo = ( {title, description, dueDate, priority}) => {
    let completed = false;

    const toggleCompleted = () => {
        completed = !completed;
    }
    
    const isCompleted = () => completed;

    return {
        title,description,dueDate,priority,
        toggleCompleted,isCompleted
    };
};
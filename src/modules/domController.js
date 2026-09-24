
import { createTodo } from './todo.js';

export const createDOMController = (appState) => {

const appContainer = document.querySelector(".app-container");
const createDOM = (element, {nodeClass, nodeId, type, text, placeholder} = {}) => {
    const node = document.createElement(element);
    if (nodeClass) node.classList.add(nodeClass)
    if (nodeId) node.id = nodeId
    if (placeholder) node.placeholder = placeholder;
    if (type) node.type = type;
    node.textContent = text;
    return node;
}

const renderSidebar = () => {
    const sidebar = createDOM('div', {nodeClass: 'sidebar'});
    const header = createDOM('h1', {nodeClass: 'sidebar-title', text: 'PROJECTS'});
    sidebar.appendChild(header)
    
    const projectList = createDOM('ul', {nodeClass: 'project-list'});
    appState.getProjects().forEach((project, index) => {
        const item = createDOM('li', {nodeClass: 'project-item', text: project.name})
        if (project === appState.getActiveProject()) {
            item.classList.add('active');
        }
        item.addEventListener('click', () => {
            appState.setActiveProject(index);
            render();
        });
        projectList.appendChild(item);
    });

    // Modal and Form setup !!!

    
    const projectForm = createDOM('form')
    const projectInput = createDOM('input', {nodeId: 'input-box', placeholder: 'New Project...'});
    projectInput.required = true;
    const addBtn = createDOM('button', {text: 'Create', type: 'submit'});
    const openBtn = createDOM('button', {text: 'OPEN', type: 'button'});
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (projectInput.value.trim() !== ''){
            appState.addProject(projectInput.value.trim());
            projectInput.value = '';
            render();
        }
    });
    const modalBg = createDOM('div', {nodeClass: 'modal-bg'});
    const modal = createDOM('div', {nodeClass: 'modal'});
    let modalHeader = createDOM('h2', {text: 'Create a Project'});

    const openModal = () => {
        modalBg.classList.add('bg-active');
    }

    openBtn.addEventListener('click', openModal);

    projectForm.append(projectInput, addBtn);
    modal.append(modalHeader, projectForm);
    modalBg.appendChild(modal)
    sidebar.append(projectList,openBtn, modalBg);
    
    return sidebar;
}

const renderTodoItem = (todo, index) => {
    const todoCard = createDOM('div');
    const header = createDOM('div', {nodeClass: 'todo-header'});
    const title = createDOM('h4', {nodeClass:'title', text: todo.title});
    const dueDate = createDOM('span', {nodeClass: 'todo-date', text: todo.dueDate});
    
    header.append(title,dueDate);

    //Expand details

    const details = createDOM('div', 'todo-details');
    details.style.display = 'none';

    const description = createDOM('p', {nodeClass: 'todo-description', text: todo.description || 'No Description'});
    details.appendChild(description);

    //ACTIONS !!!

    const actions = createDOM('div', {nodeClass: 'todo-actions'});
    const expandBtn = createDOM('button', {nodeClass: 'expand-btn', text: 'Details'});
    expandBtn.addEventListener('click', () => {
        const isHidden = details.style.display === 'none';
        details.style.display = isHidden ? 'block' : 'none';
        expandBtn.textContent = isHidden ? 'Hide' : 'Details';
    });

    const deleteBtn = createDOM('button', {nodeClass: 'delete-btn', text: 'Delete'});
    deleteBtn.addEventListener('click', () => {
        appState.getActiveProject().removeTodo(index);
        render();
    });

    actions.append(expandBtn,deleteBtn);
    todoCard.append(header, details, actions);

    return todoCard;
}

const renderTodoForm = () => {
    const form = createDOM('form', {nodeClass: 'todo-form', text: 'Add a Task'});
    
    const titleInput = createDOM('input', {nodeClass: 'todo-input', type: 'text', placeholder: 'Task Title'});
    titleInput.required = true;

    const descInput = createDOM('textarea', {nodeClass: 'todo-input-desc', placeholder: 'Task Title'});

    const dateInput = createDOM('input', {type: 'date', placeholder: 'Task Title'});
    dateInput.required = true;

    const priority = createDOM('select');
    ['low', 'medium', 'high'].forEach(p => {
        const option = createDOM('option', {text: p.toUpperCase()});
        option.value = p;
        priority.appendChild(option);
    });;

    const submitBtn = createDOM('button', {text: 'Create a Task', type: 'submit'});

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newToddo = createTodo({
            title: titleInput.value.trim(),
            description: descInput.value.trim(),
            dueDate: dateInput.value,
            priority: priority.value
        });

        appState.getActiveProject().addTodo(newToddo);
        render();
    });

    form.append(titleInput, descInput, dateInput, priority, submitBtn);

    return form;

}

const renderMainContent = () => {
    const main = createDOM('main', {nodeClass: 'content'});
    const activeProject = appState.getActiveProject();

    const header = createDOM('h1', {text: activeProject.name});
    main.appendChild(header);

    //Fetching Task List 

    const todoListContainer = createDOM('div', {nodeClass:'taskDiv'})
    const todos = activeProject.getTodos();

    if (todos.length === 0){
        const emptyMsg = createDOM('p', {text: 'NO TASKS IN THIS PROJECT'})
        todoListContainer.appendChild(emptyMsg);
    } else {
        todos.forEach( (todo, index) => {
            todoListContainer.appendChild(renderTodoItem(todo, index));
        });
    }

    main.append(todoListContainer, renderTodoForm());

    return main;
};


    // const taskDiv = createDOM('div', {nodeClass: 'taskDiv'});    
    // const headerText = createDOM('h2', {text: 'To-do List'});
    // const row = createDOM('div', {nodeClass: 'row'});
    // const inputBox = createDOM('input', {nodeId: 'input-box', placeholder: 'Add your Task...'});
    

    

    // 
    // let title = createDOM('input', {nodeId: 'title', placeholder: 'Add your Task...'});
    // let description = createDOM('textarea', {placeholder: 'Description'})
    // let dueDate = document.createElement('input')
    // dueDate.type = 'date';
    // let createBtn = createDOM('button', {text: 'CREATE'});
    // let close = createDOM('span', {text: '\u00d7', nodeClass: 'modal-close'});
    

    // // modal.append(modalHeader, title, description, dueDate, createBtn, close);
    // // modalBg.appendChild(modal);
    
    // fetchData(listContainer);

    

    // inputBox.addEventListener('click', openModal); 
    // addBtn.addEventListener('click', openModal);

    // close.addEventListener('click', () => {
    //     modalBg.classList.remove('bg-active'); 
    // })

    // //create task inside a Modal

    // createBtn.addEventListener('click', () => {
    //     if (title.value.trim() !== '') {
    //         addTask(title, listContainer);
    //         title.value = '';
    //         description.value = '';
    //         modalBg.classList.remove('bg-active');
    //     }
    // });

    // listContainer.addEventListener('click', (e) => handleListClick(e, listContainer));
    


// const renderContent = () => {
//     const content = createDOM('div', {nodeClass: 'content'});
//     const text = createDOM('h1', {nodeClass:'title', text: 'CONTENT'});

    
//     appContainer.appendChild(content);
// };

const render = () => {
    appContainer.innerHTML = '';
    const layout = createDOM('div', {nodeClass: 'app-layout'});
    layout.appendChild(renderSidebar());
    layout.appendChild(renderMainContent());
    appContainer.appendChild(layout);
  };

  return { render };

};
import { fetchData, addTask, handleListClick } from "./createTask.js";

const appContainer = document.querySelector(".app-container");
const createDOM = (element, nodeClass, text) => {
    const node = document.createElement(element);
    if (nodeClass){
        node.classList.add(nodeClass)
    }
    node.textContent = text;
    return node;
}

const renderSidebar = () => {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    const header = createDOM('h1', 'title', 'SIDEBAR');
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskDiv');
    const headerText = document.createElement('h2');
    headerText.textContent= 'To-do List';
    const row = document.createElement('div');
    row.classList.add('row')
    const inputBox = document.createElement('input')
    inputBox.id = 'input-box';
    inputBox.placeholder = 'Add your Task...'
    const addBtn = document.createElement('button');
    addBtn.textContent = 'ADD'
    const listContainer = document.createElement('ul');

    const modalBg = document.createElement('div');
    modalBg.classList.add('modal-bg');
    const modal = document.createElement('div');
    modal.classList.add('modal');

    let modalHeader = document.createElement('h2');
    modalHeader.textContent = 'Create a Task';
    let title = document.createElement('input');
    title.id = 'title';
    title.placeholder = 'Add Your Task...';
    let description = document.createElement('textarea')
    description.placeholder = 'Description' ;
    let dueDate = document.createElement('input')
    dueDate.type = 'date';
    let createBtn = document.createElement('button')
    createBtn.textContent = 'CREATE';
    let close = document.createElement('span');
    close.classList.add('modal-close')
    close.textContent = '\u00d7';
    

    modal.append(modalHeader, title, description, dueDate, createBtn, close);
    modalBg.appendChild(modal);
    
    fetchData(listContainer);

    const openModal = () => {
        modalBg.classList.add('bg-active')
    }

    inputBox.addEventListener('click', openModal); 
    addBtn.addEventListener('click', openModal);

    close.addEventListener('click', () => {
        modalBg.classList.remove('bg-active'); 
    })

    //create task inside a Modal

    createBtn.addEventListener('click', () => {
        if (title.value.trim() !== '') {
            addTask(title, listContainer);
            title.value = '';
            description.value = '';
            modalBg.classList.remove('bg-active');
        }
    });

    listContainer.addEventListener('click', (e) => handleListClick(e, listContainer));

    row.append(inputBox, addBtn)
    taskDiv.append(headerText, row, listContainer)
    sidebar.append(header,taskDiv, modalBg);

    appContainer.appendChild(sidebar);
}

const renderContent = () => {
    const content = document.createElement('div');
    content.classList.add('content');
    const text = createDOM('h1', 'title', 'CONTENT');

    content.appendChild(text);
    appContainer.appendChild(content);
};


export { renderSidebar, renderContent };

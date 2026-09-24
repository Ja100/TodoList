import { fetchData, addTask, handleListClick } from "./createTask.js";

const appContainer = document.querySelector(".app-container");
const createDOM = (element, {nodeClass, nodeId, text, placeholder} = {}) => {
    const node = document.createElement(element);
    if (nodeClass) node.classList.add(nodeClass)
    if (nodeId) node.id = nodeId
    if (placeholder) node.placeholder = placeholder;
    node.textContent = text;
    return node;
}

const renderSidebar = () => {
    const sidebar = createDOM('div', {nodeClass: 'sidebar'});
    const header = createDOM('h1', {nodeClass: 'title', text: 'SIDEBAR'});
    const taskDiv = createDOM('div', {nodeClass: 'taskDiv'});    
    const headerText = createDOM('h2', {text: 'To-do List'});
    const row = createDOM('div', {nodeClass: 'row'});
    const inputBox = createDOM('input', {nodeId: 'input-box', placeholder: 'Add your Task...'});
    const addBtn = createDOM('button', {text: 'ADD'});
    const listContainer = createDOM('ul');

    const modalBg = createDOM('div', {nodeClass: 'modal-bg'});
    const modal = createDOM('div', {nodeClass: 'modal'});

    let modalHeader = createDOM('h2', {text: 'Create a Task'});
    let title = createDOM('input', {nodeId: 'title', placeholder: 'Add your Task...'});
    let description = createDOM('textarea', {placeholder: 'Description'})
    let dueDate = document.createElement('input')
    dueDate.type = 'date';
    let createBtn = createDOM('button', {text: 'CREATE'});
    let close = createDOM('span', {text: '\u00d7', nodeClass: 'modal-close'});
    

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
    const content = createDOM('div', {nodeClass: 'content'});
    const text = createDOM('h1', {nodeClass:'title', text: 'CONTENT'});

    content.appendChild(text);
    appContainer.appendChild(content);
};


export { renderSidebar, renderContent };

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
    
    fetchData(listContainer);


    addBtn.addEventListener('click', () => addTask(inputBox, listContainer));
    listContainer.addEventListener('click', (e) => handleListClick(e, listContainer));

    row.append(inputBox, addBtn)
    taskDiv.append(headerText, row, listContainer)
    sidebar.append(header,taskDiv);

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

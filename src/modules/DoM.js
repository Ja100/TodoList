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
    
    sidebar.appendChild(header);

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

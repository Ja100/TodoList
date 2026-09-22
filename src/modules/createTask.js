export function saveData (listContainer){
    localStorage.setItem("data", listContainer.innerHTML);
}

export function fetchData (listContainer){
    listContainer.innerHTML =  localStorage.getItem("data")
}

export function addTask(inputBox, listContainer){
    if(!inputBox.value.trim()) return;
    const li = document.createElement('li');
    li.textContent = inputBox.value;
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
        li.appendChild(span);
    listContainer.appendChild(li)
    inputBox.value = '';
    saveData(listContainer);
}

export function handleListClick(e, listContainer) {
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveData(listContainer);
    } else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData(listContainer);
    }
}

import { getToDos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

// Render application todos based on filters
const renderToDos = () => {
    const todoEl = document.querySelector('#todos')
    const { searchText, hideCompleted } = getFilters()
    const filteredToDos = getToDos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch;
    })

    const unfinished = filteredToDos.filter((todo) => !todo.completed)

    todoEl.innerHTML = '';
    todoEl.appendChild(generateSummaryDOM(unfinished));    

    if (filteredToDos.length > 0) {
        filteredToDos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no to-dos to show'
        todoEl.appendChild(messageEl)
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderToDos()
    })
    

    // Setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderToDos()
    })

    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (unfinished) => {
    const summary = document.createElement('h2');
    const plural = unfinished.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${unfinished.length} todo${plural} left!`;
    return summary
}

export { generateTodoDOM, renderToDos, generateSummaryDOM }
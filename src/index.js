import { renderToDos } from './views'
import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos'

renderToDos();

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderToDos();
})

document.querySelector('#tasks-form').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault();

    if (text.length > 0) {
        createTodo(text)
        renderToDos()
        e.target.elements.text.value = '';
    }

})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderToDos();
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderToDos()
    }
})
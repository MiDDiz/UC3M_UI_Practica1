const draggables = document.querySelectorAll('.cancion-item')
const container = document.querySelectorAll('.listado-canciones')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

container.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElem(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        console.log(afterElement)
        if (afterElement == null){
            container.appendChild(draggable)
        } 
        else{
            container.insertBefore(draggable, afterElement)
        }

    })
})

function getDragAfterElem(container, y){
    const draggableElements = [...container.querySelectorAll('.cancion-item:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y- box.top - box.height / 2
        if (offset < 0 && offset > closest.offset){
            return { offset: offset, element: child}
        }else{
            return closest
        }
        
    }, {offset: Number.POSITIVE_INFINITY}).element

}
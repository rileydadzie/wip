const numberInput = document.getElementById('counterNum')
const decrementBtn = document.getElementById('decrement-btn')
const incrementBtn = document.getElementById('increment-btn')
const finish = document.getElementById('finishPart')

decrementBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    let current = Number(numberInput.value)
    if (current > 0) numberInput.value = current - 1
})

incrementBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    let current = Number(numberInput.value)
    if (current < Number(numberInput.max)) numberInput.value = current + 1
})

numberInput?.addEventListener('input', (event) => {
    const max = Number(numberInput.max)
    const currentValue = Number(event.target.value)
    
    if(max === currentValue && finish){
        finish.classList.remove('hide')
    } else if(finish) {
        finish.classList.add('hide')
    }
})


const numberInput = document.getElementById('counterNum')
const decrementBtn = document.getElementById('decrement-btn')
const incrementBtn = document.getElementById('increment-btn')
const finish = document.getElementById('finishPart')

const checkFinishButton = () => {
    const max = Number(numberInput.max)
    const currentValue = Number(numberInput.value)
    
    if(max === currentValue && finish){
        finish.classList.remove('hidden')
    } else if(finish) {
        finish.classList.add('hidden')
    }
}

decrementBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    let current = Number(numberInput.value)
    if (current > 0) numberInput.value = current - 1
    checkFinishButton()
})

incrementBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    let current = Number(numberInput.value)
    if (current < Number(numberInput.max)) numberInput.value = current + 1
    checkFinishButton()
})

numberInput?.addEventListener('input', (event) => {
    checkFinishButton()
})


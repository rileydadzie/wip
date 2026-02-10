const numberInput = document.getElementById('counterNum')
const decrementBtn = document.getElementById('decrement-btn')
const incrementBtn = document.getElementById('increment-btn')
const finish = document.getElementById('finishPart')
const finishBtn = document.getElementById('finishBtn')

const checkFinishButton = () => {
    const max = Number(numberInput.max)
    const currentValue = Number(numberInput.value)
    
    if(max === currentValue && finishBtn){
        finishBtn.disabled = false
        finishBtn.className = "w-20 h-20 rounded-full bg-orange-700 hover:bg-lime-300 hover:text-emerald-700 text-white text-4xl"
    } else if(finishBtn) {
        finishBtn.disabled = true
        finishBtn.className = "px-3 py-2 bg-transparent text-emerald-700 border-2 border-emerald-700 rounded-full w-20 h-20 text-4xl"
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


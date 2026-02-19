const modal = document.getElementById('yarnModal')

const openModalBtn = document.getElementById('addYarn')
const closeModalBtn = document.getElementById('close-modal-btn');
const closeModalBtnFooter = document.getElementById('close-modal-btn-footer');

const yarnStashHeader = document.getElementById('yarnStashHeader')
const yarnFormHeader = document.getElementById('yarnFormHeader')
const yarnStash = document.getElementById('yarnStash')
const yarnForm = document.getElementById('yarnForm')

// Function to toggle modal visibility
function toggleModal() {
    modal.classList.toggle('hidden');
}

// Event listeners to open and close the modal
openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
closeModalBtnFooter.addEventListener('click', toggleModal);

// Close the modal if the user clicks the backdrop
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        toggleModal();
    }
});

// Close modal with the Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        toggleModal();
    }
});

// Switch to Stash

yarnStashHeader.addEventListener('click', () => {
    yarnStashHeader.className = "bg-orange-700 w-full rounded-t-lg"
    yarnFormHeader.className = "bg-slate-400 rounded-t-lg"
    yarnStash.classList.remove('hidden')
    yarnForm.classList.add('hidden')

})

yarnFormHeader.addEventListener('click', () => {
    yarnFormHeader.className = "bg-orange-700 w-full rounded-t-lg"
    yarnStashHeader.className = "bg-slate-400 rounded-t-lg"
    yarnForm.classList.remove('hidden')
    yarnStash.classList.add('hidden')
})
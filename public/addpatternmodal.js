const modal = document.getElementById('addPatternModal')

const openModalBtn = document.getElementById('addPattern')
const closeModalBtn = document.getElementById('close-modal-btn');
const closeModalBtnFooter = document.getElementById('close-modal-btn-footer');

// Function to toggle modal visibility
function toggleModal() {
    modal.classList.toggle('hidden');
}

// Event listeners to open and close the modal
openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
closeModalBtnFooter.addEventListener('click', toggleModal);

// Close the modal if the user clicks the backdrop (optional, but good practice)
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        toggleModal();
    }
});

// Close modal with the Escape key (also good practice)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        toggleModal();
    }
});
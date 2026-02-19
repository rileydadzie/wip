const nameEdit = document.getElementById('editProjectName')
const nameEditForm = document.getElementById('nameEditForm')
const currentName = document.getElementById('currentName')

nameEdit.addEventListener('click', () => {
    nameEditForm.classList.remove('hidden')
    currentName.classList.add('hidden')
    nameEdit.classList.add('hidden')
})



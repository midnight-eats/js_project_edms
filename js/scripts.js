const deleteButtons = document.querySelectorAll('.deleteBtn');
const modal = document.querySelector('.modal');
const openModal = document.querySelector('.createBtn');

deleteButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const clickedButton = event.target;
    const id = clickedButton.getAttribute('data-id');
    deleteItem(id);
  });
});

openModal.addEventListener('click', () => {
  window.location.href = "/positions/form";
})

async function deleteItem(id) {
  console.log(id);
  window.location.href = `/positions/${id}/delete`;
}
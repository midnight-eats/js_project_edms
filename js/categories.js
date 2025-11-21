const deleteBtns = document.querySelectorAll('.deleteBtn');
const editBtns = document.querySelectorAll('.editBtn');
const formCreate = document.querySelector('.createBtn');

deleteBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const clickedBtn = event.target;
    const id = clickedBtn.getAttribute('data-id');
    deleteItem(id);
  });
});

editBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const clickedBtn = event.target;
    const id = clickedBtn.getAttribute('data-id');
    window.location.href = `/categories/form/${id}`;
  });
});

formCreate.addEventListener('click', () => {
  window.location.href = "/categories/form";
})

async function deleteItem(id) {
  window.location.href = `/categories/${id}/delete`;
}
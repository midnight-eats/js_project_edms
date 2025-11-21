const form = document.querySelector('form');
currentPath = window.location.pathname;

if (currentPath.includes('/form/')) {
    const id = currentPath.split('/').pop();
    form.action = `/categories/form/${id}/edit`;
} else {
    form.action = '/categories/form/create';
}
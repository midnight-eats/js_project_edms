const form = document.querySelector('form');
currentPath = window.location.pathname;

if (currentPath.includes('/form/')) {
    const id = currentPath.split('/').pop();
    form.action = `/positions/form/${id}/edit`;
} else {
    form.action = '/positions/form/create';
}
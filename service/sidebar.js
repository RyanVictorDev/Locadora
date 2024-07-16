document.getElementById('openSidebar').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('openSidebar');
    document.getElementById('header').classList.toggle('openSidebar');
    document.getElementById('main').classList.toggle('openSidebar');
})
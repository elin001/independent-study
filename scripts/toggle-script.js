function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// Restore theme preference from local storage
window.onload = function() {
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
    const body = document.body;
    if (isDarkModeEnabled) {
        body.classList.add('dark-mode');
    }
    else {
        body.classList.remove('dark-mode');
    }
};

// Save theme preference to local storage
window.onbeforeunload = function() {
    const body = document.body;
    const isDarkModeEnabled = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkModeEnabled);
};

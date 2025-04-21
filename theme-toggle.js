// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or use default (dark)
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme or default
if (currentTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    // Toggle classes
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    // Save preference to localStorage
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    
    // Announce theme change for accessibility
    const message = `Switched to ${theme} mode`;
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only'); // Screen reader only
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove announcement after it's read
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
});

// Add screen reader only style
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(style);
// Mode Toggle Functions
function toggleProctorMode() {
    const button = document.getElementById('proctorModeBtn');
    const isActive = button.classList.toggle('active');
    
    if (isActive) {
        // Enable proctored mode
        startProctoring();
    } else {
        // Disable proctored mode
        stopProctoring();
    }
}

function toggleDarkMode() {
    const button = document.getElementById('darkModeBtn');
    const body = document.body;
    
    button.classList.toggle('active');
    body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function toggleReadMode() {
    const button = document.getElementById('readModeBtn');
    const body = document.body;
    
    button.classList.toggle('active');
    body.classList.toggle('read-mode');
    
    // Save preference to localStorage
    const isReadMode = body.classList.contains('read-mode');
    localStorage.setItem('readMode', isReadMode);
}

// Profile Dropdown
function toggleProfileDropdown() {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.profile-btn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let dropdown of dropdowns) {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        }
    }
}

// Time Display
function updateTime() {
    const timeDisplay = document.getElementById('timeDisplay');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Proctoring Functions
function startProctoring() {
    // Add proctoring functionality here
    console.log('Proctored mode enabled');
}

function stopProctoring() {
    // Remove proctoring functionality here
    console.log('Proctored mode disabled');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set initial dark mode state
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeBtn').classList.add('active');
    }
    
    // Set initial read mode state
    const isReadMode = localStorage.getItem('readMode') === 'true';
    if (isReadMode) {
        document.body.classList.add('read-mode');
        document.getElementById('readModeBtn').classList.add('active');
    }
    
    // Start time updates
    updateTime();
    setInterval(updateTime, 1000);
}); 
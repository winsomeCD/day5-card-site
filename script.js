// Wait for the HTML document structure to be fully loaded and parsed before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Theme toggle variables
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeToggle.textContent = 'Switch to Light';
    } else {
        body.classList.remove('dark');
        themeToggle.textContent = 'Switch to Dark';
    }

    // Toggle theme handler
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Switch to Light';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Switch to Dark';
        }
    });

    // 3D Parallax Tilt Hover Effect (Desktop only)
    const card = document.getElementById('interactive-card');
    const wrapper = document.querySelector('.postcard-wrapper');

    wrapper.addEventListener('mousemove', (e) => {
        // Do not apply tilt on smaller viewports where the card is stacked
        if (window.innerWidth <= 768) {
            return;
        }

        // Get bounds of the postcard
        const rect = card.getBoundingClientRect();
        
        // Mouse coordinate relative to the card's top-left corner
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Normalized coordinates (-1 to 1) representing position relative to card center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        // Define max rotation angles (degrees)
        const maxRotateX = 6;
        const maxRotateY = 8;

        const rotateX = -deltaY * maxRotateX;
        const rotateY = deltaX * maxRotateY;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        // Smoothly reset back to standard alignment
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        
        // Remove the temporary transition after animation completes to avoid lag on mousemove
        setTimeout(() => {
            card.style.transition = '';
        }, 500);
    });
});

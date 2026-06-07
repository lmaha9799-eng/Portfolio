document.addEventListener('DOMContentLoaded', () => {
    
    // ─── 1. MOBILE NAV TOGGLE ───────────────────────────────────
    const navToggle = document.getElementById('ntoggle');
    const navList = document.getElementById('navlist');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle attributes and classes
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('open');
            
            // Switch hamburger icon to an 'X' close indicator
            navToggle.textContent = isExpanded ? '☰' : '✕';
        });

        // Close mobile menu when a link is clicked
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('open');
                navToggle.textContent = '☰';
            });
        });
    }

    // ─── 2. SCROLL REVEAL ANIMATIONS ─────────────────────────────
    // Tracks elements as they enter the screen and adds the '.in' class
    const revealElements = document.querySelectorAll('.reveal, .reveal-l');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    observer.unobserve(entry.target); // Stop tracking once animated
                }
            });
        }, {
            threshold: 0.15,     // Triggers when 15% of the item is visible
            rootMargin: '0px 0px -50px 0px' 
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers: instantly show elements
        revealElements.forEach(el => el.classList.add('in'));
    }
});
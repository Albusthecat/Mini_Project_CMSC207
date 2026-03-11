/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Smooth Scrolling for Navigation Links
    // ==========================================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // 2. Scroll Animations (Fade-up effect)
    // ==========================================
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once the animation triggers
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    fadeUpElements.forEach(element => {
        observer.observe(element);
    });

    // ==========================================
    // 3. Highlight Active Navigation Item on Scroll
    // ==========================================
    const sections = document.querySelectorAll('#wrapper > section');
    const navLinks = document.querySelectorAll('#navbar nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Determine which section is currently in view
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // Update active class on navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 4. Dark/Light Mode Toggle
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Update button text based on active theme
            if (document.body.classList.contains('light-mode')) {
                themeToggle.textContent = 'Dark Mode';
            } else {
                themeToggle.textContent = 'Light Mode';
            }
        });
    }

    // ==========================================
    // 5. Fun Fact Generator
    // ==========================================
    const funFactBtn = document.getElementById('fun-fact-btn');
    const funFactDisplay = document.getElementById('fun-fact-display');

    const funFacts = [
        "Insert your first fun fact here.",
        "Insert your second fun fact here.",
        "Insert your third fun fact here.",
        "Insert your fourth fun fact here."
    ];

    if (funFactBtn && funFactDisplay) {
        funFactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const randomIndex = Math.floor(Math.random() * funFacts.length);
            funFactDisplay.textContent = funFacts[randomIndex];
            
            // Remove class to reset CSS animation
            funFactDisplay.classList.remove('show');
            
            // Short delay ensures the browser registers class removal before adding it back
            setTimeout(() => {
                funFactDisplay.classList.add('show');
            }, 10);
        });
    }

    // ==========================================
    // 6. Typing Effect
    // ==========================================
    const words = ["Hello!", "Kumusta?", "¡Hola!", "Bonjour!", "Sawasdee ka สวัสดีค่ะ!"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typing-text");

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove a character
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Set default typing speed
        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed = 50; // Make deleting faster
        }

        // Check if the word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at the end of the word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to the next word
            typeSpeed = 500; // Pause before typing the new word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the typing effect
    if (typingElement) {
        typeEffect();
    }
});
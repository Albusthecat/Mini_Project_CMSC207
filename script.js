/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Smooth Scrolling for Navigation Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            themeToggle.textContent = document.body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';
        });
    }

    // ==========================================
    // 5. Fun Fact Generator
    // ==========================================
    const funFactBtn = document.getElementById('fun-fact-btn');
    const funFactDisplay = document.getElementById('fun-fact-display');

    const funFacts = [
        "Albus actually 'helped' me build this website by walking across my keyboard at least a dozen times.",
        "My degree has nothing to do with tech, but logic is the universal language of both finance and code.",
        "I am a career shifter who loves the challenge of learning new languages, whether they are human or digital.",
        "I can order a full meal in five languages, though I sometimes mix them up when I am hungry."
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
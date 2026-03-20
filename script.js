document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Visual feedback
            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';
            
            // Collect form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value || "No email provided";
            const message = document.getElementById('message').value;

            // 1. Send data to Email via Formsubmit (AJAX)
            fetch("https://formsubmit.co/ajax/shree050607@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "New Website Enquiry - Sairam Doors",
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                // 2. Open WhatsApp with pre-filled message
                const whatsappMessage = `*New Website Enquiry*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Message:* ${message}`;
                const whatsappUrl = `https://wa.me/919422516087?text=${encodeURIComponent(whatsappMessage)}`;
                
                // Open WhatsApp in a new tab
                window.open(whatsappUrl, '_blank');

                // Update Button UI
                btn.innerHTML = 'Message Sent! <span class="arrow">✓</span>';
                btn.style.backgroundColor = '#25D366';
                btn.style.borderColor = '#25D366';
                contactForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                btn.innerHTML = 'Error Sending! Try WhatsApp directly.';
                btn.style.backgroundColor = '#ff4444';
                btn.style.borderColor = '#ff4444';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            });
        });
    }

    // Intersection Observer for fade-in animations
    const observeElements = document.querySelectorAll('.feature-card, .product-card, .gallery-item');
    
    // Add initial styles for hidden elements if JS is enabled
    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observerOption = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOption);

    observeElements.forEach(el => {
        elementObserver.observe(el);
    });
});

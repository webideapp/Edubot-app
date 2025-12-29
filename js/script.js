document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.firstElementChild.classList.add('bg-white/80', 'shadow-sm');
                navbar.firstElementChild.classList.remove('border-transparent');
            } else {
                navbar.firstElementChild.classList.remove('bg-white/80', 'shadow-sm');
                navbar.firstElementChild.classList.add('border-transparent');
            }
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe existing fade elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Observe Pricing Cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        observer.observe(card);
    });

    // =========================================
    // CONTACT FORM LOGIC (CLIENT-SIDE ONLY)
    // =========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get Values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Construct Mailto Link
            const mailtoLink = "mailto:chuyongglean@gmail.com" +
                "?subject=" + encodeURIComponent(subject || "New Contact Form Submission") +
                "&body=" + encodeURIComponent(
                    "Name: " + name + "\n" +
                    "Email: " + email + "\n\n" +
                    "Message:\n" + message
                );

            // Trigger Mail Client
            window.location.href = mailtoLink;
            
            // Optional: visual feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Opening Mail App...';
            setTimeout(() => {
                btn.innerHTML = originalText;
                contactForm.reset();
            }, 3000);
        });
    }
});
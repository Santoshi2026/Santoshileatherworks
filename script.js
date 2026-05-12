// Santoshi Leather Works - Main Script file

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Scroll Reveal Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-up, .fade-right, .fade-left');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 4. Form Submission Handling
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather form data
            const name = document.getElementById('name').value;
            const company = document.getElementById('company').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Construct email message
            const subject = encodeURIComponent(`New Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}

Message/Requirements:
${message}`);

            // Open default mail client
            window.location.href = `mailto:santoshileatherworks@gmail.com?subject=${subject}&body=${body}`;
            
            // Provide feedback
            alert(`✅ Thank you, ${name}! Your email has been opened to send the inquiry.`);
            leadForm.reset();
        });
    }
});

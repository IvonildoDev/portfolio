document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            preloader.style.opacity = '0';
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuIcon = document.querySelector('.menu-toggle i');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const body = document.body;

    function openMobileMenu() {
        nav.classList.add('active');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        overlay.classList.add('active');
        body.classList.add('menu-active');
    }

    function closeMobileMenu() {
        nav.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        overlay.classList.remove('active');
        body.classList.remove('menu-active');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            if (nav.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close menu when clicking outside or on the overlay
    document.addEventListener('click', function (e) {
        if (nav && nav.classList.contains('active') &&
            !nav.contains(e.target) &&
            e.target !== menuToggle &&
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking on overlay
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Function to filter portfolio items
    function filterPortfolio(filterValue) {
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                    item.style.opacity = '1';
                }, 100);
            } else if (category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                    item.style.opacity = '1';
                }, 100);
            } else {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterPortfolio(filter);
        });
    });

    // Initialize with "all" filter
    filterPortfolio('all');

    // Skill Progress Bars Animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.querySelector('.section-skills');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-width');
            bar.style.width = value + '%';
        });
    }

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (skillsSection) {
            observer.observe(skillsSection);
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        window.addEventListener('scroll', function () {
            if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight) {
                animateProgressBars();
            }
        });
    }

    // Form Validation
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            // Simple validation
            let isValid = true;

            if (!nameInput.value.trim()) {
                showError(nameInput, 'Por favor, insira seu nome');
                isValid = false;
            } else {
                removeError(nameInput);
            }

            if (!emailInput.value.trim()) {
                showError(emailInput, 'Por favor, insira seu email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, insira um email válido');
                isValid = false;
            } else {
                removeError(emailInput);
            }

            if (!messageInput.value.trim()) {
                showError(messageInput, 'Por favor, insira sua mensagem');
                isValid = false;
            } else {
                removeError(messageInput);
            }

            if (isValid) {
                // Here you can implement the email sending logic
                // using services like EmailJS, FormSubmit, etc.

                // For now, just show a success message
                const submitBtn = contactForm.querySelector('.btn-submit');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                submitBtn.style.backgroundColor = '#4CAF50';

                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = 'Enviar Mensagem <i class="fas fa-paper-plane"></i>';
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('small');

        if (!formGroup.querySelector('.error-message')) {
            errorMessage.classList.add('error-message');
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '12px';
            errorMessage.style.marginTop = '5px';
            errorMessage.style.display = 'block';
            formGroup.appendChild(errorMessage);
        }

        errorMessage.innerText = message;
        input.style.borderColor = 'red';
    }

    // Remove error message
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');

        if (errorMessage) {
            errorMessage.remove();
        }

        input.style.borderColor = '';
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 50) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    });

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.getAttribute('href') === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }

            // Close mobile menu if open
            if (nav && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });

    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('nav a[href="#' + sectionId + '"]');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Check mobile app images
    const appImages = document.querySelectorAll('.mobile-app img');
    appImages.forEach(img => {
        img.addEventListener('error', function () {
            this.src = 'https://via.placeholder.com/250x500/e9ecef/1e3c72?text=App+Screenshot';
            console.log('Por favor, substitua as imagens placeholder pelos screenshots reais dos aplicativos na pasta imgens/apps/');
        });
    });

    // App Modal Functionality
    const modal = document.getElementById('appModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalTech = document.getElementById('modalTech');
    const closeModalBtn = document.querySelector('.close-modal');
    const appModalTriggers = document.querySelectorAll('.app-modal-trigger');

    function openModal(img, title, desc, features, tech) {
        modalImage.src = img;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        // Clear and populate features list
        modalFeatures.innerHTML = '';
        if (features) {
            const featuresList = features.split(',');
            featuresList.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature.trim();
                modalFeatures.appendChild(li);
            });
        }

        modalTech.textContent = 'Tecnologias: ' + tech;

        // Show modal with animation
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }

    appModalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const img = this.getAttribute('data-img');
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            const features = this.getAttribute('data-features');
            const tech = this.getAttribute('data-tech');

            openModal(img, title, desc, features, tech);
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal on click outside
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Project filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            projectCards.forEach(card => {
                const category = card.dataset.category;
                const shouldShow =
                    filter === "all" || category === filter;

                card.hidden = !shouldShow;
            });
        });
    });

    // Scroll reveal animations
    const revealElements = document.querySelectorAll(
        ".reveal, .section-heading, .project-card, .skill-card, .cert-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navigationLinks.forEach(link => {
                            const isActive =
                                link.getAttribute("href") === `#${entry.target.id}`;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                threshold: 0.35
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Current year in footer
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Back to top button
    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 500
            );
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Typing animation for hero text
    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {
        const phrases = [
            "AI Engineering Student",
            "Python Developer",
            "Exploring Machine Learning",
            "Building LLM Applications"
        ];

        let phraseIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (deleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typingElement.textContent =
                currentPhrase.substring(0, characterIndex);

            let delay = deleting ? 45 : 85;

            if (!deleting && characterIndex === currentPhrase.length) {
                deleting = true;
                delay = 1400;
            } else if (deleting && characterIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 400;
            }

            setTimeout(typeEffect, delay);
        }

        typeEffect();
    }

});

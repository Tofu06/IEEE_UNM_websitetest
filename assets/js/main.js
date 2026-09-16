document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const mainNav = document.getElementById("mainNav");

    if (menuButton && mainNav) {
        menuButton.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("active");

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

            menuButton.innerHTML = isOpen ? "✕" : "☰";
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                menuButton.innerHTML = "☰";
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                mainNav.classList.remove("active");

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                menuButton.innerHTML = "☰";
            }
        });
    }


    /* =====================================================
    DARK MODE
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");

            themeToggle.setAttribute(
                "aria-pressed",
                "true"
            );

            if (themeIcon) {
                themeIcon.textContent = "☀";
            }
        }

        themeToggle.addEventListener("click", () => {

            const isDark =
                document.body.classList.contains("dark-mode");

            const rect =
                themeToggle.getBoundingClientRect();

            const x =
                rect.left + rect.width / 2;

            const y =
                rect.top + rect.height / 2;

            /*
            * Calculate the distance from the button
            * to the furthest corner of the screen.
            *
            * This guarantees the circle completely
            * covers the screen.
            */

            const distances = [
                Math.hypot(x, y),
                Math.hypot(window.innerWidth - x, y),
                Math.hypot(x, window.innerHeight - y),
                Math.hypot(
                    window.innerWidth - x,
                    window.innerHeight - y
                )
            ];

            const radius =
                Math.max(...distances) + 10;

            /*
            * Create transition overlay.
            */

            const overlay =
                document.createElement("div");

            overlay.className =
                "theme-transition";

            overlay.style.setProperty(
                "--transition-x",
                `${x}px`
            );

            overlay.style.setProperty(
                "--transition-y",
                `${y}px`
            );

            overlay.style.setProperty(
                "--transition-radius",
                `${radius}px`
            );

            /*
            * Decide which colour the overlay should be.
            *
            * Light → Dark = dark overlay
            * Dark → Light = white overlay
            */

            overlay.style.setProperty(
                "--transition-color",
                isDark ? "#ffffff" : "#101820"
            );

            document.body.appendChild(overlay);

            /*
            * Start expansion.
            */

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    overlay.classList.add("expand");
                });
            });

            /*
            * Wait until the screen is completely covered,
            * then change the actual theme underneath.
            */

            setTimeout(() => {

                document.body.classList.toggle(
                    "dark-mode",
                    !isDark
                );

                localStorage.setItem(
                    "theme",
                    !isDark ? "dark" : "light"
                );

                themeToggle.setAttribute(
                    "aria-pressed",
                    !isDark ? "true" : "false"
                );

                if (themeIcon) {
                    themeIcon.textContent =
                        !isDark ? "☀" : "☾";
                }

                /*
                * Now reveal the new theme by shrinking
                * the circle back toward the button.
                */

                requestAnimationFrame(() => {
                    overlay.classList.remove("expand");
                    overlay.classList.add("contract");
                });

            }, 600);

            /*
            * Remove the overlay once the contraction
            * animation is finished.
            */

            setTimeout(() => {
                overlay.remove();
            }, 1200);
        });
    }


    /* =====================================================
    DYNAMIC HERO TITLE SIZE
    ===================================================== */

    function fitHeroTitle() {
        const heroTitle = document.getElementById("heroTitle");

        if (!heroTitle) {
            return;
        }

        const container = heroTitle.parentElement;

        if (!container) {
            return;
        }

        const availableWidth = container.clientWidth;

        let minSize = 16;
        let maxSize = 52;

        /*
        * Reset the title before measuring.
        */
        heroTitle.style.fontSize = `${maxSize}px`;

        /*
        * Make sure the browser measures the full
        * single-line width.
        */
        heroTitle.style.whiteSpace = "nowrap";

        /*
        * Find the largest font size that fits.
        */
        while (maxSize - minSize > 0.5) {
            const testSize = (maxSize + minSize) / 2;

            heroTitle.style.fontSize = `${testSize}px`;

            if (heroTitle.scrollWidth > availableWidth) {
                maxSize = testSize;
            } else {
                minSize = testSize;
            }
        }

        heroTitle.style.fontSize = `${minSize}px`;
    }


    /*
    * Run after the page has fully loaded.
    */
    window.addEventListener("load", fitHeroTitle);


    /*
    * Run whenever the viewport changes size.
    */
    window.addEventListener("resize", fitHeroTitle);


    /*
    * Also run shortly after loading because
    * mobile browsers can change the viewport
    * dimensions after the initial layout.
    */
    setTimeout(fitHeroTitle, 100);
    setTimeout(fitHeroTitle, 500);

    /* =====================================================
    HERO TEXT ROTATION
    ===================================================== */

    const rotatingText =
        document.getElementById("rotatingText");

    if (rotatingText) {

        const words = [
            "Electrical",
            "Electronic",
            "Mechatronic",
            "Computer Science"
        ];

        let currentIndex = 0;

        setInterval(() => {

            rotatingText.style.animation = "none";

            void rotatingText.offsetWidth;

            currentIndex =
                (currentIndex + 1) % words.length;

            rotatingText.textContent =
                words[currentIndex];

            rotatingText.style.animation =
                "textSlideIn 0.45s ease";

        }, 2500);
    }

});
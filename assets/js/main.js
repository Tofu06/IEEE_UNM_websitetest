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
        const isDark = document.body.classList.contains("dark-mode");

        const rect = themeToggle.getBoundingClientRect();

        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const overlay = document.createElement("div");

        overlay.className = "theme-transition";

        overlay.style.setProperty(
            "--transition-x",
            `${x}px`
        );

        overlay.style.setProperty(
            "--transition-y",
            `${y}px`
        );

        // Dark → Light = white
        // Light → Dark = dark
        overlay.style.background =
            isDark ? "#ffffff" : "#101820";

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add("expand");
        });

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
        }, 350);

        setTimeout(() => {
            overlay.remove();
        }, 750);
    });
}


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
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
       HERO TEXT ROTATION
       ===================================================== */

    const rotatingText = document.getElementById("rotatingText");

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

            // Force animation restart
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
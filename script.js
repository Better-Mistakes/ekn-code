// --------------------- Loading Animation --------------------- //
// Fade in main-wrapper after page fully loads
$(window).on("load", function () {
  $("body").animate({ opacity: 1 }, 200);
});

// --------------------- Navbar Scroll Behavior --------------------- //
(function () {
  const navbar = document.querySelector(".navbar");
  const navbarBg = document.querySelector(".navbar--bg");

  if (!navbar || !navbarBg) return;

  let lastScrollY = window.scrollY;
  let isScrollingDown = false;
  const scrollThreshold = window.innerHeight * 0.25; // 25vh

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;
    isScrollingDown = currentScrollY > lastScrollY;

    // Calculate opacity for navbar--bg (0 to 1 over 25vh)
    const bgOpacity = Math.min(currentScrollY / scrollThreshold, 1);
    navbarBg.style.opacity = bgOpacity;

    // Navbar visibility logic
    if (currentScrollY < scrollThreshold) {
      // Always show navbar at the top
      navbar.style.transform = "translateY(0)";
    } else {
      // After 25vh: hide on scroll down, show on scroll up
      if (isScrollingDown) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }
    }

    lastScrollY = currentScrollY;
  }

  // Throttle scroll events for better performance
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleNavbarScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initialize on load
  handleNavbarScroll();
})();

// --------------------- Eyebrow Text Cycling Animation --------------------- //
(function () {
  const eyebrowElement = document.querySelector('[animation="eyebrow"]');

  if (!eyebrowElement) return;

  const phrases = [
    "From field to office",
    "From data to decision",
    "From risk to reliability",
  ];

  let currentIndex = 0;
  let isAnimating = false;

  let currentSplit = null;

  function animateTextChange() {
    if (isAnimating) return;
    isAnimating = true;

    // If there's an existing split, use it, otherwise create one
    if (!currentSplit) {
      currentSplit = new SplitText(eyebrowElement, {
        type: "chars",
        charsClass: "char",
      });
    }

    const chars = currentSplit.chars;

    // Animate out (move up -100%)
    gsap.to(chars, {
      yPercent: -100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        // Revert the split to get back plain text
        currentSplit.revert();
        currentSplit = null;

        // Update to next phrase - replace spaces with span elements
        currentIndex = (currentIndex + 1) % phrases.length;
        const textWithSpaces = phrases[currentIndex].replace(
          / /g,
          '<span class="space"> </span>'
        );
        eyebrowElement.innerHTML = textWithSpaces;

        // Create fresh split for new text
        currentSplit = new SplitText(eyebrowElement, {
          type: "chars",
          charsClass: "char",
        });
        const newChars = currentSplit.chars;

        // Set initial state (below, hidden)
        gsap.set(newChars, { yPercent: 100, opacity: 0 });

        // Animate in (move to 0%)
        gsap.to(newChars, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            isAnimating = false;
          },
        });
      },
    });
  }

  // Start the cycling animation
  setInterval(animateTextChange, 2000);
})();

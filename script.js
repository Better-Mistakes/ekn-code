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

  // Initialize the first phrase with space spans
  function initializeText() {
    const textWithSpaces = phrases[currentIndex].replace(
      / /g,
      '<span class="space"> </span>'
    );
    eyebrowElement.innerHTML = textWithSpaces;

    // Create initial split
    currentSplit = new SplitText(eyebrowElement, {
      type: "chars",
      charsClass: "char",
    });
  }

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

    const oldChars = currentSplit.chars;

    // Animate out (move up -100%)
    gsap.to(oldChars, {
      yPercent: -100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.out",
    });

    // Prepare new text while old one is animating out
    // Create a temporary container for the new text
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.top = "0";
    tempDiv.style.left = "0";
    tempDiv.style.width = "100%";

    currentIndex = (currentIndex + 1) % phrases.length;
    const textWithSpaces = phrases[currentIndex].replace(
      / /g,
      '<span class="space"> </span>'
    );
    tempDiv.innerHTML = textWithSpaces;
    eyebrowElement.appendChild(tempDiv);

    // Split the new text
    const newSplit = new SplitText(tempDiv, {
      type: "chars",
      charsClass: "char",
    });
    const newChars = newSplit.chars;

    // Set initial state (below, hidden)
    gsap.set(newChars, { yPercent: 100, opacity: 0 });

    // Animate in simultaneously (move to 0%)
    gsap.to(newChars, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        // Clean up old split
        currentSplit.revert();

        // Replace eyebrow content with new text
        eyebrowElement.innerHTML = tempDiv.innerHTML;

        // Create new split for the next cycle
        currentSplit = new SplitText(eyebrowElement, {
          type: "chars",
          charsClass: "char",
        });

        isAnimating = false;

        // Wait 2 seconds before next animation
        setTimeout(animateTextChange, 2000);
      },
    });
  }

  // Initialize the text on load
  initializeText();

  // Start the cycling animation after 2 seconds
  setTimeout(animateTextChange, 2000);
})();

// --------------------- Hover Circle Follow Mouse --------------------- //
(function () {
  const gridTrusted = document.querySelector(".grid--trusted");

  if (!gridTrusted) return;

  const logoParents = gridTrusted.querySelectorAll(".trusted--logo-parent");

  logoParents.forEach((parent) => {
    const hoverCircle = parent.querySelector(".hover--circle");

    if (!hoverCircle) return;

    parent.addEventListener("mousemove", function (e) {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Center the circle on the cursor (subtract half the circle size)
      const circleSize = 10; // 10rem
      const offsetX =
        x -
        (circleSize / 2) *
          parseFloat(getComputedStyle(document.documentElement).fontSize);
      const offsetY =
        y -
        (circleSize / 2) *
          parseFloat(getComputedStyle(document.documentElement).fontSize);

      gsap.to(hoverCircle, {
        x: offsetX,
        y: offsetY,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    parent.addEventListener("mouseenter", function () {
      gsap.to(hoverCircle, {
        opacity: 0.3,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    parent.addEventListener("mouseleave", function () {
      gsap.to(hoverCircle, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
})();

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

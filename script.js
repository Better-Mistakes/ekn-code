// --------------------- Loading Animation --------------------- //
// Fade in main-wrapper after page fully loads
$(window).on("load", function () {
  $("body").animate({ opacity: 1 }, 200);
});

// --------------------- Navbar Dropdown Animation (Desktop) --------------------- //
(function () {
  const navbar = document.querySelector(".navbar");
  const navbarBg = document.querySelector(".navbar--bg");
  const dropdowns = document.querySelectorAll(".navbar--dropdown");

  if (!navbar || dropdowns.length === 0) return;

  let activeDropdown = null;

  // Initialize all dropdown lists and items (desktop only)
  function initDesktopDropdowns() {
    if (window.innerWidth < 992) return;

    dropdowns.forEach((dropdown) => {
      const list = dropdown.querySelector(".navbar--dropdown-list");
      const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
      const line = trigger ? trigger.querySelector(".dropdown--line") : null;

      if (list) {
        gsap.set(list, {
          display: "none",
          height: 0,
          overflow: "hidden",
        });

        // Initialize dropdown items
        const items = list.querySelectorAll('[animate="dropdownnav"]');
        gsap.set(items, {
          opacity: 0,
          y: "1rem",
        });
      }

      // Initialize line
      if (line) {
        gsap.set(line, { width: "0%" });
      }
    });
  }

  // Function to close a dropdown
  function closeDropdown(dropdown) {
    const list = dropdown.querySelector(".navbar--dropdown-list");
    const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
    const line = trigger ? trigger.querySelector(".dropdown--line") : null;

    if (!list) return;

    gsap.to(list, {
      height: 0,
      duration: 0.3,
      ease: "power4.out",
      onComplete: () => {
        gsap.set(list, { display: "none" });
      },
    });

    // Revert trigger color
    if (trigger) {
      gsap.to(trigger, {
        color: "",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    // Animate line out
    if (line) {
      gsap.to(line, {
        width: "0%",
        duration: 0.3,
        ease: "power4.out",
      });
    }
  }

  // Function to open a dropdown
  function openDropdown(dropdown, animate = false) {
    const list = dropdown.querySelector(".navbar--dropdown-list");
    const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
    const line = trigger ? trigger.querySelector(".dropdown--line") : null;

    if (!list) return;

    // First set display to flex with height 0
    gsap.set(list, { display: "flex", height: 0 });

    // Then animate height to auto
    gsap.to(list, {
      height: "auto",
      duration: 0.3,
      ease: "power4.out",
    });

    // Animate dropdown items with stagger if requested
    if (animate) {
      const items = list.querySelectorAll('[animate="dropdownnav"]');
      gsap.to(items, {
        opacity: 1,
        y: "0rem",
        duration: 0.4,
        ease: "power4.out",
        stagger: 0.05,
      });
    }

    // Animate trigger color
    if (trigger) {
      gsap.to(trigger, {
        color: "#0133F6",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    // Animate line in
    if (line) {
      gsap.to(line, {
        width: "100%",
        duration: 0.3,
        ease: "power4.out",
      });
    }
  }

  // Function to reset dropdown items
  function resetDropdownItems(dropdown) {
    const list = dropdown.querySelector(".navbar--dropdown-list");
    if (!list) return;

    const items = list.querySelectorAll('[animate="dropdownnav"]');
    gsap.set(items, {
      opacity: 0,
      y: "1rem",
    });
  }

  // Function to activate navbar style
  function activateNavbarStyle() {
    const navButtons = navbar.querySelectorAll(".btn.is--nav");

    if (navbarBg) {
      gsap.to(navbarBg, {
        backgroundColor: "#F2F3F6",
        borderBottomColor: "#F2F3F6",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    gsap.to(navbar, {
      color: "#040A44",
      duration: 0.3,
      ease: "power4.out",
    });

    navButtons.forEach((btn) => {
      gsap.to(btn, {
        backgroundColor: "#040A44",
        color: "#F2F3F6",
        duration: 0.3,
        ease: "power4.out",
      });
    });
  }

  // Function to deactivate navbar style
  function deactivateNavbarStyle() {
    const navButtons = navbar.querySelectorAll(".btn.is--nav");

    if (navbarBg) {
      gsap.to(navbarBg, {
        backgroundColor: "", // Reset to original
        borderBottomColor: "",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    gsap.to(navbar, {
      color: "", // Reset to original
      duration: 0.3,
      ease: "power4.out",
    });

    navButtons.forEach((btn) => {
      gsap.to(btn, {
        backgroundColor: "",
        color: "",
        duration: 0.3,
        ease: "power4.out",
      });
    });
  }

  // Add hover listeners to each dropdown (desktop only)
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
    if (!trigger) return;

    // Mouseenter on trigger
    trigger.addEventListener("mouseenter", function () {
      // Only work on desktop screens
      if (window.innerWidth < 992) return;

      const isNewDropdown = activeDropdown !== dropdown;
      const isFirstOpen = activeDropdown === null;

      // Close previously active dropdown if it exists
      if (activeDropdown && activeDropdown !== dropdown) {
        closeDropdown(activeDropdown);
        resetDropdownItems(activeDropdown);
      }

      // Open current dropdown (with animation only if it's the first open or a new dropdown)
      openDropdown(dropdown, isFirstOpen || isNewDropdown);
      activateNavbarStyle();
      activeDropdown = dropdown;
    });

    // Mouseleave on the entire dropdown element
    dropdown.addEventListener("mouseleave", function () {
      // Only work on desktop screens
      if (window.innerWidth < 992) return;

      // Only close if this is the active dropdown
      if (activeDropdown === dropdown) {
        closeDropdown(activeDropdown);
        resetDropdownItems(activeDropdown);
        activeDropdown = null;
        deactivateNavbarStyle();
      }
    });
  });

  // Add hover listeners to .navlink elements (desktop only)
  const navlinks = navbar.querySelectorAll(".navlink");
  navlinks.forEach((navlink) => {
    navlink.addEventListener("mouseenter", function () {
      // Only work on desktop screens
      if (window.innerWidth < 992) return;

      // Close active dropdown if hovering over a navlink
      if (activeDropdown) {
        closeDropdown(activeDropdown);
        resetDropdownItems(activeDropdown);
        activeDropdown = null;
        deactivateNavbarStyle();
      }
    });
  });

  // Close dropdown when hovering out of navbar (desktop only)
  navbar.addEventListener("mouseleave", function () {
    // Only work on desktop screens
    if (window.innerWidth < 992) return;

    if (activeDropdown) {
      closeDropdown(activeDropdown);
      // Reset items when fully leaving navbar
      resetDropdownItems(activeDropdown);
      activeDropdown = null;
    }
    deactivateNavbarStyle();
  });

  // Initialize on load
  initDesktopDropdowns();

  // Reinitialize on resize
  let wasDesktop = window.innerWidth >= 992;
  window.addEventListener("resize", function () {
    const isDesktop = window.innerWidth >= 992;

    if (isDesktop !== wasDesktop) {
      wasDesktop = isDesktop;

      if (isDesktop) {
        initDesktopDropdowns();
        activeDropdown = null;
      } else {
        // Reset on mobile
        dropdowns.forEach((dropdown) => {
          const list = dropdown.querySelector(".navbar--dropdown-list");
          const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
          const line = trigger
            ? trigger.querySelector(".dropdown--line")
            : null;

          if (list) {
            gsap.set(list, { display: "", height: "", overflow: "" });
            const items = list.querySelectorAll('[animate="dropdownnav"]');
            gsap.set(items, { opacity: "", y: "" });
          }
          if (trigger) {
            gsap.set(trigger, { color: "" });
          }
          if (line) {
            gsap.set(line, { width: "" });
          }
        });
        activeDropdown = null;
      }
    }
  });
})();

// --------------------- Mobile Navbar Dropdown Animation --------------------- //
(function () {
  const dropdowns = document.querySelectorAll(".navbar--dropdown");

  if (dropdowns.length === 0) return;

  let activeDropdown = null;
  let activeCloseFunction = null;

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
    const list = dropdown.querySelector(".navbar--dropdown-list");
    const bg = dropdown.querySelector(".navbar--dropdown-bg");
    const goBack = list ? list.querySelector(".navbar--goback") : null;

    if (!trigger || !list) return;

    // Initialize on mobile
    function initMobileDropdown() {
      if (window.innerWidth >= 992) return;
      gsap.set(list, { display: "none", x: "100vw" });
      if (bg) {
        gsap.set(bg, { opacity: 0 });
      }
    }

    // Open dropdown
    function openDropdown() {
      gsap.set(list, { display: "flex", x: "100vw" });
      gsap.to(list, {
        x: "0vw",
        duration: 0.5,
        ease: "power4.out",
      });

      // Animate background
      if (bg) {
        gsap.to(bg, {
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
        });
      }

      // Track active dropdown
      activeDropdown = dropdown;
      activeCloseFunction = closeDropdown;
    }

    // Close dropdown
    function closeDropdown() {
      gsap.to(list, {
        x: "100vw",
        duration: 0.5,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(list, { display: "none" });
        },
      });

      // Animate background out
      if (bg) {
        gsap.to(bg, {
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
        });
      }

      // Clear active dropdown
      if (activeDropdown === dropdown) {
        activeDropdown = null;
        activeCloseFunction = null;
      }
    }

    // Trigger click handler (mobile only)
    trigger.addEventListener("click", function (e) {
      if (window.innerWidth >= 992) return;
      e.preventDefault();
      e.stopPropagation();
      openDropdown();
    });

    // Go back button handler
    if (goBack) {
      goBack.addEventListener("click", function (e) {
        if (window.innerWidth >= 992) return;
        e.preventDefault();
        e.stopPropagation();
        closeDropdown();
      });
    }

    // Initialize
    initMobileDropdown();

    // Reinitialize on resize
    let wasMobile = window.innerWidth < 992;
    window.addEventListener("resize", function () {
      const isMobile = window.innerWidth < 992;

      if (isMobile !== wasMobile) {
        wasMobile = isMobile;

        if (isMobile) {
          initMobileDropdown();
        } else {
          // Reset on desktop
          gsap.set(list, { display: "", x: "0vw" });
          if (bg) {
            gsap.set(bg, { opacity: "" });
          }
        }
      }
    });
  });

  // Expose function to close active dropdown
  window.closeMobileDropdown = function () {
    if (activeCloseFunction) {
      activeCloseFunction();
    }
  };
})();

// --------------------- Navbar Solution Items Hover (Desktop) --------------------- //
(function () {
  // Only run on screens above 992px
  if (window.innerWidth <= 992) return;

  const solutionItems = document.querySelectorAll(".navbar--solution-item");

  if (solutionItems.length === 0) return;

  // Find the parent container of all solution items
  const parentContainer = solutionItems[0].parentElement;

  if (!parentContainer) return;

  // Initialize all items
  solutionItems.forEach((item) => {
    const svgItem = item.querySelector(".solution--svg-item");
    const paragraph = item.querySelector(".paragraph-small-130");

    if (svgItem) {
      gsap.set(svgItem, { opacity: 0 });
    }
    if (paragraph) {
      gsap.set(paragraph, { opacity: 1 });
    }
  });

  // Track the currently hovered item
  let currentlyHovered = null;

  // Add mouseenter listeners to each item
  solutionItems.forEach((currentItem) => {
    const currentSvg = currentItem.querySelector(".solution--svg-item");
    const currentParagraph = currentItem.querySelector(".paragraph-small-130");

    currentItem.addEventListener("mouseenter", function () {
      // If there was a previously hovered item, reset it
      if (currentlyHovered && currentlyHovered !== currentItem) {
        const prevSvg = currentlyHovered.querySelector(".solution--svg-item");
        const prevParagraph = currentlyHovered.querySelector(
          ".paragraph-small-130"
        );

        if (prevSvg) {
          gsap.to(prevSvg, {
            opacity: 0,
            duration: 0.3,
            ease: "power4.out",
          });
        }

        if (prevParagraph) {
          gsap.to(prevParagraph, {
            opacity: 1,
            duration: 0.3,
            ease: "power4.out",
          });
        }
      }

      // Fade out other items and reset current item to full opacity
      solutionItems.forEach((item) => {
        if (item !== currentItem) {
          gsap.to(item, {
            opacity: 0.3,
            duration: 0.3,
            ease: "power4.out",
          });
        } else {
          gsap.to(item, {
            opacity: 1,
            duration: 0.3,
            ease: "power4.out",
          });
        }
      });

      // Show SVG and hide paragraph for current item
      if (currentSvg) {
        gsap.to(currentSvg, {
          opacity: 1,
          duration: 0.3,
          ease: "power4.out",
        });
      }

      if (currentParagraph) {
        gsap.to(currentParagraph, {
          opacity: 0,
          duration: 0.3,
          ease: "power4.out",
        });
      }

      currentlyHovered = currentItem;
    });
  });

  // Add mouseleave to the parent container, not individual items
  parentContainer.addEventListener("mouseleave", function () {
    // Reset all items opacity
    solutionItems.forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        duration: 0.3,
        ease: "power4.out",
      });

      const svgItem = item.querySelector(".solution--svg-item");
      const paragraph = item.querySelector(".paragraph-small-130");

      if (svgItem) {
        gsap.to(svgItem, {
          opacity: 0,
          duration: 0.3,
          ease: "power4.out",
        });
      }

      if (paragraph) {
        gsap.to(paragraph, {
          opacity: 1,
          duration: 0.3,
          ease: "power4.out",
        });
      }
    });

    currentlyHovered = null;
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 992) {
      // Reset everything on mobile
      solutionItems.forEach((item) => {
        gsap.set(item, { opacity: 1 });
        const svgItem = item.querySelector(".solution--svg-item");
        const paragraph = item.querySelector(".paragraph-small-130");
        if (svgItem) gsap.set(svgItem, { opacity: 0 });
        if (paragraph) gsap.set(paragraph, { opacity: 1 });
      });
      currentlyHovered = null;
    }
  });
})();

// --------------------- Resource Links Hover (Desktop) --------------------- //
(function () {
  // Only run on screens above 992px
  if (window.innerWidth <= 992) return;

  const resourceLinks = document.querySelectorAll(".resource--link");

  if (resourceLinks.length === 0) return;

  // Find the parent container of all resource links
  const parentContainer = resourceLinks[0].parentElement;

  if (!parentContainer) return;

  // Initialize all items
  resourceLinks.forEach((link) => {
    const svg = link.querySelector(".resource--link-svg");
    if (svg) {
      gsap.set(svg, { opacity: 0 });
    }
  });

  // Track the currently hovered link
  let currentlyHovered = null;

  // Add mouseenter listeners to each link
  resourceLinks.forEach((currentLink) => {
    const currentSvg = currentLink.querySelector(".resource--link-svg");

    currentLink.addEventListener("mouseenter", function () {
      // If there was a previously hovered link, reset it
      if (currentlyHovered && currentlyHovered !== currentLink) {
        const prevSvg = currentlyHovered.querySelector(".resource--link-svg");

        if (prevSvg) {
          gsap.to(prevSvg, {
            opacity: 0,
            duration: 0.3,
            ease: "power4.out",
          });
        }
      }

      // Fade out other links and reset current link to full opacity
      resourceLinks.forEach((link) => {
        if (link !== currentLink) {
          gsap.to(link, {
            opacity: 0.3,
            duration: 0.3,
            ease: "power4.out",
          });
        } else {
          gsap.to(link, {
            opacity: 1,
            duration: 0.3,
            ease: "power4.out",
          });
        }
      });

      // Show SVG for current link
      if (currentSvg) {
        gsap.to(currentSvg, {
          opacity: 1,
          duration: 0.3,
          ease: "power4.out",
        });
      }

      currentlyHovered = currentLink;
    });
  });

  // Add mouseleave to the parent container, not individual links
  parentContainer.addEventListener("mouseleave", function () {
    // Reset all links opacity
    resourceLinks.forEach((link) => {
      gsap.to(link, {
        opacity: 1,
        duration: 0.3,
        ease: "power4.out",
      });

      const svg = link.querySelector(".resource--link-svg");

      if (svg) {
        gsap.to(svg, {
          opacity: 0,
          duration: 0.3,
          ease: "power4.out",
        });
      }
    });

    currentlyHovered = null;
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 992) {
      // Reset everything on mobile
      resourceLinks.forEach((link) => {
        gsap.set(link, { opacity: 1 });
        const svg = link.querySelector(".resource--link-svg");
        if (svg) gsap.set(svg, { opacity: 0 });
      });
      currentlyHovered = null;
    }
  });
})();

// --------------------- Mobile Hamburger Menu Animation --------------------- //
(function () {
  const menuTrigger = document.querySelector(".menu--trigger");
  const menuOpen = document.querySelector(".menu--open");
  const menuClose = document.querySelector(".menu--close");
  const menuInner = document.querySelector(".navbar-menu--inner");
  const navbar = document.querySelector(".navbar");
  const navbarBg = document.querySelector(".navbar--bg");

  if (!menuTrigger || !menuOpen || !menuClose || !menuInner || !navbar) {
    console.log("Mobile menu elements not found:", {
      menuTrigger: !!menuTrigger,
      menuOpen: !!menuOpen,
      menuClose: !!menuClose,
      menuInner: !!menuInner,
      navbar: !!navbar,
      navbarBg: !!navbarBg,
    });
    return;
  }

  console.log("Mobile menu initialized");
  let isMenuOpen = false;

  // Initialize menu elements
  function initializeMobileMenu() {
    if (window.innerWidth >= 992) return;

    gsap.set(menuClose, { opacity: 0 });
    gsap.set(menuInner, { display: "none", x: "100vw" });

    const menuItems = menuInner.querySelectorAll('[animate="navbar"]');
    gsap.set(menuItems, { opacity: 0, y: "1rem" });
  }

  // Open menu
  function openMenu() {
    const menuItems = menuInner.querySelectorAll('[animate="navbar"]');
    const navButtons = navbar.querySelectorAll(".btn.is--nav");

    // Disable scroll
    document.body.style.overflow = "hidden";

    // Animate menu open icon
    gsap.to(menuOpen, {
      opacity: 0,
      duration: 0.3,
      ease: "power4.out",
    });

    // Animate menu close icon
    gsap.to(menuClose, {
      opacity: 1,
      duration: 0.3,
      ease: "power4.out",
    });

    // Set display to flex and animate from right
    gsap.set(menuInner, { display: "flex", x: "100vw" });
    gsap.to(menuInner, {
      x: "0vw",
      duration: 0.5,
      ease: "power4.out",
    });

    // Stagger animate menu items
    gsap.to(menuItems, {
      opacity: 1,
      y: "0rem",
      duration: 0.4,
      ease: "power4.out",
      stagger: 0.05,
      delay: 0.2,
    });

    // Animate navbar color
    gsap.to(navbar, {
      color: "#040a44",
      duration: 0.3,
      ease: "power4.out",
    });

    // Animate navbar background
    if (navbarBg) {
      gsap.to(navbarBg, {
        backgroundColor: "rgba(242, 243, 246, 0.6)",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    // Animate nav buttons
    navButtons.forEach((btn) => {
      gsap.to(btn, {
        backgroundColor: "#040a44",
        color: "#f2f3f6",
        duration: 0.3,
        ease: "power4.out",
      });
    });

    isMenuOpen = true;
  }

  // Close menu
  function closeMenu() {
    const menuItems = menuInner.querySelectorAll('[animate="navbar"]');
    const navButtons = navbar.querySelectorAll(".btn.is--nav");

    // Re-enable scroll
    document.body.style.overflow = "";

    // Animate menu close icon
    gsap.to(menuClose, {
      opacity: 0,
      duration: 0.3,
      ease: "power4.out",
    });

    // Animate menu open icon
    gsap.to(menuOpen, {
      opacity: 1,
      duration: 0.3,
      ease: "power4.out",
    });

    // Animate menu out
    gsap.to(menuInner, {
      x: "100vw",
      duration: 0.5,
      ease: "power4.out",
      onComplete: () => {
        gsap.set(menuInner, { display: "none" });
      },
    });

    // Reset menu items
    gsap.set(menuItems, { opacity: 0, y: "1rem" });

    // Revert navbar color
    gsap.to(navbar, {
      color: "",
      duration: 0.3,
      ease: "power4.out",
    });

    // Revert navbar background
    if (navbarBg) {
      gsap.to(navbarBg, {
        backgroundColor: "",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    // Revert nav buttons
    navButtons.forEach((btn) => {
      gsap.to(btn, {
        backgroundColor: "",
        color: "",
        duration: 0.3,
        ease: "power4.out",
      });
    });

    isMenuOpen = false;
  }

  // Click handler
  menuTrigger.addEventListener("click", function () {
    console.log("Menu trigger clicked, screen width:", window.innerWidth);

    // Only work on mobile screens
    if (window.innerWidth >= 992) {
      console.log("Screen too wide for mobile menu");
      return;
    }

    // Close any open dropdown first
    if (typeof window.closeMobileDropdown === "function") {
      window.closeMobileDropdown();
    }

    if (isMenuOpen) {
      console.log("Closing menu");
      closeMenu();
    } else {
      console.log("Opening menu");
      openMenu();
    }
  });

  // Initialize on load
  initializeMobileMenu();

  // Reinitialize on resize
  let wasMobile = window.innerWidth < 992;
  window.addEventListener("resize", function () {
    const isMobile = window.innerWidth < 992;

    if (isMobile !== wasMobile) {
      wasMobile = isMobile;

      if (isMobile) {
        initializeMobileMenu();
        isMenuOpen = false;
      } else {
        // Reset everything on desktop
        gsap.set(menuOpen, { opacity: 1 });
        gsap.set(menuClose, { opacity: 0 });
        gsap.set(menuInner, { display: "", x: "0vw" });
        const menuItems = menuInner.querySelectorAll('[animate="navbar"]');
        gsap.set(menuItems, { opacity: 1, y: "0rem" });
        document.body.style.overflow = ""; // Re-enable scroll on desktop
        isMenuOpen = false;
      }
    }
  });
})();

// --------------------- Navbar Scroll Behavior --------------------- //
(function () {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let isScrollingDown = false;
  const scrollThreshold = window.innerHeight * 0.25; // 25vh

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;
    isScrollingDown = currentScrollY > lastScrollY;

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

  // Handle .hover--circle.is--100 inside .lines
  const lines = gridTrusted.querySelectorAll(".lines");

  lines.forEach((line) => {
    const hoverCircle = line.querySelector(".hover--circle.is--100");

    if (!hoverCircle) return;

    // Initially hide the circle
    gsap.set(hoverCircle, { opacity: 0 });
  });

  // Track mouse movement on the entire grid--trusted area
  gridTrusted.addEventListener("mousemove", function (e) {
    lines.forEach((line) => {
      const hoverCircle = line.querySelector(".hover--circle.is--100");

      if (!hoverCircle) return;

      const rect = line.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Center the circle on the cursor
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
  });

  gridTrusted.addEventListener("mouseenter", function () {
    lines.forEach((line) => {
      const hoverCircle = line.querySelector(".hover--circle.is--100");
      if (hoverCircle) {
        gsap.to(hoverCircle, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });

  gridTrusted.addEventListener("mouseleave", function () {
    lines.forEach((line) => {
      const hoverCircle = line.querySelector(".hover--circle.is--100");
      if (hoverCircle) {
        gsap.to(hoverCircle, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });
})();

// --------------------- Offer Slide Hover Animation (Desktop) --------------------- //
(function () {
  let swiperInstance = null;

  // Desktop hover functionality
  function initOfferSlides() {
    if (window.innerWidth <= 992) return;

    const offerSlides = document.querySelectorAll(".offer--slide");
    if (offerSlides.length === 0) return;

    let activeSlide = null;

    // Function to set a slide as inactive
    function setInactive(slide) {
      const icon = slide.querySelector(".offer--slide-icon");
      const content = slide.querySelector(".offer--slide-content");

      gsap.to(slide, {
        opacity: 0.3,
        duration: 0.2,
        ease: "power2.out",
      });

      if (icon) {
        gsap.to(icon, {
          x: "-1rem",
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      if (content) {
        gsap.to(content, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    }

    // Function to set a slide as active
    function setActive(slide) {
      const icon = slide.querySelector(".offer--slide-icon");
      const content = slide.querySelector(".offer--slide-content");

      gsap.to(slide, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });

      if (icon) {
        gsap.to(icon, {
          x: "0rem",
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      if (content) {
        gsap.to(content, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      activeSlide = slide;
    }

    // Initialize all slides as inactive
    offerSlides.forEach((slide) => {
      const icon = slide.querySelector(".offer--slide-icon");
      const content = slide.querySelector(".offer--slide-content");

      gsap.set(slide, { opacity: 0.3 });
      if (icon) gsap.set(icon, { x: "-1rem", opacity: 0 });
      if (content) gsap.set(content, { opacity: 0 });
    });

    // Set first slide as active on load
    if (offerSlides[0]) {
      setActive(offerSlides[0]);
    }

    // Add hover listeners
    offerSlides.forEach((slide) => {
      slide.addEventListener("mouseenter", function () {
        // If there's an active slide that's not this one, deactivate it
        if (activeSlide && activeSlide !== slide) {
          setInactive(activeSlide);
        }

        // Activate this slide
        setActive(slide);
      });
    });
  }

  // Mobile slider functionality
  function initOfferSlider() {
    if (window.innerWidth > 992) return;

    const slider = document.querySelector(".offers-slider");
    if (!slider) return;

    // Check if Swiper is available
    if (typeof Swiper === "undefined") {
      console.error("Swiper is not loaded");
      return;
    }

    // Destroy existing instance if it exists
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    // Initialize Swiper
    swiperInstance = new Swiper(".offers-slider", {
      slidesPerView: "auto",
      spaceBetween:
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.25, // 1.25rem
      navigation: {
        nextEl: ".offer-slider-btn.is--next",
        prevEl: ".offer-slider-btn.is--prev",
        disabledClass: "swiper-button-disabled",
      },
      on: {
        init: function () {
          updateSlideNumbers(this);
          updateSliderMargins(this);
        },
        slideChange: function () {
          updateSlideNumbers(this);
          updateSliderMargins(this);
        },
      },
    });

    // Function to update slider margins based on active slide
    function updateSliderMargins(swiper) {
      const sliderEl = document.querySelector(".offers-slider");
      if (!sliderEl) return;

      const isFirstSlide = swiper.activeIndex === 0;
      const isLastSlide = swiper.activeIndex === swiper.slides.length - 1;

      // Remove all classes first
      sliderEl.classList.remove("is--first", "is--middle", "is--last");

      if (isFirstSlide) {
        sliderEl.classList.add("is--first");
      } else if (isLastSlide) {
        sliderEl.classList.add("is--last");
      } else {
        sliderEl.classList.add("is--middle");
      }
    }
  }

  function updateSlideNumbers(swiper) {
    const currentSlideNumber = document.querySelector(
      ".slide--number:first-child"
    );
    const totalSlideNumber = document.querySelector(
      ".slide--number:last-child"
    );

    if (currentSlideNumber) {
      currentSlideNumber.textContent = swiper.activeIndex + 1;
    }

    if (totalSlideNumber) {
      totalSlideNumber.textContent = swiper.slides.length;
    }
  }

  // Initialize on load
  const isDesktop = window.innerWidth > 992;
  if (isDesktop) {
    initOfferSlides();
  } else {
    initOfferSlider();
  }

  // Reinitialize on resize if crossing the 992px threshold
  let wasDesktop = isDesktop;
  window.addEventListener("resize", function () {
    const isDesktop = window.innerWidth > 992;
    if (isDesktop !== wasDesktop) {
      wasDesktop = isDesktop;
      if (isDesktop) {
        // Destroy slider and init desktop
        if (swiperInstance) {
          swiperInstance.destroy(true, true);
          swiperInstance = null;
        }
        initOfferSlides();
      } else {
        // Init mobile slider
        initOfferSlider();
      }
    }
  });
})();

// --------------------- How It Works Scroll Animation --------------------- //
(function () {
  // Only run on screens above 992px
  if (window.innerWidth <= 992) return;

  const triggersParent = document.querySelector(".howitworks--triggers-parent");
  const triggers = document.querySelectorAll(".howitworks--trigger");
  const parents = document.querySelectorAll(".howitworks--parent");

  if (!triggersParent || triggers.length === 0 || parents.length === 0) return;

  // Initialize all content and response to inactive state
  parents.forEach((parent) => {
    const content = parent.querySelector(".howitworks--content");
    const response = parent.querySelector(".howitworks--response");
    const line = parent.querySelector(".howitworks--line");

    if (content) gsap.set(content, { opacity: 0.3 });
    if (response) gsap.set(response, { height: 0, overflow: "hidden" });
    if (line) gsap.set(line, { width: "0%" });
  });

  // Set initial positions for images using yPercent and y separately
  const initialYPercent = [0, 100, 200];
  const initialYRem = [0, 3, 6];
  const finalYPercent = [-200, -100, 0];
  const finalYRem = [-6, -3, 0];

  parents.forEach((parent, index) => {
    const img = parent.querySelector(".howitworks--img");
    if (img) {
      const remInPx =
        initialYRem[index] *
        parseFloat(getComputedStyle(document.documentElement).fontSize);
      gsap.set(img, {
        yPercent: initialYPercent[index],
        y: remInPx,
      });
    }
  });

  // Animate all images based on the parent scroll
  parents.forEach((parent, index) => {
    const img = parent.querySelector(".howitworks--img");
    if (img) {
      const remInPx =
        finalYRem[index] *
        parseFloat(getComputedStyle(document.documentElement).fontSize);
      gsap.to(img, {
        yPercent: finalYPercent[index],
        y: remInPx,
        ease: "none",
        scrollTrigger: {
          trigger: triggersParent,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    // Initialize inner images
    const imgInner = parent.querySelector(".howitworks--img--inner");
    if (imgInner) {
      gsap.set(imgInner, { yPercent: 0, filter: "blur(10rem)" });
    }
  });

  triggers.forEach((trigger, index) => {
    const parent = parents[index];
    if (!parent) return;

    const content = parent.querySelector(".howitworks--content");
    const response = parent.querySelector(".howitworks--response");
    const line = parent.querySelector(".howitworks--line");

    // Timeline for activating this section
    const activateTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top bottom",
        onEnter: () => {
          // Deactivate previous parent
          if (index > 0 && parents[index - 1]) {
            const prevContent = parents[index - 1].querySelector(
              ".howitworks--content"
            );
            const prevResponse = parents[index - 1].querySelector(
              ".howitworks--response"
            );

            if (prevContent) {
              gsap.to(prevContent, {
                opacity: 0.3,
                duration: 0.4,
                ease: "power2.out",
              });
            }
            if (prevResponse) {
              gsap.to(prevResponse, {
                height: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          }

          // Activate current parent
          if (content) {
            gsap.to(content, {
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          }
          if (response) {
            gsap.to(response, {
              height: "auto",
              duration: 0.4,
              ease: "power2.out",
            });
          }
        },
        onLeaveBack: () => {
          // When scrolling back up, deactivate current and reactivate previous
          if (content) {
            gsap.to(content, {
              opacity: 0.3,
              duration: 0.4,
              ease: "power2.out",
            });
          }
          if (response) {
            gsap.to(response, {
              height: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          }

          // Reactivate previous
          if (index > 0 && parents[index - 1]) {
            const prevContent = parents[index - 1].querySelector(
              ".howitworks--content"
            );
            const prevResponse = parents[index - 1].querySelector(
              ".howitworks--response"
            );

            if (prevContent) {
              gsap.to(prevContent, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            }
            if (prevResponse) {
              gsap.to(prevResponse, {
                height: "auto",
                duration: 0.4,
                ease: "power2.out",
              });
            }
          }
        },
      },
    });

    // Separate ScrollTrigger for the line animation
    if (line) {
      gsap.to(line, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }
  });

  // Animate inner images with specific triggers for each parent
  const section = document.querySelector(".section.is--howworks");

  parents.forEach((parent, index) => {
    const imgInner = parent.querySelector(".howitworks--img--inner");
    if (!imgInner) return;

    if (index === 0) {
      // First parent: trigger is .section.is--howworks
      gsap.to(imgInner, {
        yPercent: -10,
        filter: "blur(0rem)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });
    } else if (index === 1) {
      // Second parent: trigger is .howitworks--triggers-parent
      // top bottom -> top center: blur 10rem to 0rem
      gsap.to(imgInner, {
        yPercent: -10,
        filter: "blur(0rem)",
        ease: "none",
        scrollTrigger: {
          trigger: triggersParent,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });
    } else if (index === 2) {
      // Third parent: trigger is .howitworks--triggers-parent
      // center bottom -> bottom bottom: blur 10rem to 0rem
      gsap.to(imgInner, {
        yPercent: -10,
        filter: "blur(0rem)",
        ease: "none",
        scrollTrigger: {
          trigger: triggersParent,
          start: "center bottom",
          end: "center center",
          scrub: true,
        },
      });
    }
  });
})();

// --------------------- What Offers Hover Circle --------------------- //
(function () {
  const section = document.querySelector(".section.is--whatoffers");
  const container = document.querySelector(".relative.is--whatworks");
  const hoverCircle = document.querySelector(".hover--circle.is--what");

  if (!section || !container || !hoverCircle) return;

  // Initialize circle as hidden
  gsap.set(hoverCircle, { opacity: 0 });

  let mouseX = 0;
  let mouseY = 0;

  section.addEventListener("mousemove", function (e) {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  section.addEventListener("mouseenter", function () {
    gsap.to(hoverCircle, {
      opacity: 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  section.addEventListener("mouseleave", function () {
    gsap.to(hoverCircle, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  // Smooth follow animation with delay
  gsap.ticker.add(() => {
    gsap.to(hoverCircle, {
      x: mouseX,
      y: mouseY,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
})();

// --------------------- Number Counter Animation --------------------- //
(function () {
  console.log("Number counter script running...");
  const numberCounters = document.querySelectorAll(".number--count");
  console.log("Found counters:", numberCounters.length);

  if (numberCounters.length === 0) {
    console.log("No .number--count elements found");
    return;
  }

  // Check if ScrollTrigger is available
  if (typeof ScrollTrigger === "undefined") {
    console.error("ScrollTrigger is not loaded");
    return;
  }

  console.log("ScrollTrigger is available");

  numberCounters.forEach((counter, idx) => {
    const originalText = counter.textContent.trim();
    console.log(`Counter ${idx}: "${originalText}"`);
    const targetNumber = parseInt(originalText);
    const digitCount = originalText.length;

    if (isNaN(targetNumber)) {
      console.log(`Counter ${idx} is NaN, skipping`);
      return;
    }

    // Store original content and setup
    counter.setAttribute("data-target", targetNumber);
    const targetString = targetNumber.toString().padStart(digitCount, "0");

    // Build the HTML structure with digit wrappers
    let html = "";
    for (let i = 0; i < digitCount; i++) {
      const targetDigit = parseInt(targetString[i]);
      let columnHTML = "";

      // Always create 10 digits, starting from appropriate position
      // If target is 9, start from 0; if 8, start from 9; if 7, start from 8, etc.
      const startDigit = (targetDigit + 1) % 10;

      for (let j = 0; j < 10; j++) {
        const digit = (startDigit + j) % 10;
        columnHTML += `<span class="digit-item">${digit}</span>`;
      }

      html += `<span class="digit-wrapper"><span class="digit-column">${columnHTML}</span></span>`;
    }

    counter.innerHTML = html;

    // Create ScrollTrigger for this counter
    ScrollTrigger.create({
      trigger: counter,
      start: "top bottom",
      once: true,
      onEnter: () => {
        const columns = counter.querySelectorAll(".digit-column");

        columns.forEach((column, index) => {
          // Always animate 9 steps (to reach the 10th digit which is the target)
          gsap.fromTo(
            column,
            { y: "0em" },
            {
              y: "-9em",
              duration: 2,
              ease: "power2.out",
              delay: 0.4 + index * 0.1,
            }
          );
        });
      },
    });
  });
})();

// --------------------- Footer Accordion (Mobile) --------------------- //
(function () {
  function initFooterAccordion() {
    // Only run on screens below 992px
    if (window.innerWidth >= 992) return;

    const titleParents = document.querySelectorAll(".footer--title-parent");
    if (titleParents.length === 0) return;

    let activeParent = null;

    titleParents.forEach((titleParent) => {
      const column = titleParent.closest(".footer--column");
      if (!column) return;

      const inner = column.querySelector(".footer--inner");
      const icon = titleParent.querySelector(".footer-title-icon");

      if (!inner) return;

      // Initialize as closed
      gsap.set(inner, { height: 0, overflow: "hidden" });
      if (icon) gsap.set(icon, { rotation: 0 });

      // Click handler
      titleParent.addEventListener("click", () => {
        const isActive = activeParent === titleParent;

        // Close previously active item
        if (activeParent && activeParent !== titleParent) {
          const prevColumn = activeParent.closest(".footer--column");
          const prevInner = prevColumn.querySelector(".footer--inner");
          const prevIcon = activeParent.querySelector(".footer-title-icon");

          gsap.to(prevInner, {
            height: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          if (prevIcon) {
            gsap.to(prevIcon, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }

        // Toggle current item
        if (isActive) {
          // Close if already active
          gsap.to(inner, {
            height: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          if (icon) {
            gsap.to(icon, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          activeParent = null;
        } else {
          // Open
          gsap.to(inner, {
            height: "auto",
            duration: 0.3,
            ease: "power2.out",
          });

          if (icon) {
            gsap.to(icon, {
              rotation: 180,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          activeParent = titleParent;
        }
      });
    });
  }

  // Initialize on load
  initFooterAccordion();

  // Reinitialize on resize
  let wasMobile = window.innerWidth < 992;
  window.addEventListener("resize", () => {
    const isMobile = window.innerWidth < 992;
    if (isMobile !== wasMobile) {
      wasMobile = isMobile;

      if (isMobile) {
        initFooterAccordion();
      } else {
        // Reset all on desktop
        const footerInners = document.querySelectorAll(".footer--inner");
        const footerIcons = document.querySelectorAll(".footer-title-icon");

        footerInners.forEach((inner) => {
          gsap.set(inner, { height: "auto", overflow: "visible" });
        });

        footerIcons.forEach((icon) => {
          gsap.set(icon, { rotation: 0 });
        });
      }
    }
  });
})();

// --------------------- Button Hover Animation --------------------- //
(function () {
  const buttons = document.querySelectorAll(".btn");

  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    const hoverClose = btn.querySelector(".hover--close");
    const hoverOpen = btn.querySelector(".hover--open");

    if (!hoverClose || !hoverOpen) return;

    // Initialize states
    gsap.set(hoverClose, { width: "auto" });
    gsap.set(hoverOpen, { width: 0 });

    // Mouseenter event
    btn.addEventListener("mouseenter", function () {
      gsap.to(hoverClose, {
        width: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(hoverOpen, {
        width: "auto",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Mouseleave event
    btn.addEventListener("mouseleave", function () {
      gsap.to(hoverClose, {
        width: "auto",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(hoverOpen, {
        width: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
})();

// Get references to important DOM elements
const body = document.body;
const viewPortHeight = window.innerHeight;
const header = body.querySelector("header");
const filter = body.querySelector("aside");

// Track last scroll position for scroll direction detection
let lastScroll = 0;

// Adding scroll listener to control the stickiness of the header
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Handle scrolling behavior
  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
    header.classList.remove("header--fixed");
    filter.classList.remove("filter--fixed");

    return;
  }

  if (
    currentScroll > lastScroll &&
    !body.classList.contains("scroll-down") &&
    currentScroll >= viewPortHeight
  ) {
    body.classList.remove("scroll-up");
    header.classList.remove("header--fixed");
    filter.classList.remove("filter--fixed");
    body.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains("scroll-down") &&
    currentScroll >= viewPortHeight
  ) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
    header.classList.add("header--fixed");
    filter.classList.add("filter--fixed");
    filter.style.trans;
  }

  lastScroll = currentScroll;
});
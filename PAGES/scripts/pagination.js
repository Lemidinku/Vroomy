// Get references to important DOM elements
const pagination = body.querySelector(".pagination");
const paginationAnchors = pagination.querySelectorAll(".btn--pagination");
const paginationButtons = pagination.querySelectorAll(".pagination__btn");

// Initialize the current page position
let currentPagePostion = 0;

// Event listener for the previous button
paginationButtons[0].addEventListener("click", () => {
  // Check if there's a previous page
  if (currentPagePostion > 0) {
    // Remove active class from all pagination anchors
    paginationAnchors.forEach((link) => {
      link.classList.remove("btn--pagination--active");
    });

    // Move to the previous page
    currentPagePostion--;

    // Set the active class on the new current page
    paginationAnchors[currentPagePostion].classList.add(
      "btn--pagination--active"
    );
  }
});

// Event listener for the next button
paginationButtons[1].addEventListener("click", () => {
  // Check if there's a next page
  if (currentPagePostion < 2) {
    // Remove active class from all pagination anchors
    paginationAnchors.forEach((link) => {
      link.classList.remove("btn--pagination--active");
    });

    // Move to the next page
    currentPagePostion++;

    // Set the active class on the new current page
    paginationAnchors[currentPagePostion].classList.add(
      "btn--pagination--active"
    );
  }
});

// Event listeners for individual pagination anchors
paginationAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove active class from all pagination anchors
    paginationAnchors.forEach((link) => {
      link.classList.remove("btn--pagination--active");
    });

    // Set the active class on the clicked anchor
    link.classList.add("btn--pagination--active");

    // Convert NodeList to array using spread operator
    const anchorsArray = [...paginationAnchors];

    // Update the current page position based on the clicked anchor
    currentPagePostion = anchorsArray.indexOf(link);
  });
});

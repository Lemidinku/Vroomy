const toggleButtons = body.querySelectorAll(".toggle");
const checkboxs = body.querySelectorAll(".checkbox");

toggleButtons.forEach((toggleButton) => {
  toggleButton.addEventListener("click", () => {
    toggleButton.classList.toggle("on");
  });
});

checkboxs.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    checkbox.classList.toggle("on");
  });
});

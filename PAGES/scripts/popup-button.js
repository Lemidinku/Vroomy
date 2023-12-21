const buttons = body.querySelectorAll(".dropdown");

buttons.forEach((link) => {
  link.addEventListener("click", () => link.classList.toggle("hidden"));
});

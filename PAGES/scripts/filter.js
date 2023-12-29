const filter_switch = filter.querySelector(".toggle");
console.log(filter_switch, filter);
filter_switch.addEventListener("click", () => {
  filter.classList.toggle("filter--inactive");
});

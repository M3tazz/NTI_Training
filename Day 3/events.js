const first = document.querySelector(".first");
const second = document.querySelector(".second");
const myParagraph = document.getElementById('para')
first.addEventListener("click", () => {
  myParagraph.textContent = "moataz";
});
second.addEventListener("click", () => {
  myParagraph.textContent = "hamdy";
});

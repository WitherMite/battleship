export default async function getOpponentType() {
  return new Promise(addButtonsBehavior);
}

function addButtonsBehavior(resolve) {
  const buttons = document.querySelectorAll(".menu-btn");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      resolve(btn.value);
    })
  );
}

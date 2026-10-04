// 제품 분류 탭 + 더보기 (products.html 에서만 불러옴)
(function () {
  const tabs = document.querySelectorAll(".cat-tab");
  if (!tabs.length) return;

  const items = document.querySelectorAll(".p-item");
  const empty = document.querySelector(".p-empty");
  const more = document.getElementById("moreBtn");
  const PAGE = 8; // 처음에 보여줄 개수 (더보기를 누를 때마다 이만큼 추가)
  let shown = PAGE;
  let current = "base";

  function render() {
    const list = [...items].filter((i) => i.dataset.cat === current);
    items.forEach((i) => {
      i.hidden = true;
    });
    list.forEach((i, idx) => {
      i.hidden = idx >= shown;
    });
    empty.hidden = list.length > 0;
    more.hidden = list.length <= shown;
  }

  function select(cat) {
    current = cat;
    shown = PAGE;
    tabs.forEach((t) => {
      const on = t.dataset.filter === cat;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-pressed", on);
    });
    render();
  }

  tabs.forEach((t) =>
    t.addEventListener("click", () => {
      select(t.dataset.filter);
      history.replaceState(null, "", "#" + t.dataset.filter);
    }),
  );
  more.addEventListener("click", () => {
    shown += PAGE;
    render();
  });

  // 주소 뒤에 #struct 처럼 붙이면 그 분류가 바로 열림
  const hash = location.hash.slice(1);
  //   select([...tabs].some((t) => t.dataset.filter === hash) ? hash : "base");
  select(
    [...tabs].some((t) => t.dataset.filter === hash)
      ? hash
      : tabs[0].dataset.filter,
  );
})();

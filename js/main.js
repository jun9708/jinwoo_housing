// 모바일 메뉴 열기/닫기
const btn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
if (btn && nav) {
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") nav.classList.remove("open");
  });
}

// 슬라이드 공통 설정: 3초마다 자동 넘김 + 터치/마우스로 쓸어넘기기
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const baseOptions = {
  loop: true,
  effect: "fade", // 페이드 인/아웃 (옆으로 밀리게 하려면 이 두 줄 삭제)
  fadeEffect: { crossFade: true },
  speed: 900,
  grabCursor: true, // 마우스를 올리면 손바닥 커서
  allowTouchMove: true, // 터치·마우스 드래그로 넘기기
  autoplay: reduceMotion
    ? false
    : {
        delay: 3000, // 3초 (1000 = 1초)
        disableOnInteraction: false, // 쓸어넘겨도 자동 넘김 계속
        pauseOnMouseEnter: true, // PC에서 마우스를 올리면 잠시 멈춤
      },
  pagination: { el: ".swiper-pagination", clickable: true },
};

// 히어로 슬라이드 (페이지에 몇 개가 있어도 각각 따로 작동)
if (window.Swiper) {
  document.querySelectorAll(".hero-swiper").forEach((el) => {
    new Swiper(el, {
      ...baseOptions,
      pagination: {
        el: el.querySelector(".swiper-pagination"),
        clickable: true,
      },
    });
  });
}

// 하위 페이지 상단 슬라이드
if (window.Swiper && document.querySelector(".title-swiper")) {
  new Swiper(".title-swiper", {
    ...baseOptions,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
/* ========================================
   Scroll Reveal Animation
======================================== */

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-item, .special-list",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        // 다시 스크롤해서 올라갔다 내려오면 재생
        entry.target.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

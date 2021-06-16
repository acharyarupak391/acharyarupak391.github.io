document.addEventListener("DOMContentLoaded", () => {
  var animationAdded = false;
  var el = document.querySelector(".fa-angle-double-down");
  el.addEventListener("click", (e) => {
    window.scrollTo({ top: 500, behavior: "smooth" });
  });

  document.addEventListener("scroll", (e) => {
    if (window.scrollY > 50) {
      el.style["display"] = "none";
    } else {
      el.style["display"] = "block";
    }

    if (window.scrollY > 385 && window.scrollY < 560 && !animationAdded) {
      animationAdded = true;
      document.querySelector(".div2 span").classList.add("animation-class");
      document.querySelector(".div2 ul").classList.add("animation-class");
    }
  });

  var unsplash = document.querySelector(".unsplash");
  unsplash.addEventListener("click", (e) => {
    window.open("https://unsplash.com/photos/aOC7TSLb1o8", "windowname");
  });

  var allATags = document.querySelectorAll(".name>a");
  allATags.forEach((aTag) => {
    aTag.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(aTag.getAttribute("href"));
    });
  });

  var animatingElements = document.querySelectorAll(".anim");
  var element = document.querySelector(".div1");

  animatingElements.forEach((e) => {
    e.onanimationend = () => (e.style.opacity = 1);
  });

  let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 0.5,
  };
  var animated = false;
  let observer = new IntersectionObserver((entries, observer) => {
    if (animated) return;
    let socialsDelay = 1.5;
    entries.forEach((entry) => {
      console.log(entry.isIntersecting, entry.intersectionRatio);
      let isVisible = entry.isIntersecting;

      animatingElements.forEach((animElement) => {
        let name = animElement.dataset.anim;
        if (name === "image") {
          animElement.style.animation = isVisible
            ? `fadedown 1s 0s 1 cubic-bezier(.72,-0.17,.06,.32)`
            : "";
        } else if (name === "name") {
          animElement.style.animation = isVisible
            ? `fadeup 1s 0.5s 1 cubic-bezier(.72,-0.17,.06,.32)`
            : "";
        } else if (name === "handle") {
          animElement.style.animation = isVisible
            ? `type 3.5s steps(16) 1s 1 normal both, blinkTextCursor 500ms 14 normal`
            : "";
        } else if (name === "social") {
          animElement.style.animation = isVisible
            ? `faderight 1s ${socialsDelay}s 1 cubic-bezier(.72,-0.17,.06,.32)`
            : "";
          socialsDelay += 0.25;
        }
      });
      if (isVisible) animated = true;
    });
  }, options);
  observer.observe(element);
});

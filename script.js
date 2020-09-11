document.addEventListener('DOMContentLoaded', () => {
  var animationAdded = false;
  var el = document.querySelector(".fa-angle-double-down")
  el.addEventListener("click", e => {
    window.scrollTo({top: 500, behavior: 'smooth'})
  })

  document.addEventListener("scroll", e => {
    console.log('spottt')
    if(window.scrollY > 50) {
      el.style["display"] = "none";
    } else {
      el.style["display"] = "block"
    }

    if(window.scrollY > 385 && window.scrollY < 560 && !animationAdded) {
      animationAdded = true;
      document.querySelector(".div2 span").classList.add("animation-class")
      document.querySelector(".div2 ul").classList.add("animation-class")
    }

  })

  var unsplash = document.querySelector(".unsplash")
  unsplash.addEventListener("click", e => {
    window.open("https://unsplash.com/photos/aOC7TSLb1o8", "windowname")
  })

})
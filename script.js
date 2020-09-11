document.addEventListener('DOMContentLoaded', () => {
  var el = document.querySelector(".fa-angle-double-down")
  el.addEventListener("click", e => {
    window.scrollTo({top: 500, behavior: 'smooth'})
  })

  document.addEventListener("scroll", e => {
    if(window.scrollY > 50) {
      el.style["display"] = "none";
    } else {
      el.style["display"] = "block"
    }
  })

  var unsplash = document.querySelector(".unsplash")
  unsplash.addEventListener("click", e => {
    window.open("https://unsplash.com/photos/aOC7TSLb1o8", "windowname")
  })
  
})
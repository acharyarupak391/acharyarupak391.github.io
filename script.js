document.addEventListener('DOMContentLoaded', () => {
  el = document.querySelector(".fa-angle-double-down")
  el.addEventListener("click", e => {
    window.scrollTo({top: 500, behavior: 'smooth'})
  })
  
})
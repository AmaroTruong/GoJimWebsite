const images=document.querySelectorAll(".image");images.forEach((e=>{e.addEventListener("mouseenter",(e=>{e.target.parentNode.querySelector(".description").style.display="block"})),e.addEventListener("mouseleave",(e=>{e.target.parentNode.querySelector(".description").style.display="none"}))}));
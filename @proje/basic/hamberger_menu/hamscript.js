const hamburG=document.querySelector(".hamburger-icon")
const containerhamG=document.querySelector(".hamburger-container")
const nav=document.querySelector(".nav")
const close=document.querySelector(".close-icon")
const link=document.querySelectorAll(".nav a")
hamburG.addEventListener("click",()=>{
    containerhamG.classList.add("menuOpen");
    // hamburG.style.opacity=0 ;
    nav.classList.remove("menuOpen");
    close.classList.remove("menuOpen");
})
close.addEventListener("click",()=>{
    containerhamG.classList.remove("menuOpen");
    // hamburG.style.opacity=0 ;
    nav.classList.add("menuOpen");
    close.classList.add("menuOpen");
    
})
nav.addEventListener("click",()=>{
    setTimeout(()=>{
        containerhamG.classList.remove("menuOpen");
        // hamburG.style.opacity=0 ;
        nav.classList.add("menuOpen");
        close.classList.add("menuOpen");
    },250)
   
    
})
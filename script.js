
const hamburger = document.querySelector('.hamburger');
const menuIcon = document.querySelector('.fa-bars');
const closeIcon = document.querySelector('.fa-xmark');
const dropDown = document.querySelector('.hd__nav-list-wrapper');
const menuItems = document.querySelectorAll('.menu-item');


const toggleMenu = () => {
    if (dropDown.classList.contains("showMenu")){
        dropDown.classList.remove("showMenu");
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
    } else {
        dropDown.classList.add("showMenu");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    }
}

hamburger.addEventListener("click", toggleMenu);


menuItems.forEach( 
    function(menuItem) { 
      menuItem.addEventListener("click", toggleMenu);
    }
)
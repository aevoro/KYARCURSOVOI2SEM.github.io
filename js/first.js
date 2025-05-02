document.getElementById("menuToggle").addEventListener("click", function() {
    let menu = document.getElementById("mobileMenu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});

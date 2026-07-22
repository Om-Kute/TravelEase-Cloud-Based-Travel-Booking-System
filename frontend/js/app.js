/* ==========================================================
   TravelEase Main Application
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

/* ==========================================================
   Initialize Application
========================================================== */

function initializeApp(){

    navbarScrollEffect();

    smoothScrolling();

    activeNavigation();

    newsletterValidation();

    searchForm();

    currentYear();

}

/* ==========================================================
   Sticky Navbar
========================================================== */

function navbarScrollEffect(){

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 80){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}

/* ==========================================================
   Smooth Scroll
========================================================== */

function smoothScrolling(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}

/* ==========================================================
   Active Navigation
========================================================== */

function activeNavigation(){

    const currentPage = window.location.pathname.split("/").pop();

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")===currentPage){

            link.classList.add("active");

        }

    });

}

/* ==========================================================
   Newsletter
========================================================== */

function newsletterValidation(){

    const form = document.querySelector(".newsletter form");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const email = form.querySelector("input").value.trim();

        if(email===""){

            alert("Please enter your email.");

            return;

        }

        alert("Thank you for subscribing!");

        form.reset();

    });

}

/* ==========================================================
   Search Form
========================================================== */

function searchForm(){

    const form=document.querySelector(".search-box");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const destination=form.querySelector("input[type='text']").value.trim();

        if(destination===""){

            alert("Please enter destination.");

            return;

        }

        localStorage.setItem("destination",destination);

        window.location.href="hotels.html";

    });

}

/* ==========================================================
   Footer Copyright
========================================================== */

function currentYear(){

    const year=document.getElementById("year");

    if(year){

        year.textContent=new Date().getFullYear();

    }

}

console.log("TravelEase Loaded Successfully.");
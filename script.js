/* ==========================================================================
   Wedding Invitation JavaScript
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  
  /* --------------------------------------------------------------------------
     1. Live Countdown Timer
     -------------------------------------------------------------------------- */
     
   // SET YOUR WEDDING DATE AND TIME HERE (Format: Year-Month-DayTHour:Minute:Second)
   const weddingDate = new Date("2027-06-25T14:00:00").getTime();

   function updateCountdown() {
     const now = new Date().getTime();
     const distance = weddingDate - now;

     if (distance < 0) {
       // If the wedding date has passed
       const countdownElement = document.getElementById("countdown");
       if (countdownElement) {
         countdownElement.innerHTML = "<p>Today is the big day!</p>";
       }
       return;
     }

     // Time calculations for days, hours, minutes and seconds
     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

     // Update HTML elements if they exist on the page
     if (document.getElementById("days")) document.getElementById("days").innerText = days;
     if (document.getElementById("hours")) document.getElementById("hours").innerText = hours;
     if (document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes;
     if (document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds;
   }

   // Run immediately and update every second
   updateCountdown();
   setInterval(updateCountdown, 1000);


  /* --------------------------------------------------------------------------
     2. Scroll Fade-In Animation
     -------------------------------------------------------------------------- */
   const observerOptions = {
     root: null,
     rootMargin: '0px',
     threshold: 0.1
   };

   const observer = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('visible');
         observer.unobserve(entry.target);
       }
     });
   }, observerOptions);

   // Target all cards and sections for smooth reveal
   document.querySelectorAll('.card, section h2').forEach(el => {
     el.style.opacity = '0';
     el.style.transform = 'translateY(20px)';
     el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
     observer.observe(el);
   });

   // Add CSS rule dynamically for the reveal effect
   const styleSheet = document.createElement("style");
   styleSheet.type = "text/css";
   styleSheet.innerText = ".visible { opacity: 1 !important; transform: translateY(0) !important; }";
   document.head.appendChild(styleSheet);
   // Interactive Opening Overlay Trigger
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("open-card-btn");
  const overlay = document.getElementById("envelope-overlay");

  if (openBtn && overlay) {
    openBtn.addEventListener("click", function () {
      overlay.classList.add("opened");
    });
  }
});
   

});

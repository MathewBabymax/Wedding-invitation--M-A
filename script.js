
const pages = Array.from(document.querySelectorAll(".page"));
const dots = Array.from(document.querySelectorAll(".nav-dot"));
const counter = document.querySelector(".page-count");
const restartButton = document.getElementById("restart");

let currentPage = 0;
let touchStartX = 0;
let touchStartY = 0;

function showPage(index) {
  // Keep navigation within the four pages.
  if (index < 0 || index >= pages.length) return;

  currentPage = index;

  pages.forEach((page, i) => {
    const isActive = i === currentPage;

    page.classList.toggle("active", isActive);
    page.setAttribute("aria-hidden", String(!isActive));
    page.inert = !isActive;
  });

  dots.forEach((dot, i) => {
    const isActive = i === currentPage;

    dot.classList.toggle("active", isActive);

    if (isActive) {
      dot.setAttribute("aria-current", "step");
    } else {
      dot.removeAttribute("aria-current");
    }
  });

  counter.textContent =
    `${String(currentPage + 1).padStart(2, "0")} / ` +
    `${String(pages.length).padStart(2, "0")}`;
}

// Next-page buttons
document.querySelectorAll(".next").forEach(button => {
  button.addEventListener("click", event => {
    event.stopPropagation();

    if (currentPage < pages.length - 1) {
      showPage(currentPage + 1);
    }
  });
});

// Jump directly to a page using the navigation dots.
dots.forEach(dot => {
  dot.addEventListener("click", event => {
    event.stopPropagation();
    showPage(Number(dot.dataset.go));
  });
});

// Restart the invitation.
restartButton.addEventListener("click", event => {
  event.stopPropagation();
  showPage(0);
});

// Tap/click the background of the current page to continue.
pages.forEach(page => {
  page.addEventListener("click", event => {
    if (event.target.closest("button")) return;

    if (currentPage < pages.length - 1) {
      showPage(currentPage + 1);
    }
  });
});

// Allow left/right arrow navigation on a keyboard.
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight" && currentPage < pages.length - 1) {
    showPage(currentPage + 1);
  }

  if (event.key === "ArrowLeft" && currentPage > 0) {
    showPage(currentPage - 1);
  }

  if (event.key === "Home") {
    showPage(0);
  }

  if (event.key === "End") {
    showPage(pages.length - 1);
  }
});

// Optional swipe navigation for mobile.
document.addEventListener("touchstart", event => {
  const touch = event.changedTouches[0];

  touchStartX = touch.screenX;
  touchStartY = touch.screenY;
}, { passive: true });

document.addEventListener("touchend", event => {
  const touch = event.changedTouches[0];
  const deltaX = touch.screenX - touchStartX;
  const deltaY = touch.screenY - touchStartY;

  // Only treat clearly horizontal gestures as swipes.
  if (Math.abs(deltaX) < 65 || Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }

  if (deltaX < 0 && currentPage < pages.length - 1) {
    showPage(currentPage + 1);
  } else if (deltaX > 0 && currentPage > 0) {
    showPage(currentPage - 1);
  }
}, { passive: true });

// Initialize the invitation.
showPage(0);

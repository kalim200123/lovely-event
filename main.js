// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const loginOverlay = document.querySelector("#login-overlay");
const loginInput = document.querySelector("#login-input");
const loginBtn = document.querySelector("#login-btn");
const loginError = document.querySelector("#login-error");
const mainContainer = document.querySelector(".container");

const introSection = document.querySelector("#intro");
const loadingBar = document.querySelector(".loading-bar");
const introContent = document.querySelector(".intro-content");
const typingText = document.querySelector(".typing-text");
const dDayCounter = document.querySelector("#d-day-counter");
const heroImage = document.querySelector(".hero-image");
const musicModal = document.querySelector("#music-modal");
const startBtn = document.querySelector("#start-btn");
const charBoy = document.querySelector(".char-boy");
const charGirl = document.querySelector(".char-girl");

// Login Logic
const ANNIVERSARY_DATE = "20240118"; // Set your anniversary date here

loginBtn.addEventListener("click", checkLogin);
loginInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkLogin();
});

function checkLogin() {
  const inputDate = loginInput.value;
  if (inputDate === ANNIVERSARY_DATE) {
    // Success
    loginOverlay.classList.add("unlocked");
    mainContainer.classList.remove("hidden");
    
    // Show Music Modal after a short delay
    setTimeout(() => {
      musicModal.style.display = "flex";
    }, 500);
  } else {
    // Error
    loginError.classList.remove("hidden");
    loginError.style.animation = 'none';
    loginError.offsetHeight; /* trigger reflow */
    loginError.style.animation = null; 
  }
}

// 1. Intro Animation (Triggered after Music Modal)
function playIntro() {
  // Loading Bar Animation
  gsap.to(loadingBar, {
    width: "100%",
    duration: 2,
    ease: "power2.inOut",
    onComplete: () => {
      document.querySelector(".loading-container").style.display = "none";
      introContent.classList.add("visible");
      startTyping();
      animateDDay();

      // Hero Image Focus
      setTimeout(() => {
        heroImage.classList.add("focused");
      }, 500);
    },
  });
}

// Typing Effect
const textToType = "Since 2024.01.18"; // Example date 2 years ago
function startTyping() {
  let i = 0;
  typingText.innerHTML = "";
  const typeInterval = setInterval(() => {
    if (i < textToType.length) {
      typingText.innerHTML += textToType.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 100);
}

// D-Day Counter Animation
function animateDDay() {
  const targetDay = 730; // 2 years
  const obj = { val: 1 };
  gsap.to(obj, {
    val: targetDay,
    duration: 2,
    ease: "power1.out",
    onUpdate: () => {
      dDayCounter.innerText = `D+${Math.floor(obj.val)}`;
    },
  });
}

// 2. Background Color Transitions
const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => updateBodyColor(section.id),
    onEnterBack: () => updateBodyColor(section.id),
  });
});

function updateBodyColor(sectionId) {
  const body = document.body;
  switch (sectionId) {
    case "intro":
      body.style.backgroundColor = "var(--color-white)";
      break;
    case "joy":
      body.style.backgroundColor = "var(--color-orange-warm)";
      break;
    case "sadness":
      body.style.backgroundColor = "var(--color-navy-deep)";
      break;
    case "conclusion":
      body.style.backgroundColor = "#e1bee7"; // Start of gradient
      break;
    case "interaction":
      body.style.backgroundColor = "var(--color-white)";
      break;
  }
}

// 3. Parallax Effect (Joy Section)
gsap.utils.toArray(".parallax").forEach((layer) => {
  const speed = layer.getAttribute("data-speed");
  gsap.to(layer, {
    y: -(speed * 100),
    ease: "none",
    scrollTrigger: {
      trigger: "#joy",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

// 4. Rain Effect (Sadness Section)
const rainContainer = document.querySelector(".rain-container");
for (let i = 0; i < 50; i++) {
  const drop = document.createElement("div");
  drop.classList.add("rain-drop");
  drop.style.left = `${Math.random() * 100}%`;
  drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
  drop.style.animationDelay = `${Math.random() * 2}s`;
  rainContainer.appendChild(drop);
}

// 4-2. Sadness Section Story Fade-in
gsap.utils.toArray(".fade-in-scroll").forEach((element) => {
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%", // Trigger when top of element hits 80% of viewport height
      toggleActions: "play none none reverse"
    }
  });
});

// 5. Infinite Loop Code (Conclusion Section)
gsap.utils.toArray(".credit-text").forEach((text, i) => {
  gsap.to(text, {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: ".sticky-container",
      start: `top+=${i * 100} center`,
      end: `top+=${i * 100 + 200} center`,
      scrub: true,
    },
  });
});

// 6. Character Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;

  const movePercent = Math.min(scrollPercent * 50, 45);

  charBoy.style.left = `${movePercent}%`;
  charGirl.style.right = `${movePercent}%`;

  if (scrollPercent > 0.95) {
    charBoy.innerHTML = "❤️";
    charGirl.innerHTML = "❤️";
  } else {
    charBoy.innerHTML = "👦";
    charGirl.innerHTML = "👧";
  }
});

// 7. Interaction (Confetti)
const actionBtn = document.querySelector("#action-btn");
actionBtn.addEventListener("click", () => {
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  setTimeout(() => {
    alert("계약이 갱신되었습니다. 반품은 불가합니다! 💖");
  }, 500);
});

// Music Modal Interaction
startBtn.addEventListener("click", () => {
  musicModal.style.display = "none";
  // Play audio here if added
  // const audio = new Audio('bgm.mp3');
  // audio.play();
  
  // Start Intro Animation
  playIntro();
});

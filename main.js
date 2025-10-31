// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable);

/* sections hero */
const heroTL = gsap.timeline();
heroTL
  .to(".hero-title", { opacity: 1, y: -10, duration: 1, ease: "power3.out" })
  .to(".hero-subtitle", { opacity: 1, y: -8, duration: 0.8 }, "-=0.6")
  .to(".hero-car", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.6");

// Scroll animation for the hero car
gsap.to(".hero-car", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  y: -200,
  scale: 1.08,
  ease: "none"
});

// fade out 
gsap.to(".hero-content", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top 20%",
    end: "bottom top",
    scrub: true
  },
  opacity: 0
});


/* chiffres performance */
gsap.utils.toArray(".number").forEach(number => {
  let target = +number.dataset.target;
  let obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 2,
    scrollTrigger: {
      trigger: number,
      start: "top 80%",
      toggleActions: "play none reverse none"
    },
    onUpdate: () => {
      if (Number.isInteger(target)) {
        number.textContent = Math.floor(obj.val);
      } else {
        number.textContent = obj.val.toFixed(1);
      }
    }
  });
});


/* 🖼️ 3. Porsche showcase images  */

gsap.utils.toArray(".img").forEach((img, i) => {
  gsap.to(img, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".porsche-showcase",
      start: "top center",
      end: "bottom center",
      scrub: true,
    }
  });
});

// Fade in text 
gsap.from(".text", {
  opacity: 0,
  y: 30,
  duration: 1,
  scrollTrigger: {
    trigger: ".porsche-showcase",
    start: "top 70%",
    end: "top 50%",
    scrub: true,
  }
});

// parallax 
gsap.to(".img1", {
  yPercent: -10,
  scrollTrigger: { trigger: ".porsche-showcase", scrub: true }
});
gsap.to(".img2", {
  yPercent: 15,
  scrollTrigger: { trigger: ".porsche-showcase", scrub: true }
});
gsap.to(".img3", {
  yPercent: -5,
  scrollTrigger: { trigger: ".porsche-showcase", scrub: true }
});

/* Changement vitesse */

// Vitesse positions
const gearPositions = {
  P: 60,
  R: 160,
  N: 260,
  D: 360
};

// Info vitesse
const gearData = {
  P: {
    title: "Park (P)",
    text: "Safety features and driver assistance systems.",
    img: "img/park.jpg"
  },
  R: {
    title: "Reverse (R)",
    text: "Night vision and rear camera system details.",
    img: "img/reverse.jpg"
  },
  N: {
    title: "Neutral (N)",
    text: "General information about the Porsche 911 Turbo S.",
    img: "img/neutral.jpg"
  },
  D: {
    title: "Drive (D)",
    text: "Performance and engine capabilities overview.",
    img: "img/drive.jpg"
  }
};

// References
const stick = document.getElementById("gearStick");
const infoTitle = document.querySelector("#gearInfo h2");
const infoText = document.querySelector("#gearInfo p");
const infoImage = document.querySelector("#gearImage");
const gearLabels = document.querySelectorAll(".gear-labels span");

// Draggable vitesse
Draggable.create(stick, {
  type: "y",
  bounds: { minY: 60, maxY: 360 },
  inertia: true,
  onDragEnd: function () {
    // Find the nearest gear
    let closestGear = "N";
    let minDist = Infinity;
    for (let g in gearPositions) {
      let dist = Math.abs(this.y - gearPositions[g]);
      if (dist < minDist) {
        minDist = dist;
        closestGear = g;
      }
    }

    // Snap stick to nearest gear
    gsap.to(this.target, {
      y: gearPositions[closestGear],
      duration: 0.3,
      ease: "power2.out"
    });

    // Update info panel
    const data = gearData[closestGear];
    infoTitle.textContent = data.title;
    infoText.textContent = data.text;
    infoImage.src = data.img;

    // Highlight active gear letter
    gearLabels.forEach(l => l.style.opacity = 0.4);
    document.querySelector(`[data-gear="${closestGear}"]`).style.opacity = 1;

    // Subtle feedback animation
    gsap.fromTo(
      infoImage,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }
});

// Set initial highlight to Neutral
gearLabels.forEach(l => l.style.opacity = 0.4);
document.querySelector(`[data-gear="N"]`).style.opacity = 1;
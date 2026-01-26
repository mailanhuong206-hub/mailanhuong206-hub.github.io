// Mobile menu
const burger = document.querySelector(".burger");
const mobile = document.querySelector(".mobile");

function setMobile(open) {
  burger.setAttribute("aria-expanded", String(open));
  mobile.style.display = open ? "block" : "none";
  mobile.setAttribute("aria-hidden", String(!open));
}

if (burger) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    setMobile(!isOpen);
  });
}

document.querySelectorAll(".mobile a").forEach(a => {
  a.addEventListener("click", () => setMobile(false));
});

// Learning path data
const lessons = [
  { day: 1, title: "Introductions & role", status: "today" },
  { day: 2, title: "Key industry terms", status: "unlocked" },
  { day: 3, title: "Requests & confirmations", status: "locked" },
  { day: 4, title: "Deadlines & follow-ups", status: "locked" },
  { day: 5, title: "Meetings & agendas", status: "locked" },
  { day: 6, title: "Reporting & updates", status: "locked" },
  { day: 7, title: "Negotiation basics", status: "locked" },
  { day: 8, title: "Problem-solving", status: "locked" },
  { day: 9, title: "Professional tone", status: "locked" },
  { day: 10, title: "Wrap-up & review", status: "locked" },
  { day: 11, title: "Industry scenarios", status: "locked" },
  { day: 12, title: "Confidence practice", status: "locked" },
];

const industryCopy = {
  all: { label: "All industries" },
  ecommerce: { label: "E-commerce" },
  logistics: { label: "Logistics" },
  marketing: { label: "Marketing" },
  "customer-service": { label: "Customer Service" },
  finance: { label: "Finance" },
  hr: { label: "Human Resources" },
};

const pathGrid = document.getElementById("pathGrid");
const industrySelect = document.getElementById("industrySelect");

function renderPath(industry = "all") {
  if (!pathGrid) return;
  pathGrid.innerHTML = "";

  const label = industryCopy[industry]?.label || "All industries";

  lessons.forEach((l) => {
    const node = document.createElement("div");
    node.className = "path-node";

    const tagClass =
      l.status === "today" ? "tag--today" : l.status === "unlocked" ? "tag--unlocked" : "tag--locked";

    const tagText =
      l.status === "today" ? "Today" : l.status === "unlocked" ? "Unlocked" : "Locked";

    node.innerHTML = `
      <div class="path-node__top">
        <div class="path-node__day">Day ${l.day}</div>
        <div class="path-node__tag ${tagClass}">${tagText}</div>
      </div>
      <div class="path-node__title">${label}: ${l.title}</div>
    `;

    pathGrid.appendChild(node);
  });
}

renderPath("all");

if (industrySelect) {
  industrySelect.addEventListener("change", (e) => {
    renderPath(e.target.value);
  });
}

// Clicking industry cards filters path + scrolls to it
document.querySelectorAll(".card[data-industry]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const industry = btn.getAttribute("data-industry");
    if (industrySelect) industrySelect.value = industry;
    renderPath(industry);
    document.getElementById("learning-path")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Mini practice
const result = document.querySelector(".practice__result");
document.querySelectorAll(".opt").forEach((opt) => {
  opt.addEventListener("click", () => {
    const correct = opt.getAttribute("data-correct") === "true";
    if (result) {
      result.textContent = correct ? "Correct — nice!" : "Not quite. Try again.";
    }
  });
});

// Lead form (demo)
const form = document.getElementById("leadForm");
const formStatus = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    if (!email) return;

    // Demo only — replace with your backend / form service
    if (formStatus) {
      formStatus.textContent = "Saved! We'll email you early access details.";
    }
    form.reset();
  });
}

// Year
document.getElementById("year").textContent = String(new Date().getFullYear());

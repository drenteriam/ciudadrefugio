const weeklyServices = [
  { weekday: 5, hour: 19, minute: 0, title: "Reunión de fe y oración", label: "Viernes" },
  { weekday: 0, hour: 11, minute: 0, title: "Servicio general", label: "Domingo" }
];

// Agrega eventos especiales con este formato:
// { date: "2026-08-15T18:00:00", title: "Conferencia familiar", description: "Entrada libre" }
const specialEvents = [];

function getNextOccurrence(service, fromDate = new Date()) {
  const result = new Date(fromDate);
  result.setSeconds(0, 0);

  let daysAhead = (service.weekday - result.getDay() + 7) % 7;
  const candidate = new Date(result);
  candidate.setDate(result.getDate() + daysAhead);
  candidate.setHours(service.hour, service.minute, 0, 0);

  if (candidate <= fromDate) {
    candidate.setDate(candidate.getDate() + 7);
  }
  return candidate;
}

function buildUpcomingEvents(limit = 6) {
  const now = new Date();
  const events = [];

  weeklyServices.forEach(service => {
    let date = getNextOccurrence(service, now);
    for (let i = 0; i < 5; i++) {
      events.push({
        date: new Date(date),
        title: service.title,
        description: `${service.label} · ${formatTime(date)}`
      });
      date = new Date(date);
      date.setDate(date.getDate() + 7);
    }
  });

  specialEvents.forEach(event => {
    const date = new Date(event.date);
    if (date > now) {
      events.push({
        date,
        title: event.title,
        description: event.description || "Evento especial"
      });
    }
  });

  return events.sort((a, b) => a.date - b.date).slice(0, limit);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat("es-MX", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(date);
}

function renderEvents() {
  const events = buildUpcomingEvents();
  const container = document.getElementById("events-list");
  container.innerHTML = events.map(event => `
    <article class="event-card">
      <div class="event-date">${formatDate(event.date)}</div>
      <h3>${event.title}</h3>
      <p>${event.description}</p>
    </article>
  `).join("");

  const next = events[0];
  document.getElementById("next-service").innerHTML =
    `<span>Próxima reunión:</span> <strong>${formatDate(next.date)} · ${formatTime(next.date)}</strong>`;
}

function setupMenu() {
  const button = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  button.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }));
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("Mensaje desde el sitio web");
    const body = encodeURIComponent(
      `Nombre: ${data.get("name")}\nCorreo: ${data.get("email")}\n\nMensaje:\n${data.get("message")}`
    );
    window.location.href = `mailto:contacto@ciudadderefugio.org?subject=${subject}&body=${body}`;
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
renderEvents();
setupMenu();
setupContactForm();

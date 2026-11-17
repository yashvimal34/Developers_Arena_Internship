const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const projectSearch = document.querySelector("[data-project-search]");
const projectCards = document.querySelectorAll(".project-card");
const projectStatus = document.querySelector("[data-project-status]");
const projectEmpty = document.querySelector("[data-project-empty]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const formFields = contactForm.querySelectorAll("input, textarea");
contactForm.noValidate = true;

function setTheme(isDark) {
  document.body.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
}

themeToggle.addEventListener("click", function () {
  const isDark = document.body.dataset.theme !== "dark";
  setTheme(isDark);

  try {
    localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
  } catch (error) {
    console.warn("The theme preference could not be saved.", error);
  }
});

try {
  setTheme(localStorage.getItem("portfolioTheme") === "dark");
} catch (error) {
  setTheme(false);
  console.warn("The saved theme preference could not be loaded.", error);
}

projectSearch.addEventListener("input", function () {
  const searchText = projectSearch.value.trim().toLowerCase();
  let visibleProjects = 0;

  projectCards.forEach(function (card) {
    const matchesSearch = card.textContent.toLowerCase().includes(searchText);
    card.hidden = !matchesSearch;
    visibleProjects += Number(matchesSearch);
  });

  projectEmpty.hidden = visibleProjects !== 0;
  projectStatus.textContent = searchText
    ? visibleProjects + (visibleProjects === 1 ? " project found." : " projects found.")
    : "";
});

function getFieldError(field) {
  if (field.value.trim() === "") {
    return "This field is required.";
  }

  if (field.id === "name" && field.value.trim().length < 2) {
    return "Please enter at least 2 characters.";
  }

  if (field.id === "email" && !field.validity.valid) {
    return "Please enter a valid email address.";
  }

  if (field.id === "message" && field.value.trim().length < 10) {
    return "Please enter at least 10 characters.";
  }

  return "";
}

function validateField(field) {
  const error = getFieldError(field);
  const errorElement = document.getElementById(field.id + "-error");

  errorElement.textContent = error;
  field.setAttribute("aria-invalid", String(Boolean(error)));
  return error === "";
}

formFields.forEach(function (field) {
  field.addEventListener("input", function () {
    validateField(field);
    formStatus.textContent = "";
  });
});

contactForm.addEventListener("submit", function (event) {
  let formIsValid = true;
  formFields.forEach(function (field) {
    if (!validateField(field)) {
      formIsValid = false;
    }
  });

  if (!formIsValid) {
    event.preventDefault();
    formStatus.textContent = "Please correct the highlighted fields before continuing.";
    return;
  }

  formStatus.textContent = "Your message is ready to open in your email app.";
});

contactForm.addEventListener("reset", function () {
  formFields.forEach(function (field) {
    field.removeAttribute("aria-invalid");
    document.getElementById(field.id + "-error").textContent = "";
  });

  formStatus.textContent = "";
});

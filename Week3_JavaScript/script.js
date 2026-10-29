const header = document.querySelector("#home");
const projectSection = document.querySelector("#projects");
const contactForm = document.querySelector("#contact form");
contactForm.noValidate = true;

// light and dark mode.
const themeButton = document.createElement("button");
themeButton.type = "button";
themeButton.textContent = "Dark mode";
themeButton.className = "theme-button";
header.prepend(themeButton);

// Add a search box above the project cards.
const projectSearch = document.createElement("input");
projectSearch.type = "search";
projectSearch.placeholder = "Search projects...";
projectSearch.setAttribute("aria-label", "Search projects");
projectSearch.className = "project-search";
projectSection.querySelector("h2").after(projectSearch);

const projectMessage = document.createElement("p");
projectMessage.className = "project-message";
projectMessage.setAttribute("aria-live", "polite");
projectSearch.after(projectMessage);

// Create an error message below each contact form field.
const formFields = contactForm.querySelectorAll("input, textarea");

formFields.forEach(function (field) {
  const errorMessage = document.createElement("span");
  errorMessage.className = "error-message";
  errorMessage.id = field.id + "-error";
  field.after(errorMessage);
});

const formMessage = document.createElement("p");
formMessage.className = "form-message";
formMessage.setAttribute("aria-live", "polite");
contactForm.append(formMessage);

// Reusable function to show an error for one form field.
function showFieldError(field) {
  const errorMessage = document.querySelector("#" + field.id + "-error");
  let message = "";

  if (field.value.trim() === "") {
    message = "This field is required.";
  } else if (field.id === "name" && field.value.trim().length < 2) {
    message = "Please enter at least 2 characters.";
  } else if (field.id === "email" && !field.validity.valid) {
    message = "Please enter a valid email address.";
  } else if (field.id === "message" && field.value.trim().length < 10) {
    message = "Please enter at least 10 characters.";
  }

  errorMessage.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
  return message === "";
}

// Day 3 and Day 5: click the button to change the page theme.
themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  const darkModeIsOn = document.body.classList.contains("dark-mode");
  themeButton.textContent = darkModeIsOn ? "Light mode" : "Dark mode";

  // Day 6: remember the theme choice in this browser.
  try {
    localStorage.setItem("portfolioTheme", darkModeIsOn ? "dark" : "light");
  } catch (error) {
    console.warn("The theme preference could not be saved.", error);
  }
});

// Load the saved theme when the page opens.
try {
  if (localStorage.getItem("portfolioTheme") === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "Light mode";
  }
} catch (error) {
  console.warn("The saved theme preference could not be loaded.", error);
}

// Day 3: filter projects whenever the search text changes.
projectSearch.addEventListener("input", function () {
  const searchText = projectSearch.value.toLowerCase().trim();
  const projectCards = projectSection.querySelectorAll("article");
  let visibleProjects = 0;

  projectCards.forEach(function (card) {
    const projectText = card.textContent.toLowerCase();
    const matchesSearch = projectText.includes(searchText);

    card.hidden = !matchesSearch;
    if (matchesSearch) {
      visibleProjects += 1;
    }
  });

  projectMessage.textContent = searchText
    ? visibleProjects + " project(s) found."
    : "";
});

// Add a simple hover response to each project card.
projectSection.querySelectorAll("article").forEach(function (card) {
  card.addEventListener("mouseenter", function () {
    card.classList.add("project-hover");
    projectMessage.textContent = "Project: " + card.querySelector("h3").textContent;
  });

  card.addEventListener("mouseleave", function () {
    card.classList.remove("project-hover");
    projectSearch.dispatchEvent(new Event("input"));
  });
});

// Day 4: show helpful feedback while the user fills out the form.
formFields.forEach(function (field) {
  field.addEventListener("input", function () {
    showFieldError(field);
    formMessage.textContent = "";
  });
});

contactForm.addEventListener("submit", function (event) {
  let formIsValid = true;

  formFields.forEach(function (field) {
    if (!showFieldError(field)) {
      formIsValid = false;
    }
  });

  if (!formIsValid) {
    event.preventDefault();
    formMessage.textContent = "Please fix the errors above before sending.";
  } else {
    formMessage.textContent = "Your message is ready to send.";
  }
});

contactForm.addEventListener("reset", function () {
  formFields.forEach(function (field) {
    field.removeAttribute("aria-invalid");
    document.querySelector("#" + field.id + "-error").textContent = "";
  });
  formMessage.textContent = "";
});
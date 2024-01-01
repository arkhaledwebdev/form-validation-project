import "./style.css";

const form = document.getElementById("validation-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("form-email").reportValidity();
  document.getElementById("form-zip").reportValidity();
  document.getElementById("form-password").reportValidity();
});

function checkEmail() {
  const email = document.getElementById("form-email");
  const emailConstraint = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  if (emailConstraint.test(email.value)) {
    email.setCustomValidity("");
    email.classList.remove("invalid-input");
  } else {
    console.log(email.value);
    email.setCustomValidity("email is invalid");
    email.classList.add("invalid-input");
    // email.reportValidity();
  }
}

function checkZIP() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  const country = document.getElementById("form-country").value;

  const ZIPField = document.getElementById("form-zip");

  const constraint = new RegExp(constraints[country][0], "");

  if (constraint.test(ZIPField.value)) {
    ZIPField.setCustomValidity("");
  } else {
    ZIPField.setCustomValidity(constraints[country][1]);
  }
}

function checkPasswords() {
  const password = document.getElementById("form-password");
  const confirmPassword = document.getElementById("form-confirm-password");

  if (password.value === confirmPassword.value) {
    password.setCustomValidity("");
  } else {
    password.setCustomValidity("passwords don't match");
  }
}

window.onload = () => {
  document.getElementById("form-email").oninput = checkEmail;
  document.getElementById("form-country").onchange = checkZIP;
  document.getElementById("form-zip").oninput = checkZIP;
  document.getElementById("form-password").oninput = checkPasswords;
};

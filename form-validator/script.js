const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const USER_MIN = 3;
const USER_MAX = 10;
const PASS_MIN = 6;
const PASS_MAX = 15;

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show input success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check if email is valid
// https://emailregex.com/
// RFC 5322
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check if the required fields are not empty
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check the length of input
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} cannot exceed ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check for matching passwords
function checkPassword(input1, input2) {
  if (input1.value === input2.value && input1.value.length >= PASS_MIN) {
    showSuccess(input2);
  } else {
    showError(input2, "Passwords must match");
  }
}

// Return the name of the field with the first letter capitalized
function getFieldName(input) {
  var fieldName = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  return fieldName;
}

// When submit button is pressed
// preventDefault cancels the form submission for the sake of demonstration
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, USER_MIN, USER_MAX);
  checkLength(password, PASS_MIN, PASS_MAX);
  checkEmail(email);
  checkPassword(password, password2);
});

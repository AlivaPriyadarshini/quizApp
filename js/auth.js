document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("registerUsername").value.trim();
      const email = document.getElementById("registerEmail").value.trim().toLowerCase();
      const password = document.getElementById("registerPassword").value.trim();
      const message = document.getElementById("registerMessage");

      message.style.color = "#dc2626";

      if (!username || !email || !password) {
        message.textContent = "All fields are required.";
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        message.textContent = "Please enter a valid email.";
        return;
      }

      if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
      }

      const existingUser = findUserByEmail(email);
      if (existingUser) {
        message.textContent = "Email already registered.";
        return;
      }

      const newUser = {
        username: username,
        email: email,
        password: password
      };

      registerUser(newUser);

      message.style.color = "green";
      message.textContent = "Registration successful! Redirecting to login...";

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1500);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value.trim();
      const message = document.getElementById("loginMessage");

      message.style.color = "#dc2626";

      if (!email || !password) {
        message.textContent = "All fields are required.";
        return;
      }

      const user = findUserByEmail(email);

      if (!user || user.password !== password) {
        message.textContent = "Invalid email or password.";
        return;
      }

      loginUser(email);
      window.location.href = "dashboard.html";
    });
  }
});
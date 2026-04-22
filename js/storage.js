function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function registerUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

function findUserByEmail(email) {
  const users = getUsers();
  return users.find(function (user) {
    return user.email === email;
  });
}

function loginUser(email) {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", email);
}

function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
}

function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function getCurrentUser() {
  const email = localStorage.getItem("currentUser");
  if (!email) return null;
  return findUserByEmail(email);
}

function protectPage() {
  if (!isAuthenticated()) {
    window.location.href = "index.html";
  }
}
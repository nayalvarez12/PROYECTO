// Función para cargar usuarios desde localStorage
function loadUsers() {
  const storedUsers = localStorage.getItem("usersDatabase");
  return storedUsers ? JSON.parse(storedUsers) : {};
}

// Función para guardar usuarios en localStorage
function saveUsers(users) {
  localStorage.setItem("usersDatabase", JSON.stringify(users));
}

// Cargar usuarios iniciales
let usersDatabase = loadUsers();

// Función de Registro
if (document.getElementById('registerForm')) {
  const registerForm = document.getElementById('registerForm');
  const regUsername = document.getElementById('regUsername');
  const regPassword = document.getElementById('regPassword');
  const confirmRegPassword = document.getElementById('confirmRegPassword');

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validación de nombre de usuario
    const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;
    if (!usernamePattern.test(regUsername.value)) {
      alert("El nombre de usuario debe tener entre 5 y 15 caracteres y solo contener letras y números.");
      return;
    }

    // Validación de contraseña
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordPattern.test(regPassword.value)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo.");
      return;
    }

    if (regPassword.value !== confirmRegPassword.value) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (usersDatabase[regUsername.value]) {
      alert("El usuario ya existe.");
      return;
    }

    // Guardar usuario en la base de datos
    usersDatabase[regUsername.value] = regPassword.value;
    saveUsers(usersDatabase); // Guardar en localStorage
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "Login.html";
  });
}

// Función de Inicio de Sesión
if (document.getElementById('loginForm')) {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginMessage = document.getElementById('loginMessage');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (usersDatabase[username] && usersDatabase[username] === password) {
      alert("Inicio de sesión exitoso.");
      window.location.href = "inicio.html"; // Ruta de redirección después del login
    } else {
      loginMessage.textContent = "Usuario o contraseña incorrectos.";
    }
  });
}

// Función de Recuperación de Contraseña
let recoveryToken = null;

if (document.getElementById('recoverForm')) {
  const recoverForm = document.getElementById('recoverForm');
  const recoverUsernameInput = document.getElementById('recoverUsername');
  const generateTokenButton = document.getElementById('generateTokenButton');
  const tokenMessage = document.getElementById('tokenMessage');
  const tokenInput = document.getElementById('tokenInput');
  const newPasswordInput = document.getElementById('newPassword');
  const updatePasswordButton = document.getElementById('updatePasswordButton');

  generateTokenButton.addEventListener('click', function () {
    const username = recoverUsernameInput.value;

    if (!usersDatabase[username]) {
      tokenMessage.textContent = "Usuario no encontrado.";
      return;
    }

    recoveryToken = Math.random().toString(36).substring(2, 10);
    tokenMessage.textContent = `Tu token de recuperación es: ${recoveryToken}`;
    document.getElementById('tokenSection').style.display = "block";
  });

  tokenInput.addEventListener('input', function () {
    if (tokenInput.value === recoveryToken) {
      document.getElementById('newPasswordSection').style.display = "block";
      updatePasswordButton.style.display = "block";
    }
  });

  recoverForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = recoverUsernameInput.value;
    const newPassword = newPasswordInput.value;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      alert("La nueva contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo.");
      return;
    }

    usersDatabase[username] = newPassword;
    saveUsers(usersDatabase); // Actualizar en localStorage
    alert("Contraseña actualizada con éxito. Ahora puedes iniciar sesión.");
    window.location.href = "Login.html";
  });
}

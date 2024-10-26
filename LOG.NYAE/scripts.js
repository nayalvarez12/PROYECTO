const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitButton = loginForm.querySelector('button');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const formMessage = document.getElementById('formMessage');

    function validateForm() {
      let isValid = true;

      // Validar usuario (solo letras y números, sin espacios)
      if (!/^[a-zA-Z0-9]+$/.test(usernameInput.value) || usernameInput.value.length < 5) {
        usernameError.textContent = "Usuario inválido (solo letras y números, mínimo 5 caracteres)";
        isValid = false;
      } else {
        usernameError.textContent = "";
      }

      // Validar contraseña
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(passwordInput.value)) {
        passwordError.textContent = "Debe tener una mayúscula, una minúscula, un número y un símbolo";
        isValid = false;
      } else {
        passwordError.textContent = "";
      }

      // Validar confirmación de contraseña
      if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = "Las contraseñas no coinciden";
        isValid = false;
      } else {
        confirmPasswordError.textContent = "";
      }

      // Habilitar o deshabilitar el botón de envío
      submitButton.disabled = !isValid;
    }

    // Escuchar eventos en los campos de entrada
    usernameInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    confirmPasswordInput.addEventListener('input', validateForm);

    // Mostrar mensaje de éxito al enviar el formulario
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      formMessage.textContent = "Inicio de sesión exitoso";
      loginForm.reset();
      submitButton.disabled = true;
    });
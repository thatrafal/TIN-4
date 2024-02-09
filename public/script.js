// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  const dataContainer = document.getElementById('data-container');
  const errorMessageContainer = document.getElementById('error-message');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Resetowanie kolorów pól formularza
    form.querySelectorAll('.invalid-field').forEach(field => {
      field.classList.remove('invalid-field');
    });

    // Usunięcie komunikatu o błędzie z poprzedniego zatwierdzenia
    errorMessageContainer.innerHTML = '';

    // Pobieranie danych z formularza
    const formData = new FormData(form);
const response = await fetch('http://localhost:3000/submit', {
  method: 'POST',
  body: formData,
});


    if (response.ok) {
      const data = await response.text();
      // Wyświetlanie danych w kontenerze
      dataContainer.innerHTML = data;
    } else {
      const errorData = await response.json();

      // Wyświetlanie komunikatu o błędzie
      const errorMessage = document.createElement('div');
      errorMessage.id = 'error-message';
      errorMessage.textContent = errorData.message;
      errorMessageContainer.appendChild(errorMessage);

      // Wyróżnienie błędnych pól na czerwono
      errorData.invalidFields.forEach(fieldName => {
        const invalidField = form.querySelector(`[name="${fieldName}"]`);
        invalidField.classList.add('invalid-field');
      });
    }
  });
});

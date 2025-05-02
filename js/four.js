document.addEventListener("DOMContentLoaded", () => {
  const xmlData = `
    <insuranceTypes>
      <type name="Транспорт">
        <first>49.99</first>
        <repeat>69.99</repeat>
        <company>36.99</company>
      </type>
      <type name="Имущество">
        <first>59.99</first>
        <repeat>79.99</repeat>
        <company>46.99</company>
      </type>
      <type name="Медицинская">
        <first>39.99</first>
        <repeat>59.99</repeat>
        <company>29.99</company>
      </type>
      <type name="От несчастных случаев">
        <first>29.99</first>
        <repeat>49.99</repeat>
        <company>19.99</company>
      </type>
    </insuranceTypes>
  `;

  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlData, "application/xml");

  const kindSelect = document.getElementById("insuranceKind");
  const clientSelect = document.getElementById("clientType");
  const result = document.getElementById("result");
  const emailInput = document.querySelector('input[type="email"]');
  const nameInput = document.querySelector('input[type="text"]');
  const form = document.querySelector('.insurance-form');
  const submitBtn = document.getElementById("submitBtn");

  // Name validation function
  function validateName(name) {
    const nameRegex = /^[А-Яа-яЁё\s-]{3,50}$/;
    return nameRegex.test(name);
  }

  // Email validation function
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  }

  // Add validation for all fields
  function validateForm() {
    let isValid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const kind = kindSelect.value;
    const client = clientSelect.value;

    // Name validation
    if (!validateName(name)) {
      nameInput.setCustomValidity('Пожалуйста, введите корректное ФИО (только русские буквы, пробелы и дефисы, от 3 до 50 символов)');
      isValid = false;
    } else {
      nameInput.setCustomValidity('');
    }

    // Email validation
    if (!validateEmail(email)) {
      emailInput.setCustomValidity('Пожалуйста, введите корректный адрес Gmail (например: example@gmail.com)');
      isValid = false;
    } else {
      emailInput.setCustomValidity('');
    }

    // Insurance type validation
    if (!kind) {
      kindSelect.setCustomValidity('Пожалуйста, выберите тип страхования');
      isValid = false;
    } else {
      kindSelect.setCustomValidity('');
    }

    // Client type validation
    if (!client) {
      clientSelect.setCustomValidity('Пожалуйста, выберите тип клиента');
      isValid = false;
    } else {
      clientSelect.setCustomValidity('');
    }

    return isValid;
  }

  // Add real-time validation for all fields
  nameInput.addEventListener('input', function() {
    const name = this.value.trim();
    if (name && !validateName(name)) {
      this.setCustomValidity('Пожалуйста, введите корректное ФИО (только русские буквы, пробелы и дефисы, от 3 до 50 символов)');
    } else {
      this.setCustomValidity('');
    }
  });

  emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
      this.setCustomValidity('Пожалуйста, введите корректный адрес Gmail (например: example@gmail.com)');
    } else {
      this.setCustomValidity('');
    }
  });

  function calculatePrice() {
    const kind = kindSelect.value;
    const client = clientSelect.value;

    if (!kind || !client) {
      result.textContent = "Стоимость: —";
      return;
    }

    const selectedType = Array.from(xml.getElementsByTagName("type"))
      .find(type => type.getAttribute("name") === kind);

    if (selectedType) {
      const price = selectedType.getElementsByTagName(client)[0].textContent;
      result.textContent = `Стоимость: ${price} BYN`;
    } else {
      result.textContent = "Данные не найдены";
    }
  }

  // Add event listeners for price calculation
  kindSelect.addEventListener("change", calculatePrice);
  clientSelect.addEventListener("change", calculatePrice);

  // Initial price calculation
  calculatePrice();

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      window.location.href = "../html/third.html";
    } else {
      // Show error messages
      form.reportValidity();
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.style.display = 'none';
    }
  });
});

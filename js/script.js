document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const backButton = document.querySelector('.btn-back');
    const imageUpload = document.getElementById('imageUpload');
    const editableImage = document.getElementById('editableImage');
    const rotationSlider = document.getElementById('rotationSlider');
    const brightnessSlider = document.getElementById('brightnessSlider');
    const changeImageBtn = document.getElementById('changeImageBtn');
    const editControls = document.querySelector('.edit-controls');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Form submitted successfully!');
        }
    });

    backButton.addEventListener('click', () => {
        alert('Are you sure you dont want to buy it?');
    });

    imageUpload.addEventListener('change', handleImageUpload);
    changeImageBtn.addEventListener('click', () => imageUpload.click());
    rotationSlider.addEventListener('input', applyImageEffects);
    brightnessSlider.addEventListener('input', applyImageEffects);

    function validateForm() {
        let isValid = true;

        if (emailInput.value.trim() === '') {
            isValid = false;
            showError(emailInput, 'Email or phone number is required');
        } else {
            hideError(emailInput);
        }

        if (passwordInput.value.trim() === '') {
            isValid = false;
            showError(passwordInput, 'Password is required');
        } else {
            hideError(passwordInput);
        }

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = 'red';
        error.style.fontSize = '12px';
        error.style.marginTop = '5px';
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.style.borderColor = 'red';
    }

    function hideError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message');
        if (error) {
            formGroup.removeChild(error);
        }
        input.style.borderColor = '';
    }

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                editableImage.src = event.target.result;
                editableImage.style.display = 'block';
                editControls.style.display = 'block';
                resetSliders();
            }
            reader.readAsDataURL(file);
        }
    }

    function applyImageEffects() {
        const rotation = rotationSlider.value;
        const brightness = brightnessSlider.value;
        editableImage.style.transform = `rotate(${rotation}deg)`;
        editableImage.style.filter = `brightness(${brightness}%)`;
    }

    function resetSliders() {
        rotationSlider.value = 0;
        brightnessSlider.value = 100;
        applyImageEffects();
    }
});


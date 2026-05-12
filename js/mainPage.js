// // Функция для очистки поля ввода и установки текста по умолчанию
// function clearInput(inputElement) {
//     inputElement.value = "";
// }

// A function for clearing the input field and setting the default text
function clearInput(inputElement) {
    inputElement.value = "";
}

// A function to restore the default text when clicked outside the input field
function restoreDefaultValue(inputElement, defaultValue) {
    if (inputElement.value === "") {
        inputElement.value = defaultValue;
    }
}

// Tracking clicks outside the input fields
document.addEventListener("click", function(event) {
    var inputElements = document.querySelectorAll("input[type='text']"); // We get all the input fields of the "text" type
    inputElements.forEach(function(inputElement) {
        if (!inputElement.contains(event.target)) { // We check that the click was not made inside the input field.
            restoreDefaultValue(inputElement, inputElement.getAttribute("data-default-value")); // Restoring the default value
        }
    });
});

function openPDF(way){
    window.open(way, '_blank');
}

function openHTML(path) {
  window.open(path, '_blank');
}

// function to send message in "Contact"
function writeLetter(form, event){
    event.preventDefault(); 

    let nameUser = form.name.value;
    let emailUser = form.email.value;
    const emailTo = "vushkevih@gmail.com";

    if(nameUser == ""){
        alert("Please write your name");
        return;
    }
    if(emailUser == ""){
        alert("Please write text of your letter");
        return;
    }
    const subject = `Piśmo klienta ${nameUser}` ;
    const body = `Hello!\n\n My name is ${nameUser}\n\n ${emailUser}\n\nWith best regards,\n ${nameUser}`;
    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // cleaning Local Storage after checking 
    localStorage.removeItem('savedName');
    localStorage.removeItem('savedEmail');
    // cleaning entered  data in the form
    form.name.value = "";
    form.email.value = "";
    // -------------------------------------------------------------

    window.open(mailtoLink, '_blank');
}

// Burger menu toggle
document.addEventListener("DOMContentLoaded", function () {
    const burgerButton = document.getElementById('burger-button');
    const menu = document.getElementById('main-menu');

    if (burgerButton && menu) {
        burgerButton.addEventListener('click', function () {
            menu.classList.toggle('active');
        });
    }
});

// jquery for carousel
$(document).ready(function() {

    const $carouselContainer = $('#carousel-images-container');
    
    // img autoloading
    const folderPath = "./imgProjektc/gallery/"; 
    const fileExtension = ".jpg";               
    let imageIndex = 1;                          

    function loadImagesSequentially() {
        const img = new Image(); 
        const currentSrc = folderPath + imageIndex + fileExtension; 

        img.onload = function() {
            const activeClass = (imageIndex === 1) ? 'active' : '';
            const itemHtml = `
                <div class="carousel-item ${activeClass}">
                    <img src="${currentSrc}" class="d-block w-100" alt="Gym gallery image ${imageIndex}">
                </div>
            `;
            $carouselContainer.append(itemHtml);
            imageIndex++; 
            loadImagesSequentially(); 
        };
        img.src = currentSrc;
    }

    // checking the local storage when loading the page
    // if there are saved data, insert it
    if (localStorage.getItem('savedName')) {
        $('#userName').val(localStorage.getItem('savedName'));
    }
    if (localStorage.getItem('savedEmail')) {
        $('#userEmail').val(localStorage.getItem('savedEmail'));
    }

    // entered data tracking and saving every updating
    $('#userName').on('input', function() {
        localStorage.setItem('savedName', $(this).val());
    });
    
    $('#userEmail').on('input', function() {
        localStorage.setItem('savedEmail', $(this).val());
    });

    // start after whole page
    loadImagesSequentially();
});



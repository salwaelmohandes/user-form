// ** User Creation Form ** //

const form = document.querySelector("form");

// Place focus on The first input of the form and creating inputs.
const name = document.getElementById("name");   
name.focus();

const email = document.querySelector("#mail");
const password = document.getElementById("password");

const userOccupation = document.getElementById('select');
const userState = document.getElementById('sel');

// Get the json data from the URL and create the 2 select fields.
window.onload = populateSelect();

    function populateSelect() {

        // Create XMLHttpRequest object, with GET method.
        const xhr = new XMLHttpRequest(), 
            method = 'GET',
            overrideMimeType = 'application/json',
            url = 'https://frontend-take-home.fetchrewards.com/form';  

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

                // Parse JSON data.
                let data = JSON.parse(xhr.responseText);

                for (var i = 0; i < data.occupations.length; i++) {
                
                    // Bind data to <select> element.
                    userOccupation.innerHTML = userOccupation.innerHTML +
                    '<option value="' + data.occupations[i] + '">' + data.occupations[i]  + '</option>';
                }

                // Hide the --select-- option from the dropdown menu after clicking the arrow
                userOccupation.options[0].setAttribute("hidden",true);
                
                for (var i = 0; i < data.states.length; i++) {
                
                // Bind data to <select> element.
                userState.innerHTML = userState.innerHTML +
                '<option value="' + data.states[i].name + '">' + data.states[i].abbreviation  + '</option>';
                }
                // Hide the --select-- option from the menu after clicking the arrow
                userState.options[0].setAttribute("hidden",true);
            }
        };
        xhr.open(method, url, true);
        xhr.send();
    }

// Create a validation function for each form field to check if it meets the requirements. 
const nameValidator = () => {
    return name.value.length > 0;
}
const emailValidator = () => {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
}

const passwordValidator = () => {
    return password.value.length > 0;
}

const occupationValidator = () => {  
    if(userOccupation.value !== "Default"){
    return true;
    }
}

const stateValidator = () => {  
    if(userState.value !== ""){
    return true;
    }
}

let validation = ()=>{
    if(nameValidator() && emailValidator() && passwordValidator() && occupationValidator() && stateValidator()){
        return true;
    }
};

// Append an error messages element to the DOM near the input.
let eMessage = document.createElement('span');
eMessage.textContent="Please enter a valid email address";
eMessage.style.fontSize='1.3em';
eMessage.style.color='#FF0000';
eMessage.classList.add("error");

let errMessage = document.createElement('span');
errMessage.textContent="This field is required";
errMessage.style.fontSize='.5em';
errMessage.style.color='#FF0000';
errMessage.classList.add("error");


function postJson(){
    const formUrl = "https://frontend-take-home.fetchrewards.com/form";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", formUrl, true);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};
    
    let responseData = JSON.stringify({
        "name": name.value,
        "email": email.value,
        "password": password.value,
        "occupation": userOccupation.value,
        "state": userState.value
    });
    console.log(responseData);

    xhr.send(responseData);
}

// Submit event listener on the form element to prevent the default submission if any fields are invalid.
form.addEventListener("submit", (e) => {

    const submit= document.querySelector("submit");
    
    let errorMessages = document.getElementsByClassName("error");

    // validation
    if (!nameValidator()){
        name.style.borderColor = '#FF0000 ';
        e.preventDefault();
    }else{ 
        name.style.borderColor='';
    }

    // Email validation check
    if (email.value === "") {
        email.parentNode.insertBefore(errMessage, email.nextSibling);
        email.style.borderColor = '#FF0000 ';
        e.preventDefault();
    } else if(!emailValidator()){
        email.parentNode.insertBefore(eMessage, email.nextSibling);
        email.style.borderColor = '#FF0000 ';
        e.preventDefault();
    } else{
        email.style.borderColor='';
        errMessage.setAttribute("hidden",true);
        eMessage.setAttribute("hidden",true);
    }   

    if (!passwordValidator()){
        password.style.borderColor = '#FF0000 ';
        e.preventDefault();
    }else{ 
        password.style.borderColor='';
    }

    if (!occupationValidator()){
        userOccupation.style.borderColor = '#FF0000 ';
        e.preventDefault();
    }else{ 
        name.style.borderColor='';
    }

    if (!stateValidator()){
        userState.style.borderColor = '#FF0000 ';
        e.preventDefault();
    }else{ 
        name.style.borderColor='';
    }

    if (!validation()){
        e.preventDefault();
    } else {
        postJson();  
        alert('Form Successfully Submitted') 
    }
});

// * // Additional work:
// Create real time error message and hide it when users complete the email format.
email.addEventListener('keyup', () => { 
    let errorMessages = document.getElementsByClassName("error");
    if (errorMessages.length > 0) {
        errorMessages[0].remove();
    }
    if (email.input==='') {
        email.parentNode.insertBefore(errMessage, email.nextSibling);
    }else if(!emailValidator()) {
        email.parentNode.insertBefore(eMessage, email.nextSibling);
    } 
});
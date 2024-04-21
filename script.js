
function increaseValue() {
    var slider = document.getElementById('myRan');
    var currentValue = parseInt(slider.value);
    if (currentValue < parseInt(slider.max)) {
        slider.value = currentValue + 1;
        document.getElementById('rangeValue').innerText = slider.value;
    }
}

function decreaseValue() {
    var slider = document.getElementById('myRan');
    var currentValue = parseInt(slider.value);
    if (currentValue > parseInt(slider.min)) {
        slider.value = currentValue - 1;
        document.getElementById('rangeValue').innerText = slider.value;
    }
}

function gen() {
    var len = document.getElementById("myRan").value;
    var characters = '';
    var upperCase = document.getElementById("toggle").checked;
    var lowerCase = document.getElementById("toggle1").checked;
    var num = document.getElementById("toggle2").checked;
    var speCh = document.getElementById("toggle3").checked;

    if (upperCase) {
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (lowerCase) {
        characters += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (num) {
        characters += '0123456789';
    }
    if (speCh) {
        characters += '!@#$%^&*';
    }

    var password = '';

    for (var i = 0; i < len; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById("output").innerHTML = password;
    var outputElement = document.getElementById("output");
    outputElement.textContent = '';
    typeText(outputElement, password, 0);
    var strength = checkPasswordStrength(password);
    var strengthElement = document.getElementById("strength");
    document.getElementById("strength").innerText = "Password Strength: " + strength;
    strengthElement.className = "";
    strengthElement.classList.add(strength.toLowerCase());
}

function typeText(element, text, i) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(function () {
            typeText(element, text, i);
        }, 50);
    }
}

function checkPasswordStrength(password) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()-_=+]).*$");
    var mediumRegex = new RegExp("^(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$");
    var weakRegex = new RegExp("^(?=.{6,}).*$");

    if (strongRegex.test(password)) {
        return "Very Strong";
    } else if (mediumRegex.test(password)) {
        return "Strong";
    } else if (weakRegex.test(password)) {
        return "Good";
    } else {
        return "Weak";
    }
}

function copyPass() {
    var password = document.getElementById("output").innerHTML;
    navigator.clipboard.writeText(password)
        .then(() => alert("Password copied to Clipboard!"))
        .catch(() => alert("Failed to copy password to Clipboard!"));
}

function savedPass() {
    var pass = document.getElementById("output").innerHTML;
    var savPass = JSON.parse(localStorage.getItem("savpass")) || [];
    var note = prompt("Enter a note for this password: ");
    savPass.push({ password: pass, note: note });
    localStorage.setItem("savpass", JSON.stringify(savPass));
    displaySavPass();
}

function displaySavPass() {
    var savPass = JSON.parse(localStorage.getItem("savpass")) || [];
    var savPassList = document.getElementById("savpass");
    savPassList.innerHTML = "";

    savPass.forEach(function (savedPass) {
        var listItem = document.createElement("li");
        listItem.textContent = "Note: " + savedPass.note + ", Password: " + savedPass.password;
        savPassList.appendChild(listItem);
    });
}

displaySavPass();

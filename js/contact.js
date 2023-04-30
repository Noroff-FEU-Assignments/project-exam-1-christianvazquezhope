const form = document.getElementById("contact");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
        alert("Name is required.");
        return;
    }

    if (name.length < 5) {
        alert("Name must have a minimum length of 5 characters.");
        return;
    }

    if (subject.length < 15) {
        alert("Subject must have a minimum length of 15 characters.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Email must be formatted like an email address.");
        return;
    }

    if (message.length < 25) {
        alert("The message must have a minimum length of 25 characters.");
        return;
    }

    form.submit();
    alert("Success!");
});
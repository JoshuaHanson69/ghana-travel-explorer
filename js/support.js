const faqItems = document.querySelectorAll(".faq-item");
const form = document.getElementById("support-form");
const feedback = document.getElementById("support-message");

// 1. Open and close the questions
faqItems.forEach(function (item) {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", function () {
    item.classList.toggle("open");
  });
});

// 2. Check and send the form
form.addEventListener("submit", function (event) {
  event.preventDefault();
  feedback.style.color = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const topic = document.getElementById("topic").value;
  const text = document.getElementById("message").value.trim();

  // Validation
  if (name === "") {
    feedback.textContent = "Please enter your name.";
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    feedback.textContent = "Please enter a valid email address.";
    return;
  }
  if (topic === "") {
    feedback.textContent = "Please choose a topic.";
    return;
  }
  if (text.length < 10) {
    feedback.textContent = "Your message should be at least 10 characters.";
    return;
  }

  // Save the message in the browser
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push({
    name: name,
    email: email,
    topic: topic,
    text: text,
    date: new Date().toLocaleDateString("en-GB")
  });
  localStorage.setItem("messages", JSON.stringify(messages));

  form.reset();
  feedback.style.color = "#2e7d32";
  feedback.textContent = "Thank you, " + name + ". Your message has been sent.";
});
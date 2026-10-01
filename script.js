const helloButton = document.querySelector("#hello-button");
const message = document.querySelector("#message");

helloButton.addEventListener("click", () => {
  message.textContent = "hello!";
  message.classList.remove("is-visible");
  void message.offsetWidth;
  message.classList.add("is-visible");

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const greeting = new SpeechSynthesisUtterance("hello");
    greeting.lang = "en-US";
    window.speechSynthesis.speak(greeting);
  }
});

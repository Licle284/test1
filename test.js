const test = require("node:test");
const assert = require("node:assert/strict");

test("clicking the button displays and speaks hello", () => {
  let clickHandler;
  let spokenGreeting;
  const classes = new Set();
  const button = {
    addEventListener(event, handler) {
      if (event === "click") clickHandler = handler;
    },
  };
  const message = {
    textContent: "ボタンを押してね",
    offsetWidth: 100,
    classList: {
      add(className) {
        classes.add(className);
      },
      remove(className) {
        classes.delete(className);
      },
    },
  };

  global.document = {
    querySelector(selector) {
      return selector === "#hello-button" ? button : message;
    },
  };
  global.window = {
    speechSynthesis: {
      cancel() {},
      speak(greeting) {
        spokenGreeting = greeting;
      },
    },
  };
  global.SpeechSynthesisUtterance = class {
    constructor(text) {
      this.text = text;
    }
  };

  require("./script.js");
  clickHandler();

  assert.equal(message.textContent, "hello!");
  assert.equal(classes.has("is-visible"), true);
  assert.equal(spokenGreeting.text, "hello");
  assert.equal(spokenGreeting.lang, "en-US");
});

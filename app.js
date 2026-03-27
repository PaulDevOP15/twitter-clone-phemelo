(function () {
  const modal = document.getElementById("tweet-modal");
  if (!modal) return;

  const openTriggers = document.querySelectorAll("[data-open-tweet-modal]");
  const closeTriggers = modal.querySelectorAll("[data-close-tweet-modal]");
  const textarea = document.getElementById("tweet-modal-input");
  const submitBtn = modal.querySelector("[data-modal-tweet-submit]");
  const draftsLink = modal.querySelector(".tweet-modal-drafts");

  let lastFocus = null;

  if (draftsLink) {
    draftsLink.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (textarea) {
      textarea.focus();
    }
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  const feedTextarea = document.getElementById("tweet-input");

  openTriggers.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      if (feedTextarea && textarea && el.closest("section.compose")) {
        textarea.value = feedTextarea.value;
      }
      openModal();
    });
  });

  closeTriggers.forEach(function (el) {
    el.addEventListener("click", function () {
      closeModal();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      if (textarea) {
        textarea.value = "";
      }
      if (feedTextarea) {
        feedTextarea.value = "";
      }
      closeModal();
    });
  }
})();

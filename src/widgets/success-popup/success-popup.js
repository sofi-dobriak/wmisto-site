const initSuccessPopup = () => {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-success-popup-link");
    if (!btn) return;

    e.preventDefault();

    const successBlock = btn.closest(".js-success-popup-block");
    const parentPopup = btn.closest(".js-backdrop");

    if (parentPopup && typeof parentPopup.toggle === "function") {
      parentPopup.toggle(false);

      setTimeout(() => {
        successBlock?.classList.remove("is-active");

        const formWrapper = parentPopup.querySelector(".contacts-form-block, [data-form-wrapper]");
        const policy = formWrapper?.querySelector(".form__policy-wrapper");
        if (policy) {
          policy.style.visibility = "";
          policy.style.opacity = "";
        }
        const btnSubmit = formWrapper?.querySelector("[data-btn-submit]");
        if (btnSubmit) btnSubmit.removeAttribute("disabled");
      }, 600);
    } else {
      successBlock?.classList.remove("is-active");
    }

    // шукаємо form через formRef, не через successBlock
    const formWrapper = btn.closest(".contacts-form-block, .js-form-container, [data-form-wrapper]");
    const policy = formWrapper?.querySelector(".form__policy-wrapper");
    if (policy) {
      policy.style.visibility = "";
      policy.style.opacity = "";
    }

    // знімаємо disabled з кнопки
    const btnSubmit = formWrapper?.querySelector("[data-btn-submit]");
    if (btnSubmit) btnSubmit.removeAttribute("disabled");
  });
};

document.addEventListener("DOMContentLoaded", initSuccessPopup);

function formHandler() {
   const form = document.querySelector("[data-main-form]");

   let defaultStep = 1;

   const buttonSend = form.querySelector("[data-form-send]");

   const firstStep = (el, val) => {
      const buttonArr = form.querySelectorAll(".action-first__elem");

      buttonArr.forEach((button) => {
         button.addEventListener("click", () => {
            defaultStep = 2;

            if (Number(val) <= defaultStep) el.style.display = "block";
         });
      });
   };

   const secondStep = (el, val) => {
      const buttonArr = form.querySelectorAll(".action-second__item");

      buttonArr.forEach((button) => {
         button.addEventListener("click", () => {
            defaultStep = 3;

            buttonSend.style.display = "inline-flex";

            if (Number(val) <= defaultStep) el.style.display = "block";
         });
      });
   };

   if (form) {
      const steps = form.querySelectorAll("[data-form-step]");

      steps.forEach((stepEl) => {
         const stepVal = stepEl.getAttribute("data-form-step");

         if (Number(stepVal) <= defaultStep) {
            stepEl.style.display = "block";
         }

         firstStep(stepEl, stepVal);
         secondStep(stepEl, stepVal);
      });

      const actionEl = document.querySelector("[data-section-action]");
      const thanksEl = document.querySelector("[data-section-thanks]");

      form.addEventListener("submit", (e) => {
         e.preventDefault();

         try {
            actionEl.remove();
            thanksEl.style.display = "block";
         } catch (err) {
            console.log(err);

            window.alert("Что-то пошло не так :(");
         }
      });
   }

   var textareaEl = document.getElementsByTagName("textarea");

   for (var i = 0; i < textareaEl.length; i++) {
      textareaEl[i].addEventListener("input", onChangeTextarea, false);
   }

   function onChangeTextarea() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";

      this.scrollHeight >= 180 ? (this.style.overflow = "auto") : (this.style.overflow = "hidden");

      if (this.scrollHeight <= 40) this.style.height = "24px";
   }
}
formHandler();

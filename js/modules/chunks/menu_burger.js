import { bodyLock, bodyUnLock } from '../functions/body_lock.js';

(() => {
  const header = document.querySelector('.header__wrapper');

  if (header) {
    const burgerIcon = header.querySelector('[data-burger-icon]');
    const menuBody = header.querySelector('[data-header-menu]');

    if (burgerIcon && menuBody) {
      burgerIcon.addEventListener('click', () => {
        header.classList.toggle('_active');
        burgerIcon.classList.toggle('_active');
        menuBody.classList.toggle('_active');

        if (burgerIcon.classList.contains('_active')) {
          bodyLock();
        } else {
          bodyUnLock();
        }
      });
    }
  }
})();

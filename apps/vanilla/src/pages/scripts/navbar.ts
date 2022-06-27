import M from 'materialize-css';

import { UserService } from '../../api/services/userService';
import { AuthService } from '../../api/services/authService';

document.addEventListener('DOMContentLoaded', () => {
  initDropDown();
  initNavbarForUser();
  initLogoutButton();
});

/**
 * Init navbar for user.
 * Set user email to dropdown and show it if user logged in.
 */
async function initNavbarForUser(): Promise<void> {
  const email = await UserService.getEmail();
  const userDropDown = document.querySelector<HTMLElement>('.navbar__user-dropdown-link');

  const dropDownTrigger = document.querySelector('.dropdown-trigger');
  const loginLink = document.querySelector<HTMLElement>('.navbar__login-link');
  if (email !== null && dropDownTrigger !== null) {
    const text = document.createTextNode(`Hello, ${email}`);
    dropDownTrigger.prepend(text);
    if (userDropDown === null) {
      throw new Error('There are no user dropdown.');
    }
    userDropDown.style.display = 'block';
  } else {
    if (loginLink === null) {
      throw new Error('There are no login link.');
    }
    loginLink.style.display = 'block';
  }
}

/** Init user dropdown. */
function initDropDown(): void {
  const profileDropDown = document.querySelector('.dropdown-trigger');
  if (profileDropDown !== null) {
    M.Dropdown.init(profileDropDown, { coverTrigger: false });
  }
}

/** Init logout button. */
function initLogoutButton(): void {
  const logoutButton = document.querySelector('.logout-link');
  if (logoutButton === null) {
    return;
  }
  logoutButton.addEventListener('click', async event => {
    event.preventDefault();
    await AuthService.logout();
    window.location.reload();
  });
}

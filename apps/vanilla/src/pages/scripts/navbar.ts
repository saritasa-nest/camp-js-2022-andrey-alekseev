import M from 'materialize-css';

import { UserService } from '../../api/services/userService';
import { AuthService } from '../../api/services/authService';
import { getElementOrRaiseError } from '../../../utils/query';

document.addEventListener('DOMContentLoaded', () => {
  initDropDown();
  initNavbarForUser();
  initLogoutButton();
});

/**
 * Init Navbar for user.
 * Set user email to dropdown and show it if user logged in.
 */
async function initNavbarForUser(): Promise<void> {
  const email = await UserService.getEmail();
  const userDropDown = getElementOrRaiseError<HTMLElement>('.navbar__user-dropdown-link');

  const dropDownTrigger = getElementOrRaiseError('.account-dropdown-trigger');
  const loginLink = getElementOrRaiseError<HTMLElement>('.navbar__login-link');
  if (email !== null && dropDownTrigger !== null) {
    const text = document.createTextNode(`Hello, ${email}`);
    dropDownTrigger.prepend(text);
    userDropDown.style.display = 'block';
  } else {
    loginLink.style.display = 'block';
  }
}

/** Init user dropdown. */
function initDropDown(): void {
  const profileDropDown = getElementOrRaiseError('.account-dropdown-trigger');
  M.Dropdown.init(profileDropDown, { coverTrigger: false });
}

/** Init logout button. */
function initLogoutButton(): void {
  const logoutButton = getElementOrRaiseError('.logout-link');
  logoutButton.addEventListener('click', async event => {
    event.preventDefault();
    await AuthService.logout();
    window.location.reload();
  });
}

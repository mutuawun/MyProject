// Elements from HTML
const menu = document.querySelector('.site-nav');
const menuButton = document.getElementById('menuToggle');
const filterButtons = document.querySelectorAll('.filter');
const menuItems = document.querySelectorAll('.menu-item');
const reservationForm = document.getElementById('reservationForm');

// Mobile menu
function toggleMenu() {
  const menuIsOpen = menu.classList.contains('open');

  if (menuIsOpen) {
    menu.classList.remove('open');
    menuButton.textContent = 'Menu';
  } else {
    menu.classList.add('open');
    menuButton.textContent = 'Close';
  }
}

// Category filter
function showMenuItems(category) {
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const itemCategory = item.dataset.category;

    if (category === 'all' || category === itemCategory) {
      item.style.display = 'grid';
    } else {
      item.style.display = 'none';
    }
  }
}

function selectFilterButton(button) {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove('active');
  }

  button.classList.add('active');
}

// Reservation form
function submitReservation(event) {
  event.preventDefault();

  const name = document.getElementById('guestName').value.trim();
  const date = document.getElementById('reservationDate').value;
  const guests = document.getElementById('guestCount').value;

  if (name === '' || date === '' || guests === '') {
    alert('Please complete all reservation fields.');
    return;
  }

  const TodaysDate = new Date(date).toLocaleString();
  const message = 'Thanks, ' + name + '! Your reservation for ' + guests + ' guest(s) on ' + TodaysDate + ' is being confirmed.';

   //Reset form after submission
  alert(message);
  reservationForm.reset();
}

// Button clicks
menuButton.onclick = toggleMenu;
reservationForm.onsubmit = submitReservation;

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].onclick = function () {
    const button = filterButtons[i];

    selectFilterButton(button);
    showMenuItems(button.dataset.category);
  };
}

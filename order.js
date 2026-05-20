// Elements from HTML
const menu = document.querySelector('.site-nav');
const menuButton = document.getElementById('menuToggle');
const cartBox = document.getElementById('cartItems');
const totalBox = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutBtn');
const filterButtons = document.querySelectorAll('.filter');
const menuItems = document.querySelectorAll('.menu-item');
const addButtons = document.querySelectorAll('.add-to-cart');

// Cart data (Start with an empty cart)
let cart = [];

// Mobile menu
function toggleMenu() {
  menu.classList.toggle('open');

  if (menu.classList.contains('open')) {
    menuButton.textContent = 'Close';
  } else {
    menuButton.textContent = 'Menu';
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

// Cart helpers
function findCartItem(name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      return cart[i];
    }
  }

  return null;
}

function addToCart(name, price) {
  const item = findCartItem(name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      quantity: 1
    });
  }

  showCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  showCart();
}

function getCartTotal() {
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  return total;
}

function showCart() {
  cartBox.innerHTML = '';

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const itemTotal = item.price * item.quantity;

    cartBox.innerHTML += `
      <div class="cart-item">
        <span>${item.name} x${item.quantity}</span>
        <span>KES${itemTotal.toFixed(2)}</span>
        <button onclick="removeFromCart(${i})">Remove</button>
      </div>
    `;
  }

  totalBox.textContent = getCartTotal().toFixed(2);
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  //Show total and clear cart
  alert('Thank you for your order! Total: KES' + totalBox.textContent);
  cart = [];
  showCart();
}

// Button clicks
menuButton.onclick = toggleMenu;
checkoutButton.onclick = checkout;

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].onclick = function () {
    const button = filterButtons[i];

    selectFilterButton(button);
    showMenuItems(button.dataset.category);
  };
}

for (let i = 0; i < addButtons.length; i++) {
  addButtons[i].onclick = function () {
    const button = addButtons[i];

    addToCart(button.dataset.name, button.dataset.price);
  };
}

showCart();

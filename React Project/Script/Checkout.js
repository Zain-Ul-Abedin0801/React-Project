import { cart, removefromcart } from './Cart.js';
import { books } from './Books.js';

// Load cart from local storage if it exists
const savedCart = JSON.parse(localStorage.getItem('cart'));
if (savedCart) {
  // Update cart to reflect saved data
  cart.length = 0; // Clear current cart
  savedCart.forEach(item => cart.push(item)); // Push saved items to cart
}

let cartsummaryHTML = '';
let subtotal = 0;
const shippingCost = 4.99; // Fixed shipping cost
const taxRate = 0.10; // Tax rate
const today = dayjs();
const threeday = today.add(3, 'days');
const threedaydelivery = threeday.format('dddd, MMMM D');

cart.forEach((cartitem) => {
  const bookId = Number(cartitem.bookId);
  let matchingbook;

  books.forEach((book) => {
    if (book.id === bookId) {
      matchingbook = book;
    }
  });

  if (!matchingbook) return;

  const itemTotalPrice = Number(matchingbook.price) * cartitem.quantity;
  subtotal += itemTotalPrice;

  cartsummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingbook.id}">
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingbook.image}" alt="${matchingbook.title}">
        <div class="cart-item-details">
          <div class="product-name">${matchingbook.title}</div>
          <div class="product-price">$${Number(matchingbook.price).toFixed(2)}</div>
          <div class="product-quantity">
            <input type="number" class="quantity-input" value="${cartitem.quantity}" min="1">
            <span class="update-quantity-link" data-book-id="${matchingbook.id}">Update</span>
            <span class="delete-quantity-link js-delete-book" data-book-id="${matchingbook.id}">Delete</span>
          </div>
          <div class="delivery-date">${threedaydelivery}</div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-cart-summary').innerHTML = cartsummaryHTML;

// Save the cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Event listeners for updating quantities
document.querySelectorAll('.update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const bookId = link.dataset.bookId;
    const quantityInput = link.previousElementSibling; // Get the input element
    const newQuantity = parseInt(quantityInput.value);

    // Update the quantity in the cart
    const cartItem = cart.find(item => item.bookId === bookId);
    if (cartItem) {
      cartItem.quantity = newQuantity; // Update quantity
    }

    // Save the updated cart to local storage
    saveCartToLocalStorage();
    recalculateOrderSummary(); // Recalculate totals
  });
});

// Function to recalculate order summary
function recalculateOrderSummary() {
  subtotal = 0;

  cart.forEach((cartitem) => {
    const bookId = Number(cartitem.bookId);
    let matchingbook;

    books.forEach((book) => {
      if (book.id === bookId) {
        matchingbook = book;
      }
    });

    if (!matchingbook) return;

    const itemTotalPrice = Number(matchingbook.price) * cartitem.quantity;
    subtotal += itemTotalPrice;
  });

  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  document.querySelector('.items-count').textContent = cart.length;
  document.querySelector('.items-total').textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector('.shipping-total').textContent = `$${shippingCost.toFixed(2)}`;
  document.querySelector('.subtotal-total').textContent = `$${(subtotal + shippingCost).toFixed(2)}`;
  document.querySelector('.tax-total').textContent = `$${tax.toFixed(2)}`;
  document.querySelector('.order-total').textContent = `$${total.toFixed(2)}`;
}

// Initialize summary display
recalculateOrderSummary();

// Handle delete action
document.querySelectorAll('.js-delete-book').forEach((link) => {
  link.addEventListener('click', () => {
    const bookId = link.dataset.bookId;
    removefromcart(bookId);
    
    const container = document.querySelector(`.js-cart-item-container-${bookId}`);
    container.remove();

    saveCartToLocalStorage(); // Save updated cart
    recalculateOrderSummary();
  });
});

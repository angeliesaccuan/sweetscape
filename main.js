const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

searchIcon.addEventListener('click', () => {
    searchBar.style.display = 'block';
});

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

 // JavaScript for toggling dropdown menu
    document.getElementById("menu-icon").addEventListener("click", function() {
      document.querySelector(".dropdown-content").classList.toggle("show");
    });

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.fa-bars')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }

// Define cart array to store items
let cart = [];

// Function to toggle the display of the cart form
function showCartItems() {
    var cartForm = document.getElementById("cart-form");
    if (cartForm.style.display === "none" || cartForm.style.display === "") {
        cartForm.style.display = "block";
    } else {
        cartForm.style.display = "none";
    }
}

// Function to add items to the cart
function addToCart(event, itemName, itemPrice) {
    event.preventDefault(); // Prevent form submission
    var cartItems = document.querySelector(".cart-items");
    var cartTotal = document.querySelector(".cart-total");
    
    // Create a new cart item element
    var cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    
    // Construct the HTML for the cart item
    cartItem.innerHTML = `
        <div class="item-info">
            <span class="item-name">${itemName}</span>
            <span class="item-price">${itemPrice}</span>
            <div class="quantity-controls">
                <span class="decrease-quantity" onclick="decreaseQuantity(event)">-</span>
                <span class="quantity">1</span>
                <span class="increase-quantity" onclick="increaseQuantity(event)">+</span>
            </div>
        </div>
        <i class="fa-solid fa-trash delete-icon" onclick="removeCartItem(event)"></i>
    `;
    
    // Append the cart item to the cart items container
    cartItems.appendChild(cartItem);
    
    // Update the cart badge count
    var cartBadge = document.getElementById("cart-badge");
    var itemCount = parseInt(cartBadge.textContent);
    cartBadge.textContent = itemCount + 1;
}

// Function to remove items from the cart
function removeCartItem(event) {
    var cartItem = event.target.closest(".cart-item");
    cartItem.remove(); // Remove the cart item
    updateCartTotal(); // Update the total price
    var cartBadge = document.getElementById("cart-badge");
    var itemCount = parseInt(cartBadge.textContent);
    cartBadge.textContent = itemCount - 1; // Update the cart badge count
}

// Function to decrease the quantity of an item in the cart
function decreaseQuantity(event) {
    var quantityElement = event.target.nextElementSibling;
    var currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
        updateCartTotal(); // Update the total price
    }
}

// Function to increase the quantity of an item in the cart
function increaseQuantity(event) {
    var quantityElement = event.target.previousElementSibling;
    var currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
    updateCartTotal(); // Update the total price
}

// Function to update the cart total
function updateCartTotal() {
    var cartItemContainer = document.querySelector(".cart-items");
    var cartItems = cartItemContainer.querySelectorAll(".cart-item");
    var total = 0;
    cartItems.forEach(function(cartItem) {
        var priceElement = cartItem.querySelector(".item-price");
        var price = parseFloat(priceElement.textContent);
        var quantityElement = cartItem.querySelector(".quantity");
        var quantity = parseInt(quantityElement.textContent);
        total += price * quantity;
    });
    document.querySelector(".cart-total").textContent = "$" + total.toFixed(2);
}

// Initialize cart badge count
document.getElementById("cart-badge").textContent = "0";

document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the form data
        const formData = new FormData(event.target);
        const reviewId = event.target.getAttribute('data-review-id');  // Get the associated review ID
        const commentsListId = `comments-list-${reviewId}`;

        // Send the form data to the server
        fetch('/submit_comment', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // If the comment was successfully submitted, reload the comments list for this review
                loadComments(reviewId);
            } else {
                console.error('Error submitting comment:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

// Function to load existing comments for a specific review
function loadComments(reviewId) {
    const commentsListId = `comments-list-${reviewId}`;
    const commentsList = document.getElementById(commentsListId);

    fetch(`/get_comments?review_id=${reviewId}`)
        .then(response => response.json())
        .then(comments => {
            commentsList.innerHTML = ''; // Clear existing comments

            // Loop through the comments and create HTML elements for each
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';

                // Comment header
                const commentHeader = document.createElement('div');
                commentHeader.className = 'comment-header';
                commentHeader.innerHTML = `
                    <span class="comment-name">${comment.name}</span>
                    <span class="comment-time">${comment.time}</span>
                `;

                // Comment body
                const commentBody = document.createElement('div');
                commentBody.className = 'comment-body';
                commentBody.innerHTML = `<p>${comment.text}</p>`;

                // Append header and body to the comment element
                commentElement.appendChild(commentHeader);
                commentElement.appendChild(commentBody);

                // Append the comment element to the comments list
                commentsList.appendChild(commentElement);
            });
        })
        .catch(error => console.error('Error loading comments:', error));
}

// Load existing comments when the page loads for each review card
document.querySelectorAll('.review_card').forEach(card => {
    const reviewId = card.querySelector('.comment-form').getAttribute('data-review-id');
    loadComments(reviewId);
});
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const mobileNavbar = document.querySelector(".mobile-navbar");
    
    menuIcon.addEventListener("click", function() {
        // Toggle the visibility of the mobile navbar
        if (mobileNavbar.style.display === "none" || !mobileNavbar.style.display) {
            mobileNavbar.style.display = "flex";
        } else {
            mobileNavbar.style.display = "none";
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const searchInput = searchBar.querySelector('input[type="search"]');

    // Toggle the visibility of the search bar when the search icon is clicked
    searchIcon.addEventListener('click', function() {
        searchBar.classList.toggle('active');
        searchInput.focus(); // Focus the search input when the search bar is visible
    });

    // Function to handle search input and navigate to the product or pack
    function handleSearch(query) {
        // Create a mapping of search terms to product or pack IDs
        const searchMapping = {
            "pumpkin snickerdoodle": "pumpkin-snickerdoodle",
            "red velvet": "red-velvet",
            "caramel swirl chocolate": "caramel-swirl-chocolate",
            "salted caramel": "salted-caramel",
            "raspberry linzer": "raspberry-linzer",
            "brown butter toffee": "brown-butter-toffee",
            "strawberry bliss": "strawberry-bliss",
            "blueberry choco bliss": "blueberry-choco-bliss",
            "single pack": "single-pack",
            "double pack": "double-pack",
            "three pack": "three-pack",
            "four pack": "four-pack",
            "six pack": "six-pack",
            "eight pack": "eight-pack"
        };

        // Normalize the query to lowercase for case-insensitive matching
        query = query.toLowerCase();

        // Search for the query in the search mapping
        for (const [key, value] of Object.entries(searchMapping)) {
            // If the query matches a product or pack name
            if (key.includes(query)) {
                // Navigate to the corresponding section or element
                const targetElement = document.getElementById(value);
                if (targetElement) {
                    // Scroll to the target element
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            }
        }

        // Optionally, handle the case where no match is found
        console.log("No match found for the search query.");
    }

    // Add an event listener for form submission
    searchBar.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const query = searchInput.value;
        handleSearch(query);
    });
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {

    /* ================= CART COUNT SYNC (ADDED) ================= */
    function syncCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartDisplay = document.getElementById("cart-count");
        if (cartDisplay) {
            cartDisplay.textContent = cart.length;
        }
        localStorage.setItem("cartCount", cart.length);
    }

    syncCartCount();

    /* ================= ADD TO CART ================= */
    document.addEventListener("click", (e) => {

        const btn = e.target.closest(".add-to-cart");
        if (!btn) return;

        e.preventDefault();

        const card = btn.closest(".card");
        const title = card.querySelector(".title").innerText;
        const priceText = card.querySelector(".amount").innerText;
        const price = parseFloat(priceText.replace("$", ""));

        cart.push({
            title: title,
            price: price
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        /* 🔹 ADDED: auto sync count */
        syncCartCount();

        alert("✅ Product added to cart successfully!");
    });

    /* ================= SEARCH ================= */
    const searchIcon = document.getElementById("searchIcon");
    if (searchIcon) {
        searchIcon.addEventListener("click", () => {
            const query = prompt("Search product name:");
            if (!query) return;

            const value = query.toLowerCase();
            let found = false;

            document.querySelectorAll(".card").forEach(card => {
                const title = card.querySelector(".title");
                if (!title) return;

                if (title.innerText.toLowerCase().includes(value)) {
                    card.style.display = "block";
                    found = true;
                } else {
                    card.style.display = "none";
                }
            });

            if (!found) alert("❌ No matching product found");
        });
    }

    /* ================= USER ICON ================= */
    const userIcon = document.getElementById("userIcon");
    if (userIcon) {
        userIcon.addEventListener("click", () => {
            window.location.href = "contact.html";
        });
    }

});

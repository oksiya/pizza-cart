function pizzaCart() {
    // Helper function to find item in cart by size
    function findCartItem(size) {
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].size === size) {
                return this.cart[i];
            }
        }
        return null;
    }

    return {
        cart: [],
        paymentAmount: 0,
        showCheckout: false,
        checkoutMessage: '',
        addPizza(size) {
            let price = size === 'small' ? 31.99 : size === 'medium' ? 58.99 : 87.99;
            let found = this.findCartItem(size);
            if (found) {
                found.quantity++;
                found.totalPrice += price;
            } else {
                this.cart.push({ size: size, quantity: 1, totalPrice: price });
            }
        },
        removePizza(size) {
            let price = size === 'small' ? 31.99 : size === 'medium' ? 58.99 : 87.99;
            let item = this.findCartItem(size);
            if (item) {
                item.quantity--;
                item.totalPrice -= price;
                if (item.quantity === 0) {
                    this.cart.splice(this.cart.indexOf(item), 1);
                }
            }
        },
        get totalSmallPizzas() {
            let item = this.findCartItem('small');
            return item ? item.quantity : 0;
        },
        get totalMediumPizzas() {
            let item = this.findCartItem('medium');
            return item ? item.quantity : 0;
        },
        get totalLargePizzas() {
            let item = this.findCartItem('large');
            return item ? item.quantity : 0;
        },
        get totalCost() {
            return this.cart.reduce((total, item) => total + item.totalPrice, 0);
        },
        checkout() {
            this.showCheckout = true;
        },
        confirmPayment() {
            if (this.paymentAmount >= this.totalCost) {
                this.checkoutMessage = "Enjoy your pizzas!";
                this.cart = [];
                this.paymentAmount = 0;
                setTimeout(() => {
                    this.showCheckout = false;
                    this.checkoutMessage = '';
                }, 3000);
            } else {
                this.checkoutMessage = "Sorry - that is not enough money!";
                setTimeout(() => {
                    this.checkoutMessage = '';
                }, 3000);
            }
        },
        // Attach the helper function to the instance
        findCartItem
    };
}

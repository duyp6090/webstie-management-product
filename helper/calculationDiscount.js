function calculateDiscount(listItems) {
    // Calculation new price for products
    const newListItems = listItems.map((item) => {
        item.newPrice = Math.floor(item.price - (item.price * item.discountPercentage) / 100);
        return item;
    });

    return newListItems;
}

module.exports = calculateDiscount;

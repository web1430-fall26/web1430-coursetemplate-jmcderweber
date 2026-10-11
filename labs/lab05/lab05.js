/*Skills practiced
Designing an array of objects with consistent structure
Using .filter(), .map(), and .find() without mutating the source array
Separating data, logic, and rendering into distinct functions
Dynamically rendering a list of cards from a dataset
Updating the DOM in response to a filter control */

import { products } from './data.js';

/*
Logic functions
filterByCategory(productList, category)
Returns a new array containing only products where product.category === category. 
If category is 'All', returns the full list unchanged.


getCategories(productList)
Returns an array of unique category strings derived from the product list. 
The result should include 'All' as the first element.

Example: ['All', 'Books', 'Apparel', 'Electronics', 'Accessories']

Hint: use a Set to deduplicate: [...new Set(productList.map(p => p.category))]
If you add equal elements to a set, only the first will be saved

formatPrice(amount)
Returns a formatted price string: 49.99 → '$49.99'.

sortByPrice(productList, direction)
Returns a new sorted array. direction is 'asc' (lowest first) or 'desc' (highest first). Do not mutate the original array — use .slice() before sorting.

Don't forget to commit after implementing each set of functions.
*/

function filterByCategory(productList, category) {
    if (category === 'All') {
    return productList;
    }
    return productList.filter( product => product.category === category )
}


function getCategories(productList) {
    const uniqueCategories = ['All', ...new Set(productList.map(p => p.category))];
    console.log(uniqueCategories);

    return uniqueCategories;
}
// Test the getCategories function using the table in data.js
// getCategories(products) // (5) ['All', 'Books', 'Apparel', 'Electronics', 'Accessories']


function formatPrice(amount){
    return `$${amount.toFixed(2)}`;
}
// console.log(formatPrice(49.99)); // $49.99


function sortByPrice(productList, direction) {
    const sortedList = productList.slice(); // .slice without arguments just creates a shallow copy of the array, shallow meaning the objects themselves are not copied, only the array structure is.
    if (direction === 'asc') {
        sortedList.sort((a, b) => a.price - b.price); // sort method is Timsort in most modern JS engines. It iterates through until the array is sorted. What's important here is if the comparison function returns a negative value, it doesn't swap the elements.
    } else if (direction === 'desc') {
        sortedList.sort((a, b) => b.price - a.price);
    }
    // could also just have sorted forward and then .reverse()d the array for descending order if needed
    return sortedList;
}
// console.log(sortByPrice(products, 'asc')[0]); // {id: 10, name: 'HDMI Cable', category: 'Accessories', price: 12.99, inStock: true}
// console.log(sortByPrice(products, 'desc')[0]); // {id: 3, name: 'Mechanical Keyboard', category: 'Electronics', price: 89.99, inStock: false}


/* Rendering functions

renderProductCard(product)
Creates and returns an <article> element with class product-card containing:

Product name in an <h2>
Category in a <p> with class product-category
Formatted price in a <p> with class product-price
A stock status indicator: a <span> reading "In Stock" or "Out of Stock", with class in-stock or out-of-stock accordingly
A <button> reading "Add to Cart" that is disabled when inStock is false

renderProductList(productList, container)
Clears container and appends a renderProductCard(product) for each product in the list. If the list is empty, display a <p> reading "No products found."

renderCategoryFilter(categories, container)
Renders a <select> element into container with one <option> per category. The value of each option should equal the category string.


Don't forget the commits
*/

function renderProductCard(product){
    const article = document.createElement('article');
    article.classList.add('product-card');

    const h2 = document.createElement('h2');
    h2.textContent = product.name;
    article.append(h2);

    const categoryP = document.createElement('p');
    categoryP.classList.add('product-category');
    categoryP.textContent = product.category;
    article.append(categoryP);

    const priceP = document.createElement('p');
    priceP.classList.add('product-price');
    priceP.textContent = formatPrice(product.price);
    article.append(priceP);

    const stockStatSpan = document.createElement('span');
    if (product.inStock === true){ // could remove the explicit comparison and just use if (product.inStock), but this is more readable
        stockStatSpan.classList.add('in-stock')
    } else if (product.inStock === false){
        stockStatSpan.classList.add('out-of-stock')
    } else {
        stockStatSpan.classList.add('unknown-stock'); // just in case
    }
    article.append(stockStatSpan);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.disabled = !product.inStock;
    article.append(addToCartButton);

    return article;

}

/*renderProductList(productList, container)
Clears container and appends a renderProductCard(product)
 for each product in the list. If the list is empty, display a <p> 
 reading "No products found."
*/

function renderProductList(productList, container) {
    container.textContent = ''; // clear. 

    if (productList.length === 0){
        const noProductsP = document.createElement('p');
        noProductsP.textContent = 'No products found.';
        container.append(noProductsP);
        return;
    }

    for (const product of productList){
        container.append(renderProductCard(product));
    }
}


/* renderCategoryFilter(categories, container)
Renders a <select> element into container with one <option> 
per category. The value of each option should equal the category string. */

function renderCategoryFilter(categories, container){
    const select = document.createElement('select');
    for (const category of categories){
        const option = document.createElement('option');

        option.textContent = category;
        option.value = category;
        select.append(option);
        
    }
    container.append(select);
}

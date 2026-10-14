/*Skills practiced
Designing an array of objects with consistent structure
Using .filter(), .map(), and .find() without mutating the source array
Separating data, logic, and rendering into distinct functions
Dynamically rendering a list of cards from a dataset
Updating the DOM in response to a filter control */

import { products } from './data.js';

// DOM references
const filterBar = document.getElementById('filter-bar');
//product-grid
const productGrid = document.getElementById('product-grid');


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
    return productList.filter( product => product.category === category ) // filter by category
}


function getCategories(productList) {
    const uniqueCategories = ['All', ...new Set(productList.map(p => p.category))];
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
// in order to properly use the sortByPrice function, I would need to pass the function as parameter to another function or use it directly with a product list.

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
        stockStatSpan.textContent = "In Stock  "
    } else if (product.inStock === false){
        stockStatSpan.classList.add('out-of-stock')
        stockStatSpan.textContent = "Out of Stock  "
    } else {
        stockStatSpan.classList.add('unknown-stock'); // just in case
        stockStatSpan.textContent = "Unknown Stock Status"
    }
    article.append(stockStatSpan);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.disabled = !product.inStock;
    article.append(addToCartButton);

    if (!product.inStock) {
        article.classList.add('grayed');
    }

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



// In labs/lab05/lab05.js, on DOMContentLoaded:

// Call renderCategoryFilter(getCategories(products), filterBar) to populate the filter
// Call renderProductList(products, productGrid) to show all products initially
// Add a change listener to the category filter: when it changes, filter the 
// products and re-render the list
// Add a change listener to the sort select: when it changes, apply the sort 
// and re-render (preserving any active category filter)
document.addEventListener("DOMContentLoaded", function (){
    renderCategoryFilter(getCategories(products), filterBar);


    renderProductList(sortByPrice(products, 'asc'), productGrid);

    const categorySelect = filterBar.querySelector('select'); 
    const sortOrderSelect = document.getElementById('sort-order');

    categorySelect.addEventListener('change', function () {
        const selectedCategory = categorySelect.value;
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        renderProductList(sortByPrice(filteredProducts, sortOrderSelect.value), productGrid); 
        
        if (selectedCategory === 'All') {
            renderProductList(sortByPrice(products, sortOrderSelect.value), productGrid);
        }
    });

    sortOrderSelect.addEventListener('change', function () {
        const selectedCategory = categorySelect.value;
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        renderProductList(sortByPrice(filteredProducts, sortOrderSelect.value), productGrid);

        if (selectedCategory === 'All') {
            renderProductList(sortByPrice(products, sortOrderSelect.value), productGrid);
        }
    });

});
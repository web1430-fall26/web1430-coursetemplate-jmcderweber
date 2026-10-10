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

Don't forget the commits
*/



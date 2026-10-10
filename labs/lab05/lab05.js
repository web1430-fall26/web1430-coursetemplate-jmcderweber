/*Skills practiced
Designing an array of objects with consistent structure
Using .filter(), .map(), and .find() without mutating the source array
Separating data, logic, and rendering into distinct functions
Dynamically rendering a list of cards from a dataset
Updating the DOM in response to a filter control */



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


formatPrice(amount)
Returns a formatted price string: 49.99 → '$49.99'.

sortByPrice(productList, direction)
Returns a new sorted array. direction is 'asc' (lowest first) or 'desc' (highest first). Do not mutate the original array — use .slice() before sorting.
*/





/* Rendering functions

renderProductCard(product)
Creates and returns an <article> element with class product-card containing:

Product name in an <h2>
Category in a <p> with class product-category
Formatted price in a <p> with class product-price
A stock status indicator: a <span> reading "In Stock" or "Out of Stock", with class in-stock or out-of-stock accordingly
A <button> reading "Add to Cart" that is disabled when inStock is false
*/

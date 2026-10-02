const books = [
  { id: 1, title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian" },
  { id: 2, title: "Dune", author: "Frank Herbert", year: 1965, genre: "Science Fiction" },
  { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, genre: "Fantasy" },
  { id: 4, title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", year: 1954, genre: "Fantasy" },
  { id: 5, title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953, genre: "Dystopian" }
];

function getBooksAfter(books, year){
    return books.filter(book => book.year > year);
}
console.log(getBooksAfter(books, 1950)); // Should return books published after 1950


function getTitles(books) {
    return books.map(book => book.title);
}
console.log(getTitles(books)); // Should return an array of all book titles


function findByTitle(books, title) {
    return books.find(book => book.title === title);
}
console.log(findByTitle(books, "Dune")); // Should return the book object for "Dune", shows in console because it's not an array of objects

console.log(findByTitle(books, "asdf")); // returns undefined because asdf doesn't exist in the array


function groupByGenre(books) {
    return books.reduce((groups, book) => {
        if (!groups[book.genre]) {
            groups[book.genre] = [];
        }
        groups[book.genre].push(book);
        return groups;
    }, Object.create(null));
}
console.log(groupByGenre(books)); // Should return an object grouping books by genre
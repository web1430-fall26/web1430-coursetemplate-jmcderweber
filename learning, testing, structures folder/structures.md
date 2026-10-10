<!-- a place for aggregating/indexing important information I've learned>

Assignment 1:
HTML
/* head
title
nav
ul
li
body
main
section
h1
h2
h3
figure
figcaption
form
footer*/

can use <a> tags to link to another part of the page with an id, which you want to do in a <nav> tag for accessibility
Ex:
<nav>
    <ul> // unordered list
        <li><a href="#About">About Us</a></li> // list item
href = 'id of thing you want to jump to"
<h2 id="About">What We Do</h2> // id declaration in the HTML


CSS has a :root, where root variables are declared. 
You can declare colors, screen widths, fonts, font sizes, or basically any valid attribute in here, and then
assign those variables to other things in the file.

Can attach CSS to any HTML tag or class

Ex: 
:root {
  --color-primary: #494bc57c;
  --color-text: #111827;
  --color-bg: #e7d8d8;
  --space-md: 1rem;
  --space-lg: 2rem;
  --font-body: 'Inter', sans-serif;
}

body { // assign to every instance of the <body> tag
  color: var(--color-text);
  background-color: var(--color-bg);
  font-family: var(--font-body);
  padding: var(--space-md);
}

Declare HTML Class
<section class="beanie-photos">  

.beanie-photos { // assign to every instance of that class in CSS
  display: grid;
  grid-template-columns: fit-content(100%);
}





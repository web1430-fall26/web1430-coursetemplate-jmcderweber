Why is event delegation better than adding a click listener to each individual button?
What does aria-expanded communicate, and to whom?
What would break if you used display: none in JavaScript directly instead of toggling the hidden attribute and controlling visibility through CSS?
Why does the tablist use roving tabindex while the accordion does not?

Event delegation allows you to write code for one container and apply it to many children, which makes it easier to handle buttons created with JavaScript. 

aria-expanded communicates the state of an expandable element (in this case an accordion panel), which is helpful for people who use screen readers. 

For simplicity, you generally want one way to control any state. Using display: none and the hidden attribute separately could make a mismatch between what the DOM does and what the JavaScript says it should do. 

Certain designs give certain promises. Accordions are supposed to follow tab order, while tabs are meant to only have the selected one in the tab order. 
In the HTML, I used section tags rather than article tags because the contents of them aren't going to be redistributed on the web, and must be interpreted within the context of the page.

<!-- I didn't have much content that would meaningfully change between mobile and desktop, and the images that would are using grid-template-columns with fit-content(), so those shrink with the device screen. It could maybe have been done better with min-width, since the images shrink rather small, but I couldn't seem to figure out how to get that to work. min-width currently in the css for the grid, but does nothing. 

As said earlier, the images are laid out in a CSS grid of four for better viewing (and because either a grid or flexbox was required). It seems to function at every size, but there's probably a better thing to use than what I did. -->
New: a @media (min-width: 600px) query has been added to shrink the CSS grid to 1 column if the window is the size of a phone screen. (some other stuff that affected nothing has been deleted)


All text has a contrast level of at least 6 with its background, and every interactable element is navigable with the tab key. All tags should be semantic, so the user should be able to understand the page layout with a screen reader. 
<!-- The header for the beanie images was put above the section tag because if it was put inside it would mess with the grid structure.  --> 
New: The beanie photos section title was moved inside of the section, and recieved its own class with the property grid-column: 1 / -1; to fix the spacing issue. 

This webpage is for people who want to know more about the WeHat Beanie club, and also for those who would like to get a free beanie. 

If I (ever) come back to this at some point, I'd like to add a hero section, make the colors more accurate to a pastel color scheme, possibly center the headers (if it looks better), get the beanie photos into better ratios (if possible), and if I'm feeling serious, add a backend that actually collects the name and emails put into the website with a debounce on there so people can't just spam it. 
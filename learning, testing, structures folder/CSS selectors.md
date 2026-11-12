using document.querySelectorAll('insert text here') 

#idName - get all elements with ID idName

Spaces mean search the descendants of the first thing for the second thing and select those
dots mean classes, and come after element types
#s mean IDs
commas mean search for everything in the list


'div p' - selects all <p> elements that are inside of a div element, no matter the depth

'div > p' - Selects all <p> elements that are direct children of a div element (1 down)

'div, p' - Selects all <div> and <p> elements

'p.className' - gets all <p> elements with the class titled "className"

'.className' - gets all elements with class "className"

'.className1.className2' - gets all elements with both classes className1 and 2

'*' - selects all elements

'div + p' - Selects all <p> elements placed immediately after <div> elements

'p ~ ul' - selects every <ul> element that is preceded by a <p> element

[attr] - selects all elements with an attr attribute

[attr=_blank] - selects all elements with the attr attribute set to _blank


+, >, and ~ are after selectors
+ selects all elem2 immediately after elem1 

'>' selects all that are direct children (differs by can have stuff between elem1 and elem2 and how many are selected)

~ selects all of elem2 that have an elem1 before them

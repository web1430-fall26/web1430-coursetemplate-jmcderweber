Process reflection (in notes.md)
Answer in 4–6 sentences:

What did your getCategories function look like before you used Set, and how did the approach change?
What happened when you tried to sort the array in place with .sort() without .slice() first?
How did you keep the active category filter applied when the sort order changed?


Before I saw the hint to use a Set, I was thinking of using a loop that iterated over the array to check if the new category wasn't in the array already, and add it if it wasn't. Thankfully I saw the hint before trying to implement that. 

Sorting the array in place with sort() would have changed the original array. Using slice without parameters duplicates the array to avoid changing the original. 

The active category logic is duplicated between two different event listeners, so it essentially just recalculates each time you change one of the sorting categories. The categories are always grabbed and passed each time the event handlers are called to keep consistency. This seemed like the cleanest solution, though I suppose I could've made a separate function and just called it inside of each event handler. 
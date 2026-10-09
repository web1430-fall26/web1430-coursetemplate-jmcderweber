Process reflection (in notes.md)
Answer in 4–6 sentences:

Where did you use a guard clause, and what would have happened without it?
What happened when you tested with missing or out-of-range inputs?
What would need to change if you wanted to add a fourth trail difficulty level?


There are guard clauses in the renderTable function. If those didn't exist, people would have been able to use out-of-range inputs in the inputs.
The validateInputs function also protects from some invalid input, but those technically
aren't guard clauses. 
If the code was nested instead, it would be harder to read and debug.

When I had missing inputs on the trail finder, it said either Invalid max distance or hours.
Same story with invalid inputs over or under the set limits.
The mi to km table returned a table full of NaN with missing mile increments, and an 
empty table with a missing row number. Without the guard code, putting in out-of-range
inputs outputs the correct numbers, but with it, it returns an error for the user to read.

If I wantd to add a fourth trail difficulty level, I'd need to go to the
trail recommender section and add a new option to that dropdown menu.
I'd also need to add a trail into that category if I wanted it to function.
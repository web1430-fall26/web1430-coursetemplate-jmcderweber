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

If I wanted to add a fourth trail difficulty level, I'd need to go to the
trail recommender section and add a new option to that dropdown menu.
I'd also need to add a trail into that category if I wanted it to function.


# 10/14/2026

Both guard clauses work (25 rows and a 0.05 increment both show errors). But the loop starts at i = 0, so increment 5 with 4 rows gives 0, 5, 10, 15 instead of the required 5, 10, 15, 20; use increment * (i + 1). A blank increment also gets past the guard as NaN (NaN < 0.1 is false) and fills the table with NaN, so add a Number.isNaN check.
 - fixed, could still use some error spans and aria-describedby attributes

 validateInputs, findTrail, renderRecommendation, milesToKm and renderTable are cleanly separated. Both click handlers are anonymous arrow functions; name them (e.g. handleFind, handleGenerate) and pass the names to addEventListener.
  - fixed

  Everything is built with createElement and textContent, but renderRecommendation and renderTable clear their output with innerHTML = '' (lines 84 and 130). Use textContent = '' or replaceChildren() so the file has no innerHTML.
   - I saw this before turning it in. I kept the innerHTML thing because it was in there by default and wasn't sure I was supposed to remove it. The textContent implementation has been done. 
    - Fixed


The testing answer is specific (a NaN table for a missing increment, an empty table for missing rows) and the fourth-level answer is right. The guard-clause answer does not say what would actually happen without it (e.g. 25 rows would build a 25-row table), and saying out-of-range inputs "output the correct numbers" without the guard works against the point of the guard.

 - I suppose the reasons we add the guard clauses are for practice, because the data doesn't go that high (or low), and people don't need that much information. The server might also bear some of the burden, so you don't want someone generating thousands of rows of information they don't need. 
  - Without the guard clauses, people would be able to put in a negative or very high number in the trail finder that wouldn't match the data well, and they'd be able to generate thousands of rows, or input a negative amount of rows that just wouldn't generate any data, though the Miles and Kilometers headers would still generate. People also might not know what they did wrong and just report it as broken.

  Testing with no input in x without guard clauses:
    - Max distance: returns "No trail matches your criteria. Try adjusting your distance or time." because this is the default behavior if no trail is found. With the guard clause, it returns 'Invalid max distance' because undefined == 0, and a type coersion was made. 
    - Available time: same story as above, except it returns 'Invalid max hours' instead of 'Invalid max distance'
    - Increment: Returns a table full of NaN. 
    - Num rows: Returns an empty table.

Out-of-range numbers won't input in the trail finder because of the max and min in the HTML, but if they were put in anyway, you'd either still get the first trail that matched the conditions, or "No trail matches your criteria. Try adjusting your distance or time." 

  Technically, putting a negative increment outputs correct negative numbers, and putting in a large number of rows gives that many rows, which is why I answered how I did above. Negative numbers are not practically useful though, and are easily converted by just removing the negative sign. I don't see the point in adding a guard clause for this except for practice, unless it just seems more professional that way. I suppose if those numbers were used for a more complex program it'd be more important. 
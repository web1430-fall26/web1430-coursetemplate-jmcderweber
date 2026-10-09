Write 4–6 sentences addressing:

What calculator did you build and who is it for?
How did you separate calculation logic from rendering logic, and why does that separation matter?
What edge cases did your validation catch, and did you discover any you hadn't anticipated?
What would you add if you extended this tool?


I built a bill splitter for people who want to eat out together and split the bill.

Calculation and rendering logic are in different functions. This matters because it sets clear boundaries between the purposes of functions, and makes understanding and debugging easier. 

I didn't expect the loose conversion between what I think was undefined and 0. I only realized this when I saw that I had to name the exact error in the message on Canvas, and found that Bill Amount without an input gave "Bill amount must be greater than 0". Strict greater or less than doesn't exist, so I had to restrict on whether it was strictly equal to zero or not to get the right effect. This... seems to be broken now. It used to work... I guess I should have committed more to see what broke it.

If I were to make this tool better, I'd work on the "Above baseline" things mentioned on Canvas, listed below. 

1. Store the last calculation result in sessionStorage and restore it on page reload
2. Add a "calculation history" list showing the last three results
3. Support keyboard submission (pressing Enter in any input field triggers the calculation)

As it is, I should work on catching up on my other assignments. I may resubmit later with these implemented. 
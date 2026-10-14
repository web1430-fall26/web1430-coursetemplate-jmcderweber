Write 4–6 sentences addressing:

What calculator did you build and who is it for?
How did you separate calculation logic from rendering logic, and why does that separation matter?
What edge cases did your validation catch, and did you discover any you hadn't anticipated?
What would you add if you extended this tool?


I built a bill splitter for people who want to eat out together and split the bill.

Calculation and rendering logic are in different functions. This matters because it sets clear boundaries between the purposes of functions, and makes understanding and debugging easier. 

I didn't expect the loose conversion between what I think was undefined and 0. I only realized this when I saw that I had to name the exact error in the message on Canvas, and found that Bill Amount without an input gave "Bill amount must be greater than 0". 

--Strict greater or less than doesn't exist, so I had to restrict on whether it was strictly equal to zero or not to get the right effect. This... seems to be broken now. It used to work... I guess I should have committed more to see what broke it.--

The bug has been fixed with your suggestion. The validator now takes raw string input, tests if it is empty, and then converts it to a number. 

<!-- It seems now that with the aria-describedby correctly describing the fields, the "cannot be empty" and "Number of people must be integer" error message outputs no longer work, but are replaced by pop-up textboxes instead. Interesting. I am not sure how the pop-ups work exactly, but they don't seem to replace every type of behavior, and some of the default messages I programmed in still go through.   -->

aria-describedby had nothing to do with it, this is just default behavior when using a form with those attributes. 

Above baseline:
1. Store the last calculation result in sessionStorage and restore it on page reload
2. Add a "calculation history" list showing the last three results
3. Support keyboard submission (pressing Enter in any input field triggers the calculation)

I have added keyboard submission from the "Above baseline" suggestions. If I were to continue working on it, I would add the storage for the last calculation result, because it's much more likely a person using this would need to review how the last bill was split than seeing the result of the last three bill splits, but only if you keep the page open. 


New Commit messages: 
ebc2df68b0535b9384c49f0a2cb5fe89307b9466 - A2: bug fixes, bill and tip inputs now take money and fractional inputs, num people input takes whole numbers. JS setting and removing of aria-describedby has been replaced with a static descriptor in the HTML. Error spans have been added. handleCalculate is now called by listening for submit on the form rather than on button click or the form running handleCalculate from the HTML when it detects submitting.

e680d6439970d143290e5e5b4e764cf9090cb1a9 - A2: re-added novalidate to form to allow custom blank entry error messages to work
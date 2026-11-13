//
const faqContainer = document.querySelector(".faq")

// class="tab-list"
const tabList = document.querySelectorAll(".tab-list")[0]

//
const panelList = document.querySelectorAll("div[role='tabpanel']")

/* Write a function initFaq(faqContainer) that:

Adds a single click listener to faqContainer (event delegation)
When a click is detected, 
- checks if event.target.matches('.faq-question')
- Finds all other open questions and closes them (removes the hidden attribute trick: toggle hidden on the answer div, set aria-expanded to the correct string)
- Toggles the clicked question open or closed
Specifically, for the clicked button:

Toggle aria-expanded between "true" and "false" (as strings — ARIA attributes are always strings)
Toggle the hidden attribute on the associated answer panel (use answerEl.hidden = !answerEl.hidden or toggleAttribute('hidden'))
For all other questions: set aria-expanded="false" and hidden = true (only one answer open at a time).

 */

function initFaq(faqContainer) {
  faqContainer.addEventListener('click', (event) => { 
    if (event.target.matches('.faq-question')) { // - checks if event.target.matches('.faq-question')

      const clickedQuestion = event.target;
      const answerEl = clickedQuestion.nextElementSibling;

      clickedQuestion.setAttribute('aria-expanded', 'true');
      answerEl.toggleAttribute('hidden');

      // - Finds all other open questions and closes them (removes the hidden attribute trick: toggle hidden on the answer div, set aria-expanded to the correct string)
        const allQuestions = faqContainer.querySelectorAll('.faq-question');

        allQuestions.forEach((question) => {
          if (question !== clickedQuestion) {
            const answerEl = question.nextElementSibling;
            question.setAttribute('aria-expanded', 'false');
            answerEl.setAttribute('hidden', '');
          }
        }); 

    }
  });
}
initFaq(faqContainer) // this actually adds the event listener, won't function without


/* 
Write a function initTabs(tabListContainer) that handles both mouse and keyboard.

Click behaviour

Add a click listener to tabListContainer
When a [role="tab"] button is clicked:
Set aria-selected="false" on all tab buttons
Hide all tab panels (set hidden = true)
Set aria-selected="true" on the clicked tab
Show the panel whose id matches event.target.getAttribute('aria-controls') (remove hidden)

Keyboard behaviour — roving tabindex

Because these buttons carry role="tab" inside a role="tablist", they are one composite widget, not three separate buttons. Assistive technology users expect one Tab press to enter the tablist, arrow keys to move between tabs, and the next Tab press to leave. See the roving-tabindex section of the Week 06 lecture notes for the reasoning and the full pattern.

Keep exactly one tab in the tab order: the selected tab gets tabIndex = 0, every other tab gets tabIndex = -1. Update this every time the selection changes — including on click.
Add a keydown listener to tabListContainer. On ArrowRight / ArrowLeft, move the selection one tab forward or backward and wrap around at the ends. On Home / End, jump to the first or last tab.
Call event.preventDefault() when you handle an arrow key, so the page does not scroll.
Call .focus() on the newly selected tab, so focus and selection stay together.
Factor the shared work into one selectTab(index) helper and call it from both the click and the keydown paths — the two should not have separate copies of the logic. */
function initTabs(){ // Start here, supposed to be initTabs(tabListContainer)
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]')); 
  setActiveTab(tabs, panelList, 0);
}
initTabs()

function setActiveTab(tabs, panels, newIndex) { // takes a tab array?, the content meant to be in each tab, and the index of the one you want open
  tabs.forEach((tab, i) => { // forEach executes a provided function once for each element of an array
                              // parameters in this case are (currentTab, currentTabIndex)
    const selected = i === newIndex; // boolean, true if the desired index === the current index
    tab.setAttribute("aria-selected", String(selected)); // sets the aria-selected value to true if the desired index === the current index, false if not
    tab.tabIndex = selected ? 0 : -1;      // roving tabindex, // tabindex="-1" means "not in the tab order, but still focusable by script".
                                        // essentially, if selected is true, set this tab's index to 0, which allows it to be focused by the Tab key
                                        // if selected is false, set the tab's index to -1, which removes that tab from tab order
                                        // this sets the states that allow for users to use the tab key to change the focus through the page,
                                        // and leave one tab selected while being able to move between tabs with arrow keys and move on with the tab key
    panels[i].hidden = !selected; // hides each panel when the tab is not selected
  });
  tabs[newIndex].focus();                   // move focus with the selection
}

tabList.addEventListener("keydown", (event) => { // the logic for selecting tabs with arrow keys, runs on keydown with focus on any element within tabList
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]')); // .from creates a shallow copy of any object with a length property
                                                                     // in this case, the querySelectorAll returns a NodeList
                                                                     //  of all things in the tabList with role = tab
                                                                     // and Array.from() creates an array from the NodeList
                                                                     // this is done because different things can be done with arrays
  const current = tabs.indexOf(document.activeElement); // gets index (as in, 0, 1, 2, position in array of the active element (which is the one with focus)), or returns -1 if none found
  if (current === -1) return; // does nothing if the active element isn't found inside tabs

  let next = null;
  if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
  if (event.key === "ArrowLeft")  next = (current - 1 + tabs.length) % tabs.length;
  if (event.key === "Home")       next = 0;
  if (event.key === "End")        next = tabs.length - 1;

  if (next !== null) { // because it would be null, skip if none of the key events were triggered 
                       // notably, the event listener/function still triggers, it just doesn't do anything
    event.preventDefault();   // stop the arrow key from scrolling the page
    setActiveTab(tabs, panelList, next);
  }
});
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

      answerEl.toggleAttribute('hidden');
      clickedQuestion.setAttribute('aria-expanded', String(!answerEl.hidden));

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
function initTabs(tabListContainer) {
  const tabs = Array.from(tabListContainer.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function selectTab(index, moveFocus = true) {
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== tabs[index].getAttribute('aria-controls');
    });

    if (moveFocus) tabs[index].focus();
  }

  tabListContainer.addEventListener('click', (event) => {
    const clickedTab = event.target.closest('[role="tab"]');
    const index = tabs.indexOf(clickedTab);
    if (index !== -1) selectTab(index);
  });

  tabListContainer.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    let next = null;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;

    if (next !== null) {
      event.preventDefault();
      selectTab(next);
    }
  });

  selectTab(0, false);
}

initFaq(document.querySelector(".faq")) // this actually adds the event listener, won't function without
initTabs(document.querySelector(".tab-list"));

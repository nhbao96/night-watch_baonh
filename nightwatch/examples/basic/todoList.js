/**
 * End-to-end test for the sample Vue3+Vite todo app located at
 * https://github.com/nightwatchjs-community/todo-vue
 */
describe('To-Do List End-to-End Test', function() {

  // using the new element() global utility in Nightwatch 2 to init elements
  // before tests and use them later
  const todoElement = element('#new-todo-input');
  const addButtonEl = element('form button[type="submit"]');

  it('should add a todo using global element()', async function() {
    ///////////////////////////////////////////////////
    // browser can now also be accessed as a global   |
    ///////////////////////////////////////////////////

    // adding a new task to the list
    try {
      await browser
        .navigateTo('https://docs.google.com/forms/d/e/1FAIpQLScGdSVewLryjbeQODJT0DOxvKlvwkvEb1T12o3XzleOjK5U6w/viewform?zarsrc=31&fbclid=IwAR2kqOKwdkMZVcN-A7f-cCg8PY4rtrtvscZZuGqzOUTjH_bBXNY0e6qeNWw')
        .waitForElementVisible('body', 1000)
        .execute('window.scrollTo(0, document.body.scrollHeight)')
        .click('div[jsname="OCpkoe"]')
        .elements('css selector', '.SG0AAe .nWQGrd zwllIb [role="radio"]', function(result) {
          // Get all the options in the dropdown
          console.log('size of buttons ='+ result.value.length);
          const randomOptionIndex = Math.floor(Math.random() * result.value.length); // Choose a random index
          const randomOption = result.value[randomOptionIndex].ELEMENT; // Get the random option element
    
          browser
            .elementIdClick(randomOption) // Click on the random option
            .end(); // End the test
        });
    } catch (err) {
      console.error(err);
      // handle the error here, e.g. retry the command or exit the program
    }
    

    ///////////////////////////////////////////////////
    // global expect is equivalent to browser.expect  |
    ///////////////////////////////////////////////////

    // verifying if there are 5 tasks in the list
    await expect.elements('#todo-list ul li').count.toEqual(5);

    // verifying if the 4th task if the one we have just added
    const lastElementTask = element({
      selector: '#todo-list ul li',
      index: 4
    });

    await expect(lastElementTask).text.toContain('what is nightwatch?');

    // find our task in the list and mark it as done
    const inputElement = await lastElementTask.findElement('input[type="checkbox"]');
    await browser.click(inputElement);

    // verify if there are 3 tasks which are marked as done in the list
    await expect.elements('#todo-list ul li input:checked').count.toEqual(3);
  });

});
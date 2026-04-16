// @ts-check
// ^ Enable Type-Checking with JSDoc Annotations.

/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

// Set `35` as the default, since `fullButton` is initially "clicked".
let costPerDay = 35;
let numberOfDaysSelected = 0;

// Elements

const dayButtons = document.querySelectorAll(".day-selector li");
const fullButton = document.getElementById("full");
const halfButton = document.getElementById("half");
const clearButton = document.getElementById("clear-button");
const calculatedCost = document.getElementById("calculated-cost");

// Type-checker requires null-checks for outputs of `getElementById()`, 
// `querySelectorAll()`, and `querySelector()`.
// Note: The "Not" operator (!) implicitly converts 0 & nullish values (null/undefined) to false.
// Note 2: Checking for the nullablity of `calculatedCost` here does not tell the 
//         type-checker that it will not be null in `updateCalculatedCost()`
if (!dayButtons.length || !fullButton || !halfButton || !clearButton)
    throw new Error("Required Elements in Booking page does not exist")


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

dayButtons.forEach((element) => {
    element.addEventListener("click", () => {
        if (!element.classList.contains("clicked")) {
            element.classList.add("clicked");
            numberOfDaysSelected += 1;
            updateCalculatedCost();
        }
    });
});


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

clearButton.addEventListener("click", () => {
    // Avoid unnecessary work ... check whether it's necessary first.
    if (numberOfDaysSelected == 0)
        return;

    dayButtons.forEach((element) => {
        element.classList.remove("clicked");
        numberOfDaysSelected = 0;
        updateCalculatedCost();
    });
});


/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

halfButton.addEventListener("click", () => {
    costPerDay = 20;
    halfButton.classList.add("clicked");
    fullButton.classList.remove("clicked");
    updateCalculatedCost();
});


// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

fullButton.addEventListener("click", () => {
    costPerDay = 35;
    fullButton.classList.add("clicked");
    halfButton.classList.remove("clicked");
    updateCalculatedCost();
});


/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function updateCalculatedCost() {
    // Check whether `calculatedCost` is nullish here.
    // As checking outside the scope of this function does not satisfy the type-checker.
    if (!calculatedCost)
        throw new Error("Expected calculated-cost Element does not exist")

    const newCost = costPerDay * numberOfDaysSelected;
    /** Convert newCost to string with no decimal places (i.e. integer). */
    calculatedCost.textContent = newCost.toFixed(0);
}

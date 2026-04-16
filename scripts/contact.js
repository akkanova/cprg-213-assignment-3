// @ts-check
// ^ Enable Type-Checking with JSDoc Annotations.

// when the "submit-button" is clicked, the contents of the contact-page are replaced with a single <p> element that reads "Thank you for your message" in size 24 font.

// hint: you can change the style of an element by modifying the value of that element's .style.fontSize, or by updating its .classList.

const submitButton = document.getElementById("submit-button");
const contactPage = document.getElementById("contact-page");

// Type-checker requires null-checks for outputs of `getElementById()`.
// Note: The "Not" operator (!) implicitly converts nullish values to false.
if (!submitButton || !contactPage)
    throw new Error("Required Elements in the Contact page does not exist");

submitButton.addEventListener("click", function() {
    // Clear the content of content-page
    contactPage.innerHTML = "";
    
    // Create the new element with the expected text-content 
    // and font-size (.large-text has 24px font).
    const message = document.createElement("p");
    message.textContent = "Thank you for your message!";
    message.classList.add("large-text");

    // Add the new element to the DOM tree.
    contactPage.appendChild(message);
});

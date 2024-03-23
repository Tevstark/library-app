const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${
      this.read ? "read" : "not read"
    }`;
  };
}

let formData = {};

const form = document.querySelector("#book-details-form");
form.addEventListener("input", (event) => {
  formData[event.target.id] = event.target.value;
});

function addBookToLibrary(title, author, pages, read) {
  return myLibrary.push(new Book(title, author, pages, read));
}

function validateFormData(data) {
  // Check if all form fields are filled out
  for (const key in data) {
    if (data[key].trim() === "") {
      return false;
    }
  }

  // Check if the number of pages is a positive integer
  if (data.pages <= 0 || isNaN(data.pages)) {
    return false;
  }

  // If all checks pass, return true
  return true;
}

function createBookCard(data) {
  // Create the card element
  const card = document.createElement("div");

  // Create the title element
  const titleElement = document.createElement("h2");
  titleElement.textContent = data.title;
  titleElement.classList.add("card-title");
  card.appendChild(titleElement);

  // Create the author element
  const authorElement = document.createElement("p");
  authorElement.textContent = `Author: ${data.author}`;
  authorElement.classList.add("card-text");
  card.appendChild(authorElement);

  // Create the pages element
  const pagesElement = document.createElement("p");
  pagesElement.textContent = `Pages: ${data.pages}`;
  pagesElement.classList.add("card-text");
  card.appendChild(pagesElement);

  // Create the read element
  const readElement = document.createElement("p");
  readElement.textContent = `Read: ${data.read ? "Yes" : "No"}`;
  readElement.classList.add("card-text");
  card.appendChild(readElement);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-book");
  removeButton.textContent = "Remove Book";
  removeButton.addEventListener("click", () => {
    card.remove();
  });
  card.appendChild(removeButton);


  // Set the class for the card element
  card.classList.add("card");

  // Return the card element
  return card;
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + #show-modal-btn");
const closeButton = document.querySelector("dialog #close-modal-btn");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  event.preventDefault();

  if (confirm("Are you sure you want to close")) {
    form.reset();

    dialog.close();
  }
});
const addBookBtn = document.querySelector("#submit");

function displayBookCard(card) {
  const container = document.querySelector("#book-card-container");
  container.appendChild(card);
}

addBookBtn.addEventListener("click", () => {
  event.preventDefault();

  if (validateFormData(formData)) {
    // Submit the form data
    console.log(formData);

    form.reset();

    closeButton.click();

    // Create the book card
    const bookCard = createBookCard(formData);

    // Display the book card
    displayBookCard(bookCard);

    formData = {};
    const formFields = document.querySelectorAll(
      "#book-details-form input, #book-details-form select"
    );
    formFields.forEach((field) => {
      formData[field.id] = field.value;
    });
    formData.read = document.querySelector("#read").checked;
  } else {
    alert("Please fill out all the form fields before submitting.");
  }
});


//1 -  Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}



// --------------------------- UI CONTROLLER -----------------------------------------//
// 2 - UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function(book) {
  const list = document.querySelector('#book-list');
  // Create a tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `
  list.appendChild(row);
}

// Delete Book
UI.prototype.deleteBook = function (target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}


UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text 
  // div.appendChild(document.createTextNode(message));
  div.innerText = message;
  // Get parent
  const container = document.querySelector('.container');
  // Get element to insert it before
  const form = document.querySelector('#book-form');
  // Insert element
  container.insertBefore(div, form);
  // Set time out
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 2000);
  
}


// ---------------------------------------------------------------------//


// ---------------------------- EVENTS CONTROLLER -----------------------------------------//

// 3 - EVENT ADD BOOK
document.querySelector('#book-form').addEventListener('submit', function(e) {
  
  // Get form values
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
  
  // Instantiate book
  const book = new Book (title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validade
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show success alert
    ui.showAlert('Book Added!!', 'success');
    // Clear fields
    ui.clearFields();

  }

  e.preventDefault();
})

// EVENT TO REMOVE BOOK

document.querySelector('#book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI();
  
  // Delete book
  ui.deleteBook(e.target);
  
  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault()
})


// ---------------------------------------------------------------------//























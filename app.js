// Book Constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;


}


// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book){

    const list = document.querySelector('#book-list');

    // Create a tr element
    const row = document.createElement('tr');
    
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    // Add row to with innerHTML to the list
    list.appendChild(row);
}

// Clear fields
UI.prototype.clearFields = function(){

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';

}


// Event Listeners

document.querySelector('#book-form').addEventListener('submit', function(e){
    // Form Values
    const title = document.querySelector('#title').value, 
          author = document.querySelector('#author').value;
          isbn = document.querySelector('#isbn').value;

    // Instantiate a book
    const book = new Book(title, author, isbn);


    // Instantiate UI
    const ui = new UI();

    // Add book to list
    ui.addBookToList(book);

    // Clear fields for next input
    ui.clearFields();

    e.preventDefault();
})
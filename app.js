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

// Show alerts

UI.prototype.showAlert = function(message, className){
    // Create a div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.container');
    // Get insert anchor point
    const form = document.querySelector('#book-form');

    // Insert new alert
    container.insertBefore(div, form);

    // Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)




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

    // Validate inputs

    if(title === '' || author === '' || isbn === ''){
        // Error Alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        // Add book to list
        ui.addBookToList(book);

        // Clear fields for next input
        ui.clearFields();

    }

    

    e.preventDefault();
})
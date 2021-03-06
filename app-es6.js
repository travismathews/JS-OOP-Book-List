class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book){
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

    showAlert(message, className) {
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
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Local Storage Class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        
        return books;
    }
    
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;
            
            // Add book to UI
            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for Add Book
document.querySelector('#book-form').addEventListener('submit', function (e) {
    // Form Values
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value;
    isbn = document.querySelector('#isbn').value;

    // Instantiate a book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate inputs
    if (title === '' || author === '' || isbn === '') {
        // Error Alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to Local Storage
        Store.addBook(book);

        // Show success alert
        ui.showAlert('Book succesfully added', 'success');

        // Clear fields for next input
        ui.clearFields();

    }
    e.preventDefault();
})

// Event Listener for Deletion of Book
document.querySelector('#book-list').addEventListener('click', function (e) {

    // Instantiate UI
    const ui = new UI();

    // Delete Book from ui
    ui.deleteBook(e.target);

    // Delete from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show deletion alert
    ui.showAlert('Book successfully removed', 'success');

    e.preventDefault();
});


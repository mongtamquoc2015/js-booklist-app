// Book class: Represent a book
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}
// UI Class: Handle UI Tasks
class UI {
	static displayBooks() {
		const storeBooks = [
			{
				title: 'Book one',
				author: 'Namisan',
				isbn: 121212
			},
			{
				title: 'Book two',
				author: 'Namisan',
				isbn: 343434
			},
			{
				title: 'Book three',
				author: 'Namisan',
				isbn: 565656
			}
		];
		const books = storeBooks;
		books.forEach(book => UI.addBookToList(book));
	}

	static addBookToList(book) {
		const list = document.querySelector('#book-list');
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;
		list.appendChild(row);
	}

	static clearField() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}

	static deleteBook(element) {
		if (element.classList.contains('delete')) {
			element.parentNode.parentNode.remove();
		}
	}

	static showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.textContent = message;

		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		container.insertBefore(div, form);

		// Vanish in 2 second
		setTimeout(() => document.querySelector('.alert').remove()
			, 2000);

	}
}
// Store Class: Handles Storage

// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', event => {
	event.preventDefault();

	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;

	// validate
	if (title == '' || author == '' || isbn == '') {
		UI.showAlert('Please fill in all field', 'danger');
	} else {
		const book = new Book(title, author, isbn);
		UI.addBookToList(book);
		UI.showAlert(`Add ${title} book to successfuly!`, 'success');
		UI.clearField();
	}
});

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', event => {
	event.preventDefault();
	UI.deleteBook(event.target);
	UI.showAlert('Remove success', 'success');
});
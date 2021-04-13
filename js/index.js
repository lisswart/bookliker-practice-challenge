document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});

function fetchBooks() {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(json => renderBooks(json));
}

function renderBooks(books) {
    books.forEach(book => {
        loadImage(book);
        getAuthor(book);
        getBookTitle(book);
        getBookSubtitle(book);
        getBookDescription(book);
        const bulletBook = document.querySelector('#list');
        const bookDiv = document.createElement('div');
        bulletBook.appendChild(bookDiv);
    });
}

function getBookTitle(book) {
    const unorderedList = document.querySelector('#list');
    const list = document.createElement('li');
    list.innerHTML = `<a href="#"><h3><i>${book.title}</i></h3></a>`;
    unorderedList.appendChild(list);
}

function getBookSubtitle(book) {
    const unorderedList = document.querySelector('#show-panel');
    const list = document.createElement('h4');
    list.textContent = `${book.subtitle}`;
    unorderedList.appendChild(list);
}

function getBookDescription(book) {
    const unorderedList = document.querySelector('#show-panel');
    const list = document.createElement('p');
    list.textContent = `${book.description}`;
    list.className = "description";
    unorderedList.appendChild(list);
}

function loadImage(book) {
    const unorderedList = document.querySelector('#show-panel');
    const imgDiv = document.createElement('div');
    const imgBook = document.createElement('img');
    imgBook.src = book.img_url;
    unorderedList.appendChild(imgDiv);
    imgDiv.appendChild(imgBook);
    imgDiv.style.display = 'flex';
    imgDiv.style.justifyContent = 'left';
}

function getAuthor(book) {
    const unorderedList = document.querySelector('#show-panel');
    const list = document.createElement('h2');
    list.textContent = `${book.author}`;
    list.className = "author";
    unorderedList.appendChild(list);
}
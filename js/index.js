document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});

const showPanel = document.querySelector('#show-panel'); 

function fetchBooks() {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(data => renderBookTitles(data));
}

function renderBookTitles(books) {
    books.forEach(book => {
        getBookTitle(book);
    });
}

function getBookTitle(book) {
    const unorderedList = document.querySelector('#list');
    const list = document.createElement('li');
    list.innerHTML = `<a href="#${book.title}"><h3><i>${book.title}</i></h3></a>`;
    list.addEventListener("click", event => {
        event.preventDefault();
        renderBook(book);
    })
    unorderedList.appendChild(list);
}

function renderBook(book) {
    clearBook();
    loadImage(book);
    addLikeButton();
    getAuthor(book);
    getBookSubtitle(book);
    getBookDescription(book);
} 

function clearBook() {
    showPanel.innerHTML = "";
}

function getBookSubtitle(book) {   
    const subTitle = document.createElement('h4');   
    subTitle.textContent = `${book.subtitle}`;
    showPanel.appendChild(subTitle);
}

function getBookDescription(book) {   
    const description = document.createElement('p');   
    description.textContent = `${book.description}`;
    showPanel.appendChild(description);
}

function loadImage(book) {
    const individualBookPanel = document.createElement('div');
    individualBookPanel.style.marginTop = "2em";
    individualBookPanel.id = `${book.title}`;
    const imgBook = document.createElement('img');
    imgBook.src = book.img_url;
    showPanel.appendChild(individualBookPanel);
    individualBookPanel.appendChild(imgBook);
}

function getAuthor(book) {   
    const showPanel = document.querySelector('#show-panel'); 
    const author = document.createElement('h2');
    author.textContent = `${book.author}`;
    showPanel.appendChild(author);
}

function addLikeButton() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.name = 'like';
    input.value = "Like";
    input.type = "submit";
    showPanel.appendChild(form);
    form.appendChild(input);
    input.addEventListener("click", event => {
        event.preventDefault();
        sendPatch();
    })
}

function sendPatch() {
    return fetch("http://localhost:3000/books", {
        method: 'patch',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({"users": [
            {"id":2, "username":"auer"},
            {"id":8, "username":"maverick"},
            {"id":1, "username":"pouros"}
        ]})
    })
    .then(response => response.json())
    .then(json => console.log(json))
}

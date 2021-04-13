document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});

function fetchBooks() {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(data => renderBooks(data));
}

function renderBooks(books) {
    books.forEach(book => {
        getBookTitle(book);
        loadImage(book);
        addLikeButton();
        getAuthor(book);
        getBookSubtitle(book);
        getBookDescription(book);
    });
}

function getBookTitle(book) {
    const unorderedList = document.querySelector('#list');
    const list = document.createElement('li');
    list.innerHTML = `<a href='#${book.title}'><h3><i>${book.title}</i></h3></a>`;
    unorderedList.appendChild(list);
}

function getBookSubtitle(book) {
    const showPanel = document.querySelector('#show-panel');    
    const subTitle = document.createElement('h4');
    subTitle.className = "hidden";    
    subTitle.textContent = `${book.subtitle}`;
    showPanel.appendChild(subTitle);
}

function getBookDescription(book) {   
    const showPanel = document.querySelector('#show-panel');
    const description = document.createElement('p');
    description.className = "hidden";    
    description.textContent = `${book.description}`;
    showPanel.appendChild(description);
}

function loadImage(book) {
    const showPanel = document.querySelector('#show-panel');
    const individualBookPanel = document.createElement('div');
    individualBookPanel.id = `${book.title}`;
    const imgBook = document.createElement('img');
    imgBook.className = "hidden";
    imgBook.src = book.img_url;
    showPanel.appendChild(individualBookPanel);
    individualBookPanel.appendChild(imgBook);
    //showPanel.appendChild(imgBook);
}

function getAuthor(book) {   
    const showPanel = document.querySelector('#show-panel'); 
    const author = document.createElement('h2');
    author.className = "hidden";
    author.textContent = `${book.author}`;
    showPanel.appendChild(author);
}

function addLikeButton() {
    const showPanel = document.querySelector('#show-panel');
    const form = document.createElement('form');
    const input = document.createElement('input');
    form.className = "hidden";
    input.name = 'like';
    input.value = "Like";
    input.type = "submit";
    showPanel.appendChild(form);
    form.appendChild(input);
    input.addEventListener("click", sendPatch);
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

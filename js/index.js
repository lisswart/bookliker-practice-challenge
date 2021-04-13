document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});

function fetchBooks() {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(json => bookTitles(json));
}

function bookTitles(books) {
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
    list.innerHTML = `<a href='#'><h3><i>${book.title}</i></h3></a>`;
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
    description.className = "hidden description";    
    description.textContent = `${book.description}`;
    showPanel.appendChild(description);
}

function loadImage(book) {
    const showPanel = document.querySelector('#show-panel');
    const imgBook = document.createElement('img');
    imgBook.className = "hidden image";
    imgBook.src = book.img_url;
    showPanel.appendChild(imgBook);
}

function getAuthor(book) {   
    const showPanel = document.querySelector('#show-panel'); 
    const author = document.createElement('h2');
    author.className = "hidden author";
    author.textContent = `${book.author}`;
    showPanel.appendChild(author);
}

function addLikeButton() {
    const showPanel = document.querySelector('#show-panel');
    const like = document.createElement('button');
    like.value = "like";
    like.name = 'like';
    like.textContent = "LIKE";
    showPanel.appendChild(like);
}
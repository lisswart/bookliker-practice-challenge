document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});

const showPanel = document.querySelector('#show-panel'); 

function fetchBooks() {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(renderBookTitles);
}

function renderBookTitles(books) {
    const unorderedList = document.querySelector('#list');
    books.forEach(book => {
        unorderedList.appendChild(getBookTitle(book));
        getBookTitle(book).addEventListener("click", event => {
            event.preventDefault();
            renderBook(book);
        })
    });
}

function getBookTitle(book) {
    const bookTitle = document.createElement('li');
    bookTitle.innerHTML = `<a href="#${book.title}"><h3><i>${book.title}</i></h3></a>`;
    return bookTitle;   
}

function fetchBookID(book) {
    const bookID = book.id;
    return bookID;
}

function renderBook(book) {
    clearBook();
    getAndLoadBookImage(book);
    addLikeButton();
    getAndRenderBookAuthor(book);
    getAndRenderBookSubtitle(book);
    getAndRenderBookDescription(book);
    getAndRenderUsers(book);
} 

function clearBook() {
    showPanel.innerHTML = "";
}

function getAndRenderBookSubtitle(book) {   
    const subTitle = document.createElement('h4');   
    subTitle.textContent = `${book.subtitle}`;
    showPanel.appendChild(subTitle);
}

function getAndRenderBookDescription(book) {   
    const description = document.createElement('p');   
    description.textContent = `${book.description}`;
    showPanel.appendChild(description);
}

function getAndLoadBookImage(book) {
    const individualBookPanel = document.createElement('div');
    individualBookPanel.style.marginTop = "2em";
    individualBookPanel.id = `${book.title}`;
    const bookImage = document.createElement('img');
    bookImage.src = book.img_url;
    bookImage.style.maxHeight = "300px";
    showPanel.appendChild(individualBookPanel);
    individualBookPanel.appendChild(bookImage);
}

function getAndRenderBookAuthor(book) {   
    const author = document.createElement('h2');
    author.textContent = `${book.author}`;
    showPanel.appendChild(author);
}

function addLikeButton() {
    const form = document.createElement('form');
    const likes = document.createElement('input');
    likes.name = 'like';
    likes.value = "Like";
    likes.type = "submit";
    showPanel.appendChild(form);
    form.appendChild(likes);
    likes.addEventListener("click", event => {
        event.preventDefault();
        const userArray = fetchBookID(book).users;
        userArray.push({id:1,username:"pouros"});
        sendPatch(userArray);
    })
}

function getAndRenderUsers(book) {
    const userArray = book.users;
    const userP = document.createElement("p");
    userP.textContent = "Users who've liked the book: ";
    showPanel.appendChild(userP);
    const listOfUserLikes = document.createElement("ul");
    userArray.forEach(user => {
        const userLikes = document.createElement("li");
        userLikes.textContent = user.username;
        listOfUserLikes.appendChild(userLikes);
    });
    showPanel.appendChild(listOfUserLikes);
}

function sendPatch(userArray) {
    return fetch("http://localhost:3000/books/:id", {
        method: 'patch',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(userArray)
    })
    .then(response => response.json())
    .then(updatedList => {
        
    });
}

const bookSubmit = [];
const RENDER_EVENT = 'render-input'


document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        inputBook();    
    });    
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function inputBook() {
    const inputBook = document.getElementById('inputBookTitle').value;
    const inputAuthor = document.getElementById('inputBookAuthor').value;
    const inputYear = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').Checked;

    const generatedID = generatedID();
    const bookObject = generateBookObject(generatedID, inputBook, inputAuthor, inputYear, isCompleted);
    bookSubmit.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generatedID(){
    return +new Date();
};

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted,
    }
};

document.addEventListener(RENDER_EVENT, function()
 {console.log(bookSubmit);
});

function makeBook(bookObject) {
    const textBook = document.createElement('h2');
    textBook.innerText = bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = bookObjectObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = bookObjectObject.year;

    const textContainer = document.createElement('div');
    textContainer.classList.add("inner");
    textContainer.append(textBook, textAuthor, textYear);

    const bookContainer = document.createElement('div');
    bookContainer.append(textContainer);
    bookContainer.setAttribute('id', 'book-${bookObject.id}')

    return bookContainer;
}

document.addEventListener(RENDER_EVENT, function() {
    const uncompletedBook = document.getElementById('incompleteBookshelfList');
    uncompletedBook.innerHTML = " ";

    for (const bookItem of bookSubmit) {
        const bookElement = makeBook(bookItem);
        uncompletedBook.append(bookElement);
    }
});
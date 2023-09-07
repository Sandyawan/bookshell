const bookSubmit = [];
const RENDER_EVENT = 'render-book'


document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        inputBook();    
    });    
});

function inputBook() {
    const inputBook = document.getElementById('inputBookTitle').value;
    const inputAuthor = document.getElementById('inputBookAuthor').value;
    const inputYear = document.getElementById('inputBookYear').value;
    

    const generatedID = generatedid();
    const bookObject = generateBookObject(generatedID, inputBook, inputAuthor, inputYear, false);
    bookSubmit.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generatedid(){
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
    const textTitle = document.createElement('h2');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = document.author;

    const textYear = document.createElement('p');
    textYear.innerText = document.year;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', 'book-${bookObject.id}');

    if(bookObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('blue');
    
        undoButton.addEventListener('click', function() {
            undoBookIsCompleted(bookObject.id);
        });

        const removeButton = document.createElement('button');
        removeButton.classList.add('red');

        removeButton.addEventListener('click', function() {
            removeBookIsCompleted(bookObject.id);
        });

        container.append(undoButton, removeButton);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('blue');

        checkButton.addEventListener('click', function() {
            checkBookIsCompleted(bookObject.id);
        });

        container.append(checkButton);
    }

    return container;
}

function addBookIsCompleted (bookid) {
    const bookTarget = findBook(bookid);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookid) {
    for(const bookObject of bookSubmit) {
        if(bookObject.id === bookid) {
            return bookObject;
        }
    }
    return null;
}

document.addEventListener(RENDER_EVENT, function() {
    const inCompleteBook = document.getElementById('incompleteBookshelfList');
    inCompleteBook.innerHTML = '';
    const completeBook = document.getElementById('completeBookshelfList');
    completeBook.innerHTML = '';

    for (const bookItem of bookSubmit) {
        const bookElement = makeBook(bookItem);
        if(!bookItem.isCompleted) {
            inCompleteBook.append(bookElement);
        } 
    }           
});

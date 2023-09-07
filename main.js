const bookSubmit = [];
const RENDER_EVENT = 'render-book'


document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    const searchForm = document.getElementById('searchBook');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        inputBook();    
    });    
    searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    searchBook();   
    })
});

function searchBook() {
    const bookList = document.querySelectorAll(".book_item");
    console.log(bookList);
}

function inputBook() {
    const inputBook = document.getElementById('inputBookTitle').value;
    const inputAuthor = document.getElementById('inputBookAuthor').value;
    const inputYear = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked; 

    const generatedID = generatedid();
    const bookObject = generateBookObject(generatedID, inputBook, inputAuthor, inputYear, isCompleted);
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
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = bookObject.year;

    const textContainer = document.createElement('div');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.append(textContainer);
    container.classList.add('book_item');
    container.setAttribute('id', 'book-${bookObject.id}');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');

    if(bookObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.innerText = "Belum Selesai Dibaca"
        undoButton.classList.add('Green');
    
        undoButton.addEventListener('click', function() {
            undoBookIsCompleted(bookObject.id);
        });

        const removeButton = document.createElement('button');
        removeButton.innerText = "Hapus Buku";
        removeButton.classList.add('red');

        removeButton.addEventListener('click', function() {
            removeBookIsCompleted(bookObject.id);
        });

        buttonContainer.append(undoButton, removeButton);
    } else {
        const completeButton = document.createElement('button');
        completeButton.innerText = "Selesai Dibaca";
        completeButton.classList.add('Green');

        completeButton.addEventListener('click', function() {
            addBookIsCompleted(bookObject.id);
        });

        const removeButton = document.createElement('Button');
        removeButton.innerText = "Hapus Buku";
        removeButton.classList.add('red');

        removeButton.addEventListener('click', function() {
            removeBookIsCompleted(bookObject.id);
    });
        buttonContainer.append(completeButton, removeButton);

}
    container.append(buttonContainer);
    return container;
}

function addBookIsCompleted (bookid) {
    const bookTarget = findBook(bookid);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookid) {
    for(const makeBook of bookSubmit) {
        if(makeBook.id === bookid) {
            return makeBook;
        }
    }
    return null;
}

function removeBookIsCompleted(bookid) {
    const bookTarget = findBookIndex(bookid);

    if (bookTarget === -1) return;

    bookSubmit.splice(bookTarget,1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoBookIsCompleted(bookid) {
    const bookTarget = findBook(bookid);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBookIndex(bookid) {
    for (const index in bookSubmit) {
        if (bookSubmit[index].id === bookid) {
            return index;
        }
    }

    return -1;
}

document.addEventListener(RENDER_EVENT, function() {
    const inCompleteBook = document.getElementById('incompleteBookshelfList');
    inCompleteBook.innerHTML = '';
    
    const completeBook = document.getElementById('completeBookshelfList');
    completeBook.innerHTML = '';

    for (const bookObject of bookSubmit) {
        const bookElement = makeBook(bookObject);
        if(!bookObject.isCompleted) {
            inCompleteBook.append(bookElement);
        }else {
            completeBook.append(bookElement);
        }    
    }       
    return 1;
});

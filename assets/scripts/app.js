const addMovieModalElement = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button'); // we have only 1 heder; another option is also to use getelementById
const backdropElement = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModalElement.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const inputElements = addMovieModalElement.querySelectorAll('input');
const movies = [];
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');


const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const toggleBackdrop = () => {
    backdropElement.classList.toggle('visible');
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = movieId => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    //deleteMovie(movieId);
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    //confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId));// will not work
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
     <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
     <h2>${title}</h2>
     <p>${rating}/5 starts</p>
    </div>
    `;
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

const closeMovieModal = () => {
    addMovieModalElement.classList.remove('visible');
};

const showMovieModal = () => { // function() {}
    addMovieModalElement.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (const inputElement of inputElements) {
        inputElement.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};

const addMovieHandler = () => {
    const titleValue = inputElements[0].value;
    const  imageUrlValue = inputElements[1].value;
    const ratingValue = inputElements[2].value;

    if (titleValue.trim() === '' || 
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        parseInt(ratingValue) < 1 ||
        parseInt(ratingValue) > 5) {
            alert('Please enter valid values (rating between 1 and 5).');
            return;
    }
    const newMovie = {
        id: Math.random().toString(),// just for demo
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie); 
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdropElement.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);

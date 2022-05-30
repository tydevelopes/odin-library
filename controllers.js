// functions to save books
const saveBooks = books => {
	localStorage.setItem("books", JSON.stringify(books));
};
const saveDeletedBooks = () => {};

// functions to filter books
const getBooks = () => {
	return JSON.parse(localStorage.getItem("books"));
};
const getReadingNow = () => {};
const getToRead = () => {};
const getHaveRead = () => {};
const getFavorites = () => {};
const getAuthors = () => {};
const getBooksByAuthor = name => {};
const getDeletedBooks = () => {};

//  functions to render contents to screen
const renderBooks = books => {
	// TODO
};
const renderReadingNow = books => {};
const renderToRead = books => {};
const renderHaveRead = books => {};
const renderFavorites = books => {};
const renderAuthors = authors => {};
const renderBooksByAuthor = books => {};
const renderDeletedBooks = books => {};

//  functions to perform actions on a single books
const moveToTrash = bookID => {};
const restoreDeletedBook = bookID => {};
const addBook = bookID => {};
const editBook = bookID => {};
const deleteBook = bookID => {};
const toggleFavorites = bookID => {};
const toggleToRead = bookID => {};
const toggleHaveRead = bookID => {};
const toggleReadingNow = bookID => {};

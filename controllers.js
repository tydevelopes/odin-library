// functions to save books
export const saveBooks = books => {
	localStorage.setItem("books", JSON.stringify(books));
};
export const saveDeletedBooks = () => {};

// functions to filter books
export const getBooks = () => {
	return JSON.parse(localStorage.getItem("books"));
};
export const getReadingNow = () => {};
export const getToRead = () => {};
export const getHaveRead = () => {};
export const getFavorites = () => {};
export const getAuthors = () => {};
export const getBooksByAuthor = name => {};
export const getDeletedBooks = () => {};

//  functions to render contents to screen
export const renderBooks = () => {
	const books = getBooks();
	return books
		.map(book => {
			const { id, title, author, pages, pagesRead, favorite, toRead, haveRead, nowReading } = book;
			return `<li class="book-list-item-container" data-id="${id}">
			<div class="image-container"></div>
			<div class="info">
				<div class="book-title">${title}</div>
				<div class="authors-name">${author.join(",")}</div>
				<div class="pages">${pages}</div>
				<div class="timeline">
					<div class="material-icons line">
						<span class="material-icons point start-page">fiber_manual_record</span>
						<span class="material-icons point current-page">fiber_manual_record</span>
						<span class="material-icons point end-page">fiber_manual_record</span>
					</div>
				</div>
				<div class="action-icons">
					<span class="material-icons ${favorite ? "active" : ""}" data-action="favorite">star_border</span>
					<span class="material-icons  ${nowReading ? "active" : ""}" data-action="nowReading">repeat</span>
					<span class="material-icons  ${toRead ? "active" : ""}" data-action="toRead">schedule</span>
					<span class="material-icons  ${haveRead ? "active" : ""}" data-action="haveRead">done_all</span>
					<span class="material-icons" data-action="delete">delete_outline</span>
					<span class="material-icons" data-action="edit">edit</span>
				</div>
			</div>
		</li>`;
		})
		.join("");
};
export const renderReadingNow = books => {};
export const renderToRead = books => {};
export const renderHaveRead = books => {};
export const renderFavorites = books => {};
export const renderAuthors = authors => {};
export const renderBooksByAuthor = books => {};
export const renderDeletedBooks = books => {};

//  functions to perform actions on a single books
export const moveToTrash = bookID => {};
export const restoreDeletedBook = bookID => {};
export const addBook = bookID => {};
export const editBook = bookID => {};
export const deleteBook = bookID => {};
const toggleFavorites = bookID => {};
export const toggleToRead = bookID => {};
export const toggleHaveRead = bookID => {};
export const toggleReadingNow = bookID => {};

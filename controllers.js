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
export const getAuthors = () => {
	const authorBookCount = {};
	getBooks()
		.map(({ author }) => author)
		.flat()
		.map(author => {
			if (authorBookCount.hasOwnProperty(author)) {
				authorBookCount[author] += 1;
			} else {
				authorBookCount[author] = 1;
			}
		});

	/**
	 * convert authorBookCount to array of objects - format : [{name: author, booksWritten : count}] and return
	 * key is author
	 */
	return Object.keys(authorBookCount).map(key => {
		return {
			name: key,
			booksWritten: authorBookCount[key],
		};
	});
};
export const getBooksByAuthor = name => {};
export const getDeletedBooks = () => {};

//  functions to render contents to screen
const renderBooks = books => {
	return books
		.map(book => {
			const { id, title, author, pages, pagesRead, favorite, toRead, haveRead, nowReading } = book;
			let currentPagePosition = (pagesRead / pages) * 100;
			return `<li class="book-list-item-container" data-id="${id}">
			<div class="image-container"></div>
			<div class="info">
				<div class="book-title">${title}</div>
				<div class="authors-name">${author.join(",")}</div>
				<div class="pages">p.${pages}</div>
				<div class="timeline">
					<div class="material-icons line">
						<span class="material-icons point start-page">fiber_manual_record</span>
						<span class="material-icons point current-page" style="left:${currentPagePosition}%">fiber_manual_record</span>
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
// const filterBy = param => {

// }
export const renderAllBooks = () => {
	const books = getBooks();
	return {
		booksList: renderBooks(books),
		count: books.length,
	};
};
export const renderReadingNow = () => {
	// get all books with nowwReading set to true
	let books = getBooks().filter(({ nowReading }) => nowReading);
	return {
		booksList: renderBooks(books),
		count: books.length,
	};
};
export const renderToRead = () => {
	// get all books with toRead set to true
	let books = getBooks().filter(({ toRead }) => toRead);
	return {
		booksList: renderBooks(books),
		count: books.length,
	};
};
export const renderHaveRead = () => {
	// get all books with haveRead set to true
	let books = getBooks().filter(({ haveRead }) => haveRead);
	return {
		booksList: renderBooks(books),
		count: books.length,
	};
};
export const renderFavorites = () => {
	// get all books with favorites set to true
	let books = getBooks().filter(({ favorite }) => favorite);
	return {
		booksList: renderBooks(books),
		count: books.length,
	};
};

// TODO :- combine book fitering function to renderBooksByFilter function
// const renderBooksByFilter = filter => {
//   let books = getBooks().filter((book) => {
//     if ( filter = "renderReadingNow"){
//       return book.nowReading
//     }
//     if (filter = "renderFavorites"){
//       return book.favorite
//     }
//     if ((filter = "renderToRead")) {
//       return book.toRead;
// 		}
//     if ((filter = "renderHaveRead")) {
//       return book.haveRead;
// 		}
//     return book
//   });
//   return renderBooks(books);
// }

/**
 * get all books - returns array of books
 * then go through each book at get the author array - returns array of authors array
 * then flatten the array - returns an array
 * them go through the authors and count books written
 */
export const renderAuthors = () => {
	const authorsAndBookCount = getAuthors();

	return {
		authorsList: authorsAndBookCount
			.map(({ name, booksWritten }) => {
				return `<li class="author-list-item-container">
			<span class="material-icons">person</span>
			<span class="author-name">${name}</span>
			<span class="number-of-author-books-in-list">${booksWritten}</span>
		</li>`;
			})
			.join(""),
		authorsCount: authorsAndBookCount.length,
	};
};
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

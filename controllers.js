// functions to save books
export const saveBooks = books => {
	localStorage.setItem("books", JSON.stringify(books));
};
export const saveDeletedBooks = books => {
	localStorage.setItem("trash", JSON.stringify(books));
};

// functions to filter books
export const getDeletedBooks = () => {
	return JSON.parse(localStorage.getItem("trash"));
};
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
export const getBooksByAuthor = name => {
	/**
	 * TODO:-
	 * get all books
	 * go through all books and return a book if it match name
	 */
	return getBooks().filter(book => book.author.includes(name));
};

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
				<div class="authors-name">${author.join(", ")}</div>
				<div class="pages">Read ${pagesRead} of ${pages}</div>
				<div class="timeline">
					<div class="material-icons line">
						<span class="material-icons point start-page">fiber_manual_record</span>
						<span class="material-icons point current-page" style="left:${currentPagePosition}%">fiber_manual_record</span>
						<span class="material-icons point end-page">fiber_manual_record</span>
					</div>
				</div>
				<div class="action-icons">
					<span class="material-icons ${
						favorite ? "active" : ""
					}" data-action="favorite" data-toggleable="true">star_border</span>
					<span class="material-icons  ${
						nowReading ? "active" : ""
					}" data-action="nowReading" data-toggleable="true">repeat</span>
					<span class="material-icons  ${toRead ? "active" : ""}" data-action="toRead" data-toggleable="true">schedule</span>
					<span class="material-icons  ${haveRead ? "active" : ""}" data-action="haveRead" data-toggleable="true">done_all</span>
					<span class="material-icons" data-action="delete" data-toggleable="false">delete_outline</span>
					<span class="material-icons" data-action="edit" data-toggleable="false">edit</span>
				</div>
			</div>
		</li>`;
		})
		.join("");
};
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
				return `<li class="author-list-item-container" data-author="${name}">
			<span class="material-icons">person</span>
			<span class="author-name">${name}</span>
			<span class="number-of-author-books-in-list">${booksWritten}</span>
		</li>`;
			})
			.join(""),
		authorsCount: authorsAndBookCount.length,
	};
};
export const renderBooksByAuthor = name => {
	const books = getBooksByAuthor(name);
	return {
		booksList: renderBooks(books),
		count: books.length,
		name,
	};
};
export const renderDeletedBooks = () => {
	const books = getDeletedBooks();
	return {
		booksList: renderBooks(books),
		count: books.length,
	};
};

// render Add/Edit container
export const renderEditAddContainer = book => {
	console.log(book);
	let editing = false;
	let title = "";
	let author = "";
	let pages = "";
	let pagesRead = "";

	if (book) {
		editing = true;
		title = book.title;
		author = book.author;
		pages = book.pages;
		pagesRead = book.pagesRead;
	}

	return `<!-- header start -->
			<header class="header">
				<span class="material-icons go-back">arrow_back</span>
				<span class="session">${editing ? "EDIT" : "ADD"}</span>
			</header>
			<!-- header end -->

			<!-- main start -->
			<ul class="list input-list">
				<li class="list-item" data-inputlabel="Title" data-inputvalue="${title ? title : ""}">
					<span class="list-item-input">${title ? title : "---"}</span>
					<span class="list-item-description">Title</span>
				</li> 
				<li class="list-item" data-inputlabel='Authors' data-inputvalue="${author ? author.join(", ") : ""}">
					<span class="list-item-input">${author ? author.join(", ") : "---"}</span>
					<span class="list-item-description">Authors</span>
				</li>
				<li class="list-item" data-inputlabel="Pages" data-inputvalue="${pages ? pages : ""}">
					<span class="list-item-input">${pages ? pages : "---"}</span>
					<span class="list-item-description">Pages</span>
				</li>
				<li class="list-item" data-inputlabel="Pages Read" data-inputvalue="${pagesRead ? pagesRead : ""}">
					<span class="list-item-input">${pagesRead ? pagesRead : "---"}</span>
					<span class="list-item-description">Pages Read</span>
				</li>
			</ul>
			<!-- main end -->`;
};

//  functions to perform actions on a single books
export const restoreDeletedBook = bookID => {};
/**
 * WARNING!!! -
 * dont use push to add the newbook, since it returns length of the new array
 * Instead use concat which returns the new array
 */
export const addBook = book => {
	const books = getBooks().concat(book);
	saveBooks(books);
};

export const editBook = bookID => {
	const bookToEdit = getBooks().find(book => bookID === book.id);
	return renderEditAddContainer(bookToEdit);
};

export const renderInputModal = ({ inputLabel, inputValue }) => {
	return `	<div class="input-modal-content">
				<div class="input-label">${inputLabel}</div>
				<input type="text" class="input" value="${inputValue}"/>
				<div class="buttons-container">
					<button class="select-author">CHOOSE</button>
					<button class="save">SAVE</button>
				</div>
			</div>`;
};

export const deleteBook = bookID => {
	let deletedBook = null;
	const books = getBooks().filter(book => {
		if (bookID === book.id) {
			deletedBook = { ...book };
			return false;
		} else {
			return true;
		}
	});
	saveBooks(books);

	let trash = getDeletedBooks();
	if (trash) {
		trash.push(deletedBook);
	} else {
		trash = [deletedBook];
	}
	saveDeletedBooks(trash);
};
// export const toggleFavorites = bookID => {
//   const books = getBooks().map(book => {
//     if(bookID === book.id){
//       return {...book, favorite: !book.favorite}
//     }
//     return book;
//   })
//   saveBooks(book);
// };
// export const toggleToRead = bookID => {
//   const books = getBooks().map(book => {
// 		if (bookID === book.id) {
// 			return { ...book, toRead: !book.toRead };
// 		}
// 		return book;
// 	});
// 	saveBooks(book);
// };
// export const toggleHaveRead = bookID => {};
// export const toggleReadingNow = bookID => {};

export const toggle = (bookID, key) => {
	const books = getBooks().map(book => {
		if (bookID === book.id) {
			console.log({ ...book, [key]: !book[key] });
			return { ...book, [key]: !book[key] };
		}
		return book;
	});
	saveBooks(books);
};

// replace old book info with new book info
export const replaceBookInfo = newBookInfo => {
	const books = getBooks().map(book => {
		if (newBookInfo.id === book.id) {
			return { ...book, ...newBookInfo };
		}
		return book;
	});
	saveBooks(books);
};

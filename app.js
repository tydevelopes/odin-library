import {
	renderAllBooks,
	renderReadingNow,
	renderToRead,
	renderHaveRead,
	renderFavorites,
	renderAuthors,
	renderBooksByAuthor,
	toggle,
	deleteBook,
	renderDeletedBooks,
	editBook,
	renderInputModal,
	replaceBookInfo,
	addBook,
	renderEditAddContainer,
} from "./controllers.js";
import { navItems, list, listTitle, bookCount, readingNow, allBooks } from "./domElements.js";
import { books } from "./bookListGenerator/books.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// toggle theme
const toggleThemeEl = document.querySelector(".toggle-theme");
const root = document.documentElement;

toggleThemeEl.addEventListener("click", () => {
	const newTheme = root.className === "dark" ? "light" : "dark";
	root.className = newTheme;
	localStorage.setItem("theme", newTheme);
});

// nav controllers
const openMenuEl = document.querySelector(".open-menu");
const navEl = document.querySelector(".nav");
const navContentEl = document.querySelector(".nav-content");

// handler to Open menu with animation
const openNav = () => {
	navEl.classList.add("show-nav", "fade-in");
	navContentEl.classList.add("slide-in");
	// Hide the scrollbar
	setTimeout(() => {
		document.body.style.overflow = "hidden";
	}, 1001);
};

// open nav with animation when menu icon clicked
openMenuEl.addEventListener("click", openNav);

// handler to close menu with animation
const closeNav = () => {
	navContentEl.classList.add("slide-out");
	navEl.classList.add("nav-bg-color", "fade-out");

	setTimeout(() => {
		navEl.classList.remove("show-nav", "nav-bg-color", "fade-in", "fade-out");
		navContentEl.classList.remove("slide-in", "slide-out");
		// Show the scrollbar
		document.body.style.overflow = "";
	}, 1001);
};

navEl.addEventListener("click", closeNav);
// stop event bubbling
navContentEl.addEventListener("click", e => {
	e.stopPropagation();
});

// Add  Click Event Listeners to menu items except the first one
navItems.forEach(navItem => {
	navItem.addEventListener("click", e => {
		renderList(e.currentTarget.dataset.action);
		removeAllActiveClass();
		// Grab text, change item color and place into header title
		e.currentTarget.classList.add("active");
		const text = e.currentTarget.children[1].textContent;
		listTitle.textContent = text;

		closeNav();
	});
});

// Add click event to list
list.addEventListener("click", e => {
	// console.log(e.target.parentElement.parentElement.parentElement.dataset.id);
	// console.log(Array.from(e.target.parentElement.classList));
	if (Array.from(e.target.parentElement.classList).includes("action-icons")) {
		// change icon color of toggleable icons when clicked
		// toggleable returns a string
		if (e.target.dataset.toggleable === "true") {
			e.target.classList.toggle("active");
		}
		//  Get book ID
		const bookId = e.target.parentElement.parentElement.parentElement.dataset.id;
		const book = e.target.parentElement.parentElement.parentElement;
		const renderedList = document.querySelector(".nav-content > .active");
		// perform an action based on an action icon clicked
		// when a change is made, rerender active menu
		switch (e.target.dataset.action) {
			case "favorite":
			case "nowReading":
			case "toRead":
			case "haveRead":
				toggle(bookId, e.target.dataset.action);
				// console.log(renderedList.dataset.action);
				renderList(renderedList.dataset.action);
				break;
			case "delete":
				deleteBook(bookId);
				renderList(renderedList.dataset.action);
				break;
			case "edit":
				// create a container, put html inside and append to body
				const container = document.createElement("div");
				container.classList.add("edit-add-container");
				container.innerHTML = editBook(bookId);
				document.body.append(container);
				scrollTo(0, 0);
				document.body.style.overflow = "hidden";
				// Get a reference to the back arrow and add a click event to it
				const goBack = document.querySelector(".go-back");
				goBack.addEventListener("click", () => {
					//grab input items values, create an object
					const list = document.querySelector(".input-list");
					const editedBook = {
						id: bookId,
						title: list.querySelector('li[data-inputlabel="Title"').dataset.inputvalue,
						author: list
							.querySelector('li[data-inputlabel="Authors"')
							.dataset.inputvalue.split(",")
							.map(name => name.trim()),
						pages: list.querySelector('li[data-inputlabel="Pages"').dataset.inputvalue,
						pagesRead: list.querySelector('li[data-inputlabel="Pages Read"').dataset.inputvalue,
					};
					console.log(editedBook);
					// save book to books in local storage
					replaceBookInfo(editedBook);
					// rerender active menu
					renderList(renderedList.dataset.action);
					document.body.removeChild(container);
					document.body.style.overflow = "";
					// scroll to book that was edited
					document.querySelector(`li[data-id='${bookId}']`).scrollIntoView();
				});

				// open input modal when list input item is clicked and populate modal centent
				document.querySelectorAll(".input-list > .list-item").forEach(item => {
					item.addEventListener("click", e => {
						// console.log(e.currentTarget);
						const inputListItem = e.currentTarget;
						const input = {
							inputLabel: e.currentTarget.dataset.inputlabel,
							inputValue: e.currentTarget.dataset.inputvalue,
						};
						// console.log(input);
						// create a container, put html inside and append to body
						const container = document.createElement("div");
						container.classList.add("input-modal-container");
						container.innerHTML = renderInputModal(input);
						document.body.append(container);
						// Prevent modal from closing when modal content area is clicked
						document.querySelector(".input-modal-content").addEventListener("click", e => {
							e.stopPropagation();
						});
						// Focus input
						document.querySelector(".input-modal-content > input").focus();
						// close modal when modal container is clicked
						document.querySelector(".input-modal-container").addEventListener("click", e => {
							e.currentTarget.remove();
						});
						// Save input
						document.querySelector(".save").addEventListener("click", () => {
							// dont save empty string
							let newValue = document.querySelector(".input-modal-content > input").value.trim();
							if (inputListItem.dataset.inputlabel === "Pages" || inputListItem.dataset.inputlabel === "Pages Read") {
								newValue = Number(newValue);
								console.log(newValue);
							}
							if (inputListItem.dataset.inputlabel === "Pages Read") {
								if (
									newValue < 0 ||
									newValue > Number(document.querySelector('li[data-inputlabel="Pages"').dataset.inputvalue)
								) {
									newValue = 0;
								}
							}
							if (newValue) {
								inputListItem.dataset.inputvalue = newValue;
								inputListItem.children[0].textContent = newValue;
								// close modal on save
								document.querySelector(".input-modal-container").remove();
							} else {
								document.querySelector(".input-modal-content > input").focus();
								document.querySelector(".input-modal-content > input").value = "";
							}
						});
					});
				});
				break;

			default:
				break;
		}
	}
});

// Nav Items Event handlers
function renderList(action) {
	switch (action) {
		case "renderReadingNow":
			const { booksList: nowReadingBooks, count: nowReadingCount } = renderReadingNow();
			bookCount.textContent = `${nowReadingCount}`;
			list.innerHTML = nowReadingBooks;
			break;
		case "renderAllBooks":
			const { booksList: allBooks, count: allBookscount } = renderAllBooks();
			bookCount.textContent = `${allBookscount}`;
			list.innerHTML = allBooks;
			break;
		case "renderFavorites":
			const { booksList: favoriteBooks, count: favoriteCount } = renderFavorites();
			bookCount.textContent = `${favoriteCount}`;
			list.innerHTML = favoriteBooks;
			break;
		case "renderToRead":
			const { booksList: toReadBooks, count: toReadCount } = renderToRead();
			bookCount.textContent = `${toReadCount}`;
			list.innerHTML = toReadBooks;
			break;
		case "renderHaveRead":
			const { booksList: haveReadBooks, count: haveReadCount } = renderHaveRead();
			bookCount.textContent = `${haveReadCount}`;
			list.innerHTML = haveReadBooks;
			break;
		case "renderAuthors":
			const { authorsList, authorsCount } = renderAuthors();
			bookCount.textContent = `${authorsCount}`;
			list.innerHTML = authorsList;
			// Event to render books by author
			const authorListItem = document.querySelectorAll(".author-list-item-container");
			authorListItem.forEach(el => {
				el.addEventListener("click", e => {
					const { booksList, count, name } = renderBooksByAuthor(e.currentTarget.dataset.author);
					bookCount.textContent = `${count}`;
					listTitle.innerHTML = `<span>Author - </span><span class="author-name">${name}</span>`;
					list.innerHTML = booksList;
				});
			});
			break;
		case "renderDeleted":
			const { booksList: deletedBooks, count: deletedCount } = renderDeletedBooks();
			bookCount.textContent = `${deletedCount}`;
			list.innerHTML = deletedBooks;
			// grab each list and replace all action icons with RESTORE
			document.querySelectorAll(".action-icons").forEach(el => {
				el.innerHTML = `<span class="restore-book" data-action="restore-book">RESTORE</span>`;
			});
			break;
		default:
			break;
	}
}

function removeAllActiveClass() {
	navItems.forEach(navItem => {
		navItem.classList.remove("active");
	});
}

document.querySelector(".add").addEventListener("click", () => {
	// create a container, put html inside and append to body
	const container = document.createElement("div");
	container.classList.add("edit-add-container");
	container.innerHTML = renderEditAddContainer();
	document.body.append(container);
	scrollTo(0, 0);
	document.body.style.overflow = "hidden";
	// Get a reference to the back arrow and add a click event to it
	const goBack = document.querySelector(".go-back");
	goBack.addEventListener("click", () => {
		//grab input items values, create an object
		const list = document.querySelector(".input-list");
		const newBook = {
			id: uuidv4(),
			title: list.querySelector('li[data-inputlabel="Title"').dataset.inputvalue,
			author: list
				.querySelector('li[data-inputlabel="Authors"')
				.dataset.inputvalue.split(",")
				.map(name => name.trim()),
			pages: list.querySelector('li[data-inputlabel="Pages"').dataset.inputvalue,
			pagesRead: list.querySelector('li[data-inputlabel="Pages Read"').dataset.inputvalue,
			favorite: false,
			toRead: false,
			haveRead: false,
			nowReading: false,
		};
		// save book to books in local storage
		// Pass a copy of newNook
		addBook({ ...newBook });
		// rerender all books
		renderList("renderAllBooks");
		removeAllActiveClass();
		allBooks.classList.add("active");
		const text = allBooks.children[1].textContent;
		listTitle.textContent = text;

		document.body.removeChild(container);
		document.body.style.overflow = "";
		// scroll to book that was edited
		document.querySelector(`li[data-id='${newBook.id}']`).scrollIntoView();
	});

	// open input modal when list input item is clicked and populate modal centent
	document.querySelectorAll(".input-list > .list-item").forEach(item => {
		item.addEventListener("click", e => {
			// console.log(e.currentTarget);
			const inputListItem = e.currentTarget;
			const input = {
				inputLabel: e.currentTarget.dataset.inputlabel,
				inputValue: e.currentTarget.dataset.inputvalue,
			};
			// console.log(input);
			// create a container, put html inside and append to body
			const container = document.createElement("div");
			container.classList.add("input-modal-container");
			container.innerHTML = renderInputModal(input);
			document.body.append(container);
			// Prevent modal from closing when modal content area is clicked
			document.querySelector(".input-modal-content").addEventListener("click", e => {
				e.stopPropagation();
			});
			// Focus input
			document.querySelector(".input-modal-content > input").focus();
			// close modal when modal container is clicked
			document.querySelector(".input-modal-container").addEventListener("click", e => {
				e.currentTarget.remove();
			});
			// Save input
			document.querySelector(".save").addEventListener("click", () => {
				let newValue = document.querySelector(".input-modal-content > input").value.trim();
				/**
				 * Validation:-
				 * empty value not accepted
				 * page and pages read must be numbers
				 * pages read should be equalto or less than pages
				 */
				if (inputListItem.dataset.inputlabel === "Pages" || inputListItem.dataset.inputlabel === "Pages Read") {
					newValue = Number(newValue);
					console.log(newValue);
				}
				if (inputListItem.dataset.inputlabel === "Pages Read") {
					if (
						newValue < 0 ||
						newValue > Number(document.querySelector('li[data-inputlabel="Pages"').dataset.inputvalue)
					) {
						newValue = 0;
					}
				}
				if (newValue) {
					inputListItem.dataset.inputvalue = newValue;
					inputListItem.children[0].textContent = newValue;
					// close modal on save
					document.querySelector(".input-modal-container").remove();
				} else {
					document.querySelector(".input-modal-content > input").focus();
					document.querySelector(".input-modal-content > input").value = "";
				}
			});
		});
	});
});

let docHeight;
// store user selected theme in localStorage
window.addEventListener("DOMContentLoaded", () => {
	const theme = localStorage.getItem("theme");
	if (theme) {
		root.className = theme;
	} else {
		root.className = "light";
	}
	const { booksList: books, count } = renderReadingNow();
	bookCount.textContent = `${count}`;
	list.innerHTML = books;
	readingNow.classList.add("active");

	// To reliably obtain the full document height, we should take the maximum of these properties:
	docHeight = Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.body.clientHeight,
		document.documentElement.clientHeight
	);
});

// Save books to local storage
const saveToLocalStorage = () => {
	if (!localStorage.getItem("books")) {
		localStorage.setItem("books", JSON.stringify(books));
	}
};

saveToLocalStorage();

let oldScrollPosition = scrollY;
let scrollDirection = null;

const navigate = document.querySelector(".navigate");
const navicateIcon = document.querySelector(".navigate-icon");

navigate.addEventListener("click", () => {
	if (scrollDirection === "down") {
		// Scroll to bottom of page
		scrollTo(0, docHeight);
		return;
	}
	// Scroll to top of page
	if (scrollDirection === "up") {
		scrollTo(0, 0);
		return;
	}
});

window.addEventListener("scroll", () => {
	console.dir(docHeight);
	// show down arrow if scrolling down
	if (scrollY > oldScrollPosition) {
		oldScrollPosition = scrollY;
		scrollDirection = "down";
		if (scrollY < 100 || scrollY > docHeight - 1000) {
			navigate.style.display = "";
		} else {
			navigate.style.display = "inline-grid";
		}
		navicateIcon.textContent = "arrow_downward";
	}
	// show up arrow if scrolling up
	if (scrollY < oldScrollPosition) {
		oldScrollPosition = scrollY;
		scrollDirection = "up";
		if (scrollY > docHeight - 100 || scrollY < 639) {
			navigate.style.display = "";
		} else {
			navigate.style.display = "inline-grid";
		}
		navicateIcon.textContent = "arrow_upward";
	}
});

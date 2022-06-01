import {
	renderAllBooks,
	renderReadingNow,
	renderToRead,
	renderHaveRead,
	renderFavorites,
	renderAuthors,
	renderBooksByAuthor,
	toggle,
} from "./controllers.js";
import { navItems, list, listTitle, bookCount, readingNow } from "./domElements.js";
import { books } from "./bookListGenerator/books.js";

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
		// perform an action based on an action icon clicked
		// when a change is made, rerender active menu
		switch (e.target.dataset.action) {
			case "favorite":
			case "nowReading":
			case "toRead":
			case "haveRead":
				toggle(bookId, e.target.dataset.action);
				const renderedList = document.querySelector(".nav-content > .active");
				// console.log(renderedList.dataset.action);
				renderList(renderedList.dataset.action);
				break;
			case "delete":
				break;
			case "edit":
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
});

// Save books to local storage
const saveToLocalStorage = () => {
	if (!localStorage.getItem("books")) {
		localStorage.setItem("books", JSON.stringify(books));
	}
};

saveToLocalStorage();

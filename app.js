import {
	renderAllBooks,
	renderReadingNow,
	renderToRead,
	renderHaveRead,
	renderFavorites,
	renderAuthors,
} from "./controllers.js";
import { navItems, list, listTitle, bookCount } from "./domElements.js";

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
	navItem.addEventListener("click", renderList);
});

// Event handlers
function renderList(e) {
	switch (e.currentTarget.dataset.action) {
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
			break;
		case "renderDeleted":
			break;
		default:
			break;
	}
	removeAllActiveClass();
	// Grab text, change item color and place into header title
	e.currentTarget.classList.add("active");
	const text = e.currentTarget.children[1].textContent;
	listTitle.textContent = text;

	closeNav();
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
});

// Save books to local storage
// import { books } from "./bookListGenerator/books.js";
// const saveToLocalStorage = () => {
// 	localStorage.setItem("books", JSON.stringify(books));
// };

// saveToLocalStorage();

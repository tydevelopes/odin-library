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
const navItems = document.querySelectorAll(".nav-content > div:not(:first-child)");
const listTitle = document.querySelector(".list-title");

navItems.forEach(navItem => {
	navItem.addEventListener("click", renderList);
});

// Event handlers
function renderList(e) {
	/**
	 * TODO -
	 * [] render list depending on what was clicked
	 */
	removeAllActiveClass();
	// Grab text, change item color and place into header title
	e.currentTarget.classList.add("active");
	const text = e.currentTarget.children[1].textContent;
	listTitle.textContent = text;
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
});

// Save books to local storage
// import { books } from "./bookListGenerator/books.js";
// const saveToLocalStorage = () => {
// 	localStorage.setItem("books", JSON.stringify(books));
// };

// saveToLocalStorage();

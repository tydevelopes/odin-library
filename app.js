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

console.log("open menu: ", openMenuEl);

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

// generate books
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { titles, names } from "./bookListGenerator/generator.js";

console.log(titles.length);
console.log(names.length);

const generateBooks = () => {
	const books = [];
	let book = {};
	let numPages = null;
	let numPagesRead = null;
	for (let i of Array(80).keys()) {
		numPages = randomInRange(50, 1001);
		numPagesRead = randomInRange(1, numPages + 1);
		book = {
			id: uuidv4(),
			title: titles[i],
			author: authorArray(),
			pages: numPages,
			pagesRead: numPagesRead,
			favorite: isTrueOrFalse(),
			toRead: isTrueOrFalse(),
			haveRead: isTrueOrFalse(),
			nowReading: isTrueOrFalse(),
		};
		books.push(book);
	}
	return books;
};

function authorArray() {
	// generate at most 3 authors for a book
	const authors = new Set();
	let numOfAuthors = Math.floor(Math.random() * 3) + 1;
	for (let i of Array(numOfAuthors).keys()) {
		authors.add(names[Math.floor(Math.random() * names.length)]);
	}
	return [...authors];
}
function isTrueOrFalse() {
	return Math.floor(Math.random() * 2) === 1 ? true : false;
}
function randomInRange(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

// let bookSList = generateBooks();
// console.log(JSON.stringify(bookSList));

import { titles, names } from "./generator.js";
// generate books
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

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

/* 
Original project specs (all complete)
1.) If you haven’t already, set up your project with skeleton HTML/CSS and JS 
    files.
2.) All of your book objects are going to be stored in a simple array, so add a 
    function to the script (not the constructor) that can take user’s input and 
    store the new book objects into an array. Your code should look something 
    like this:

      let myLibrary = [];

      function Book() {
        // the constructor...
      }

      function addBookToLibrary() {
        // do stuff here
      }

3.) Write a function that loops through the array and displays each book on the 
    page. You can display them in some sort of table, or each on their own 
    “card”. It might help for now to manually add a few books to your array so 
    you can see the display.
4.) Add a “NEW BOOK” button that brings up a form allowing users to input the 
    details for the new book: author, title, number of pages, whether it’s been 
    read and anything else you might want.
5.) Add a button on each book’s display to remove the book from the library.
  a.) You will need to associate your DOM elements with the actual book objects 
      in some way. One easy solution is giving them a data-attribute that 
      corresponds to the index of the library array.
6.) Add a button on each book’s display to change its read status.
  a.) To facilitate this you will want to create the function that toggles a 
      book’s read status on your Book prototype instance.
*/

"use strict";

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return (this.name + " by " + this.author + "\n" + this.pages + " pages\n" + 
    (this.read == true ? "Already read" : "Not read yet"));
}

Book.prototype.changeReadStatus = function () {
  this.read == true ? this.read = false : this.read = true;
}

function printLibraryCards() {
  let i = 0
  while (i < myLibrary.length) {
    printBook(myLibrary[i], i);
    i = i + 1;
  }
}

function nukeLibraryCards() {
  document.getElementById('book_list').innerHTML = "";
}

function refreshLibraryCards() {
  nukeLibraryCards();
  printLibraryCards();
}

function printBook(entry, pos) {
  let currentBook;
  let deleteButton;
  let readButton;
  currentBook = formatListEntry(currentBook, pos)
  currentBook.innerText = entry.info();
  deleteButton = addButtonToEntry(deleteButton, "delete", pos, "DELETE");
  readButton = addButtonToEntry(readButton, "read", pos, "Read?");
  currentBook.appendChild(deleteButton);
  currentBook.appendChild(readButton);
  document.getElementById('book_list').appendChild(currentBook);
}

function formatListEntry(entry, pos) {
  let alteredEntry = entry;
  alteredEntry = document.createElement('div');
  alteredEntry.setAttribute('class', 'list_item');
  alteredEntry.setAttribute('data-pos', pos);
  return alteredEntry;
}

function addButtonToEntry(entry, buttonID, pos, buttonText) {
  let newButton;
  let alteredEntry = entry
  alteredEntry = document.createElement('div');
  newButton = document.createElement('button');
  newButton.setAttribute('type', 'button');
  newButton.setAttribute('id', buttonID);
  newButton.setAttribute('data-pos', pos);
  newButton.innerText = buttonText;
  alteredEntry.appendChild(newButton);
  return alteredEntry;
}

function addBookFromForm() {
  let title = document.querySelector('input#title').value;
  let author = document.querySelector('input#author').value;
  let pages = document.querySelector('input#pages').value;

  if (isFormComplete(title, author, pages)) {
    let read = document.querySelector('input#read_no').checked ? false: true;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    refreshLibraryCards();
    return true;
  }
  else     
    return false;
}

function isFormComplete(title, author, pages) {
  return (title != "" && author != "" && pages != "") ? true : false;
}

function removeBook(pos) {
  myLibrary.splice(pos, 1);
  refreshLibraryCards();
}

function updateReadStatus(pos) {
  let currentCard = document.querySelector("div[data-pos = '" + pos + "']")
    .innerHTML;
  if (currentCard.indexOf('Already read') > -1)
    currentCard = currentCard.replace('Already read', 'Not read yet');
  else
    currentCard = currentCard.replace('Not read yet', 'Already read');
  document.querySelector("div[data-pos = '" + pos + "']").innerHTML = 
    currentCard;
}

function toggleElement(element) {
  element.style.display == 'block' ? element.style.display = 'none' : 
    element.style.display = 'block'; 
}

function formReset() {
  document.querySelector('input#title').value = "";
  document.querySelector('input#author').value = "";
  document.querySelector('input#pages').value = "";
  document.querySelector('input#read_no').checked = true;
}

document.addEventListener('click', function(e) {
  if (e.target.id == 'delete')
    removeBook(e.target.dataset.pos);
  else if (e.target.id == 'read') {
    myLibrary[e.target.dataset.pos].changeReadStatus();
    updateReadStatus(e.target.dataset.pos);
  }
});

document.getElementById('new_book').onclick = function() {
  let bookForm = document.querySelector('.book_entry')
  toggleElement(bookForm);
}

document.getElementById('add_book').onclick = function() {
  if (addBookFromForm()) {
    formReset();
    let bookForm = document.querySelector('.book_entry');
    toggleElement(bookForm);
  }
  else
    alert("Please complete the entire form");
}

document.getElementById('clear').onclick = function() {
  formReset();
}

document.getElementById('cancel').onclick = function() {
  formReset();
  let bookForm = document.querySelector('.book_entry');
  toggleElement(bookForm);
}

var myLibrary = [];
var book1 = new Book('The Bible', 'God', 891, true);
var book2 = new Book('Emergent Design', 'Scott L. Bain', 411, false);

myLibrary.push(book1);
myLibrary.push(book2);

console.log(myLibrary[0].info());
console.log(myLibrary[1].info());

printLibraryCards()
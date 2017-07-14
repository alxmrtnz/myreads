import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleBookShelfChange: PropTypes.func.isRequired
  }

  state = {
    booksFound: [],
    query: ''
  }

  /**
  * @description Function to update value of search input and
  * update state.booksFound after calling BooksAPI.search()
  * @param {string} query - The latest search query
  */
  updateQuery = (query) => {
    this.setState({
      query: query,
    });

    if (query) {
      BooksAPI
      .search(query, 20)
      .then((booksFound) => {

        if (booksFound.length > 0) {
          this.setState({
            booksFound: this.reconcileBooks(booksFound)
          });
        } else {
          this.resetBooksFound()
        }
      })
    } else {
      this.resetBooksFound()
    }
  }

  /**
  * @description Function to empty the `booksFound` array when there
  * is an empty query or no books returned from a search
  * @param {string} query - The latest search query
  */
  resetBooksFound() {
    this.setState({
      booksFound: []
    })
  }

  /**
  * @description Function to handle a shelf change of a book.
  * This function calls the prop function `handleBookShelfChange`. It also
  * updates the select dropdown status of the book being changed on the search
  * page by creating a new `curentBook` object with an updated `shelf`
  * property. Then, the new book object is inserted in place of the
  * `changedBook` and the state is updated/the page is re-rendered
  *
  * @param {Object} changedBook - the book object being moved between shelves
  * @param {string} shelf - The shelf where the book is moving to
  */
  handleBookShelfChange = (changedBook, shelf) => {
    this.props.handleBookShelfChange(changedBook, shelf)

    let currentBook = this.state.booksFound.find((currentBook) => {
      return currentBook.id === changedBook.id
    })

    let currentBookIndex = this.state.booksFound.indexOf(currentBook)

    currentBook.shelf = shelf

    this.setState({
      booksFound:
        [
          ...this.state.booksFound.slice(0, currentBookIndex),
          currentBook,
          ...this.state.booksFound.slice(currentBookIndex + 1)
        ]
    })
  }

  /**
  * @description Function to make sure books that are shown on the
  * search page have the correct shelf status.
  * This function looks at all books passed down from App.js (the books
  * currently on shelves) and maps booksFound to a new array with
  * updated shelf statuses (if the book is found in this.props.books)
  *
  * @param {array} booksFound - The books returned via a search query
  */
  reconcileBooks(booksFound) {
    let bookIds = {}
    this.props.books.forEach((book) => {
      bookIds[book.id] = book.shelf
    })

    return booksFound.map((book) => {
      return {...book,
        shelf: bookIds[book.id] || book.shelf
      }
    })
  }

  render() {
    const { query, booksFound } = this.state

    let showingBooks = booksFound

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >
            Add Contact
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  handleBookShelfChange={this.handleBookShelfChange}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
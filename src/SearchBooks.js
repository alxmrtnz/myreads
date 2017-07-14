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

  resetBooksFound() {
    this.setState({
      booksFound: []
    })
  }

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
                <Book book={book} handleBookShelfChange={this.handleBookShelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
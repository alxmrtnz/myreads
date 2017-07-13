import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleBookShelfChange: PropTypes.func.isRequired
  }
  state = {
    searchBooks: [],
    query: ''
  }
  componentDidMount() {
    // Get all books on shelves
    BooksAPI.search('a').then((books) => {
      this.setState({ searchBooks: books })
      console.log('search state: ', this.state.searchBooks)
    })
  }
  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }
  render() {
    const { books } = this.props;
    const { query } = this.state

    let showingBooks;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = books.filter((book) => match.test(book.title));
      console.log(showingBooks)
    } else {
      showingBooks = books;
      console.log('default: ', showingBooks)
    }

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
                <Book book={book} handleBookShelfChange={this.props.handleBookShelfChange}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
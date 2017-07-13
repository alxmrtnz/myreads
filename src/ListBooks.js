import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Book from './Book'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleBookShelfChange: PropTypes.func.isRequired
  }
  render() {
    const { books } = this.props

    let currentlyReadingBooks = books.filter((book) => book.shelf === 'currentlyReading')
    let wantToReadBooks = books.filter((book) => book.shelf === 'wantToRead')
    let readBooks = books.filter((book) => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks.map((book) => (
                    <li key={book.id}>
                      <Book book={book} handleBookShelfChange={this.props.handleBookShelfChange}/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map((book) => (
                    <li key={book.id}>
                      <Book book={book} handleBookShelfChange={this.props.handleBookShelfChange} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.map((book) => (
                    <li key={book.id}>
                      <Book book={book} handleBookShelfChange={this.props.handleBookShelfChange} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >
            Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  state = {
  }
  static propTypes = {
    book: PropTypes.object.isRequired,
    handleBookShelfChange: PropTypes.func.isRequired
  }
  render() {
    const { book } = this.props
    let thumbnail = book.imageLinks ? book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';
    console.log('thumbnail: ', thumbnail)

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}>
          </div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event) => this.props.handleBookShelfChange(book, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        <div className="book-authors">
          {book.authors}
        </div>
      </div>
    )
  }
}

export default Book
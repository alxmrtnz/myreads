import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

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
  componentDidMount() {
    // Get all books on shelves
    // BooksAPI.search('a').then((books) => {
    //   this.setState({ searchBooks: books })
    //   console.log('search state: ', this.state.searchBooks)
    // })
  }
  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.updateSearch(query)
  }
  updateSearch(query){
     const maxResult = 20;
     let updateBooks = [];
     // const { myBooks } = this.props;

     BooksAPI.search(query, maxResult)
     .then((booksFound) => {
       // updateBooks = updateShelf(newBooks, myBooks);
       this.setState({ booksFound });
       console.log(booksFound)
     })
     .catch((e) => alert(`Something is Wrong! Here is the detail: ${e}`))
   }
  render() {
    const { books } = this.props;
    const { query, booksFound } = this.state

    let showingBooks = booksFound;

    // if (query) {
    //   const match = new RegExp(escapeRegExp(query));
    //   BooksAPI.search(query.trim()).then((booksFound) => {
    //     this.setState({
    //       booksFound: booksFound
    //     });
    //   })
    //   showingBooks = booksFound.filter((book) => match.test(book.title));
    //    console.log('showingBooks(Q): ', showingBooks)
    // } else {
    //   showingBooks = booksFound;
    //   console.log('showingBooks(NQ): ', showingBooks)
    // }

    // showingBooks.sort(sortBy('title'));

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
import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /**
  * @description Function to change the shelf status of a book
  * @param {Object} book - The book object being moved between shelves
  * @param {string} shelf - The shelf where the book is moving to
  */
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            books={ this.state.books }
            handleBookShelfChange={ this.updateBook }
          />
        )} />
        <Route exact path="/" render={() => (
          <ListBooks
            books={ this.state.books }
            handleBookShelfChange={ this.updateBook }
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

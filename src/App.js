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
  * @description Represents a book
  * @param {Object} book - The book object being moved between shelves
  * @param {string} author - The author of the book
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

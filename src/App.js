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
    // Get all books on shelves
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
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

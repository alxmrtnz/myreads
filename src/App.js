import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'


class BooksApp extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render= { () => (
          <SearchBooks />
        )} />
        <Route exact path="/" render= {() => (
          <ListBooks />
        )}/>
      </div>
    )
  }
}

export default BooksApp

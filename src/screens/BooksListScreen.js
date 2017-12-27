
import React, {Component} from 'react'

//Link for Navigate in the Route
import {Link} from 'react-router-dom'

//PropTypes for set the require parameters
import PropTypes from 'prop-types'

//Books List Component
import BooksListComponent from '../components/BooksListComponent'

//UI
import { Button } from 'antd';

export default class BooksListScreen extends Component{

  static propTypes = { //required props
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  }

  render(){
    const {books,updateBookShelf} = this.props
    return(
      <div>
        <BooksListComponent
          title="Currently Reading"
          books={books.filter((book)=> book.shelf === "currentlyReading")}
          updateBookShelf={updateBookShelf}
        />
        <BooksListComponent
          title="Want to Read"
          books={books.filter((book)=> book.shelf === "wantToRead")}
          updateBookShelf={updateBookShelf}
        />
        <BooksListComponent
          title="Read"
          books={books.filter((book)=> book.shelf === "read")}
          updateBookShelf={updateBookShelf}
        />
        <div className="open-search">
          <Link to='/search'>
            <Button type="primary" size={"large"} shape="circle" icon="search" />
          </Link>
        </div>
      </div>
      )
    }
  }

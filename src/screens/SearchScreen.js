import React, {Component} from 'react'

//PropTypes for set the require parameters
import PropTypes from 'prop-types'

//API
import * as BooksAPI from '../api/BooksAPI'

//Components
import BooksListComponent from '../components/BooksListComponent'

//UI
import { Input } from 'antd';
const Search = Input.Search;


export default class SearchScreen extends Component{

  static propTypes = { //required props
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateSearch = () =>{
    this.search(this.state.query)
    console.log('updating serach ')
  }

  async search (query){
    this.setState({query}); //put the query on the state, for the update process
    const { books } = this.props
    if(query.length > 1){
      await BooksAPI.search(query).then( (searchedBooks)=>{
        if(searchedBooks.error){
          this.setState({books: []})
        }else{
            //verify if the searched book alredy have a shelf
            searchedBooks.map((book)=>{
              var founded = books.filter((b)=> b.id === book.id);
              if(founded[0]){
                book.shelf = founded[0].shelf;
              }
            })
            this.setState({books: searchedBooks})
        }
      })
    }

  }

  render(){
    const { updateBookShelf } = this.props
    const { books } = this.state
    return(
      <div>
        <Search
          placeholder="input search text"
          onSearch={(query) => this.search(query)}
          enterButton
        />
        <br /><br />
        <BooksListComponent
          title={'Searched Books'}
          books={books}
          updateBookShelf={updateBookShelf}
          updateSearch={this.updateSearch}
        />
      </div>
    )
  }

}

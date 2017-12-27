import './App.css'
import React, { Component } from 'react';

//Router
import { BrowserRouter as Router, Route, } from 'react-router-dom'

//Screens
import BooksListScreen from './screens/BooksListScreen'
import SearchScreen from './screens/SearchScreen'

//Components
import HeaderComponent from './components/HeaderComponent'
import SiderComponent from './components/SiderComponent'

//API
import * as BooksAPI from './api/BooksAPI'

//UI Elements
import { Layout } from 'antd';
const { Content, Footer } = Layout;




export default class App extends Component {
  state = {
    books: [],
    collapsed: false,
  }
  componentDidMount(){
    this.getBooksList();
  }

  // ----> METHO'S THAT CONTROL THE UI

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  // ---> METHOD'S THAT USE THE API
  getBooksList = async () =>{ //get the book's list from the API
  await BooksAPI.getAll().then((books) => {
    this.setState({books})
    console.log(books)
  })
}

updateBookShelf = async (book, shelf) =>{ //update the book shelf using the API
  console.log(book,shelf)
  var response = null;
  await BooksAPI.update(book,shelf).then((resp) => {
    response = resp;
  })
  this.getBooksList();
  console.log(response)
  
}


render() {
  return (
    <Router>
      <Layout>
        <SiderComponent
          collapsed={this.state.collapsed}
        />
        <Layout>
          <HeaderComponent
            collapsed={this.state.collapsed}
            toggle={this.toggle}
          />
          <Content style={{ padding: '0 50px', marginTop: 50 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <Route exact path="/" render={()=>
                <BooksListScreen
                  books={this.state.books}
                  updateBookShelf={this.updateBookShelf}
                />}
              />
              <Route path="/search" render={()=>
                <SearchScreen
                  books={this.state.books}
                  updateBookShelf={this.updateBookShelf}
                />
              }/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            MyReads React Application - Developed by Gabriel Ávila
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}
}

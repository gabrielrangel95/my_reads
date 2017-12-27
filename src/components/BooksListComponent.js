import React, {Component} from 'react'

//Book Modal Component
import BookModalComponent from './BookModalComponent'

//PropTypes for set the require parameters
import PropTypes from 'prop-types'

//UI
import { List, Card, Avatar, Icon, Rate, Dropdown, Menu, message} from 'antd';
import '../App.css'
const { Meta } = Card;



export default class BooksListComponent extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    updateSearch: PropTypes.func,
  }

  state ={
    book:null,
    isModalVisible: false,
  }

  openModal = (book) =>{
    this.setState({book})
    this.setState({isModalVisible: true})
  }

  closeModal = () =>{
    this.setState({isModalVisible: false})
  }

  updateShelf = (book, shelf) =>{
    const { updateBookShelf, updateSearch } = this.props;
    this.openMensage()
    if(updateSearch){
      console.log('updating')
      updateSearch()
    }
    updateBookShelf(book,shelf)
  }


  dropdownMenu = (book) =>{
    var keySelect = [];
    keySelect.push(book.shelf);

    const menu = (
      <Menu
        onClick={(e)=> this.updateShelf(book, e.key)}
        selectedKeys={keySelect}
        >
        <Menu.Item key="currentlyReading">
          <a>Currently Reading</a>
        </Menu.Item>
        <Menu.Item key="wantToRead">
          <a>Want to Read</a>
        </Menu.Item>
        <Menu.Item key="read">
          <a>Read</a>
        </Menu.Item>
      </Menu>
    );
    return menu;
  }

  openMensage = () => {
    const hide = message.loading('Changing book shelf ...', 0);
    setTimeout(hide, 2500);
  };



  render(){
  const {books,title} = this.props
  return(
    <div>
      <List
        header={title}
        grid={{ gutter: 12, column: 3}}
        dataSource={books}
        renderItem={book => (
          <List.Item
            key={book.id}
            >
            <Card
              style={{ width:250, height: 'auto'}}
              cover={<img height={200} width={'auto'} alt={"book_cover"} src={book.imageLinks.thumbnail} />}
              actions={[
                <Icon type="info-circle-o" onClick={()=>this.openModal(book)}/>,
                // <Icon type="ellipsis" />
                <Dropdown
                  overlay={this.dropdownMenu(book)}
                  placement="bottomLeft">
                  <Icon type="ellipsis"/>
                </Dropdown>

              ]}
              >
                <Meta
                  avatar={<Avatar src="http://www.pvhc.net/img82/fumzgpczkruvxbourmry.png" />}
                  title={book.title}
                >
                </Meta>
                 <Rate allowHalf={true} value={book.averageRating} disabled={true} />
              </Card>
            </List.Item>
          )}
        />
        {
          this.state.book  &&(
            <BookModalComponent
              book={this.state.book}
              closeModal={this.closeModal}
              isModalVisible={this.state.isModalVisible}
             />
          )
        }
    </div>
    )
  }
}

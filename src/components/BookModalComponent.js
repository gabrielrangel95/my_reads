import React, {Component} from 'react'
import PropTypes from 'prop-types'

//UI
import { Modal, Rate } from 'antd';


export default class BookModalComponent extends Component{

  static propTypes = { //required prop types
    book: PropTypes.object.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
  }


  hideModal = () =>{ //close the modal, using the function passed on props
    const {closeModal} = this.props;
    closeModal();
  }

  render(){
    const { isModalVisible, book } = this.props
    return(
      <Modal
          title={"Title: "+book.title}
          visible={isModalVisible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
        >
          <div className="centerElements">
            <h2>Subtitle: </h2>
            <h4>{book.subtitle}</h4>
            <h4>Average Rating</h4>
            <Rate allowHalf={true} value={book.averageRating} />
            <img height={200} width={'auto'} alt={"book_cover"} src={book.imageLinks.thumbnail} />
            <h2>Authors: </h2>
            {book.authors.map((author)=>(
                  <div key={author}>{author}</div>
            ))}
            <h2>Description: </h2><h4>{book.description}</h4>
            <h2>Number of Pages: </h2>
            <h4>{book.pageCount}</h4>
          </div>
        </Modal>
    )
  }
}

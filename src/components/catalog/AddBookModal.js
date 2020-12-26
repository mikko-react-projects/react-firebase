import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Header, Dropdown, Image } from 'semantic-ui-react';
import { addProduct } from '../../actions/books';
import {categories} from './lib/categories'
import defaultImage from './logo512.png'

const AddProductModal = props => {

  const [ open, setOpen ] = useState(false);
  const [ bookName, setBookName ] = useState("");
  const [ author, setAuthor ] = useState("");
  const [ publisher, setPublisher ] = useState("")
  const [ year, setYear ] = useState(0)
  const [ category, setCategory ] = useState("Fantasy")
  const [ price, setPrice ] = useState(0);
  const [ blob, setBlob ] = useState("");
  const [ blobName, setBlobName ] = useState("");
  const [ file, setFile ] = useState(defaultImage);

  let fileReader;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitAdd({
      name: blobName,
      file: blob,
      bookName: bookName,
      author: author,
      publisher: publisher,
      year: year,
      category: category,
      price: price
    });
    setOpen(false);
  }

  const handleFileRead = (e) => {
    let content = fileReader.result;
    setBlob(dataURItoBlob(content));
    setFile(content);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    setBlobName(file.name);
    fileReader.onloadend = handleFileRead;
    fileReader.readAsDataURL(file);
  };

  const handleCategoryChange = (e, data) => {
    setCategory(data.value);
  };

  const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    }
    else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  }

  return (
    <Modal
      as={Form}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="blue" floated="right">Add todo</Button>}
      onSubmit={e => handleSubmit(e)}
    >
      <Header content="Add new book" />
      <Modal.Content>
        <Form.Input
          label="Book name"
          type="text"
          placeholder="book name"
          value={bookName}
          onChange={e => setBookName(e.target.value)}
        />
      </Modal.Content>
      <Modal.Content>
        <Form.Input
          label="Author"
          type="text"
          placeholder="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </Modal.Content>
      <Modal.Content>
        <Form.Input
          label="Publisher"
          type="text"
          placeholder="publisher"
          value={publisher}
          onChange={e => setPublisher(e.target.value)}
        />
      </Modal.Content>
      <Modal.Content>
        <Form.Input
          label="Year"
          type="number"
          step="1"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
      </Modal.Content>
      <Modal.Content>
        <Dropdown
          label="Category"
          placeholder="Select category"
          onChange={handleCategoryChange}
          options={categories}
          value={category}
        />
      </Modal.Content>
      <Modal.Content>
        <Form.Input
          label="Price"
          type="number"
          step="0.05"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </Modal.Content>
      <Modal.Content>
        <Image src={file} size='small' wrapped />
        <Form.Input
          type='file'
          id='file'
          className='input-file'
          onChange={e => handleFileChosen(e.target.files[0])}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          color="green"
          content="Add"
        />
      </Modal.Actions>
    </Modal>
)
};

const mapDispatchToProps = (dispatch) => ({
  submitAdd: (payload) => {
    dispatch(addProduct(payload))
  }
});

export default connect(null, mapDispatchToProps)(AddProductModal);

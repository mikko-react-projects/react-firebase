import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react'
import { addProduct } from '../../actions/books';
import defaultImage from './logo512.png'

const AddImage = props => {

  const [ file, setFile ] = useState(defaultImage);
  let fileReader;
  let name;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    let blob = dataURItoBlob(content);
    setFile(content);
    props.submitAdd({
      name: name,
      file: blob
    })
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    name = file.name;
    fileReader.onloadend = handleFileRead;
    fileReader.readAsDataURL(file);
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
    <div>
      <Image src={file} size='small' wrapped />
      <input
        type='file'
        id='file'
        className='input-file'
        onChange={e => handleFileChosen(e.target.files[0])}
      />
    </div>
  )
}
const mapDispatchToProps = (dispatch) => ({
  submitAdd: (payload) => {
    dispatch(addProduct(payload))
  }
});

export default connect(null, mapDispatchToProps)(AddImage);

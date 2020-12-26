import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchbooks } from '../../actions/books';

const Catalog = ({ fetchBooks, books }) => {

  useEffect(fetchBooks, []);

  return (
    <div>

    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    books: state.books.data
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchBooks: () => {
    dispatch(fetchbooks())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

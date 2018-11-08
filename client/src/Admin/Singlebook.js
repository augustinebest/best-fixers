import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom'

class SingleBook extends Component {

    state = {
        book: [],
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        axios.get(`http://localhost:4000/api/books/${id}`)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    book: res.data
                });
            })
    }

    handleDelete = () => {
        const id = this.props.match.params.id;
        axios.delete(`http://localhost:4000/api/books/${id}`)
            .then(res => {
                alert(res.data.message);
            })
        this.props.history.push('/admin');
        window.location.reload();
    }

    render() {
        const { book } = this.state;
        console.log(book);
        return (
            <Fragment>
                <br />
                <br />
                <div className='adminContentScreen'>
                    <button style={{ float: 'left' }} className='btn btn-default btn-md' onClick={() => { this.props.history.goBack() }}><i className='fa fa-arrow-left'></i>&nbsp; back </button>
                    <div>
                        <div className='detailMedia'>
                            <img src={book.image_url} alt='' />
                            <div style={{ paddingTop: '10px' }}>
                                <h2 style={{ margin: 0 }}><b> {book.title}</b></h2>
                                <p>{book.genre}</p><br />
                                <p><b>Pages: </b> {book.pages}</p>
                                <p><b>Author:</b></p>
                                <p>{book.author}</p><br />
                                <p><b>Publisher:</b></p>
                                <p> {book.publisher}</p>
                            </div>
                        </div>
                        <div style={{ width: '50%', float: 'left' }}>
                            <h3> Description</h3>
                            <p><span>{book.description}</span></p>
                        </div>
                        <p style={{ width: '50%', float: 'left' }}>
                            <h3> Download File </h3>
                                <button className='btn btn-primary btn-md' onClick={()=>{window.open(book.buy_url)}}><i className='fab fa-dropbox'></i>&nbsp;Download </button>
                        </p>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p style={{ marginTop: 50 }} >
                        <button className='btn btn-danger btn-md' onClick={this.handleDelete}> <i className='fa fa-trash'></i>&nbsp; Delete </button>
                        <button style={{ float: 'right' }} className='btn btn-primary btn-md' onClick={() => { this.props.history.replace(`/admin/books/edit/${book._id}`) }}><i className='fa fa-pen'></i> &nbsp;Edit</button>
                    </p>
                </div>
            </Fragment >
        )
    }
}

export default withRouter(SingleBook);
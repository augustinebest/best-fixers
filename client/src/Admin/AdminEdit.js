import React, { Component } from 'react';
import './Admin.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


class EditBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            author: '',
            genre: '',
            description: '',
            Publisher: '',
            image_url: '',
            buy_url: '',
        }
        this.editBook = this.editBook.bind(this);
    }


    async componentDidMount() {
        const id = this.props.match.params.id;
        // console.log(res.data, id);
        await axios.get(`http://localhost:4000/api/books/${id}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    author: res.data.author,
                    genre: res.data.genre,
                    description: res.data.description,
                    publisher: res.data.publisher,
                    image_url: res.data.image_url,
                    pages: res.data.pages,
                    buy_url: res.data.buy_url,
                });
            })
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    editBook(book) {
        const id = this.props.match.params.id;
        axios.put(`http://localhost:4000/api/books/${id}`, book)
            .then(res => {
                alert(res.data.message);
            });
        console.log(book);
    }


    handleSubmit = event => {
        let { title, description, author, genre, publisher, image_url, pages, buy_url } = this.state;
        const book = { title, description, author, genre, publisher, pages, image_url, buy_url };
        this.editBook(book);
        this.props.history.replace('/admin');
    }


    render() {
        const { title, description, author, genre, publisher, image_url, pages, buy_url } = this.state;
        return (
            <div className='AdminBody'>
                <main className='adminMain' style={{ width: '85%' }}>
                    <h2 style={{ marginLeft: '40%' }}> <b> Edit Book</b></h2>
                    <div className='adminContentScreen'>
                        <div>
                            <form className='addCeleb' onSubmit={this.handleSubmit}>
                                <input type='text' required placeholder='Title' required name='title' onChange={this.handleChange} autoComplete value={title} />
                                <input type='text' required placeholder='Author' required name='author' onChange={this.handleChange} autoComplete value={author} />
                                <input type='text' required placeholder='Book Genre' required name='genre' onChange={this.handleChange} autoComplete value={genre} />
                                <textarea required style={{ height: 180 }} placeholder='Description' name='description' onChange={this.handleChange} autoComplete value={description}></textarea>
                                <input required type='text' placeholder='Publisher' required name='Publisher' onChange={this.handleChange} autoComplete value={publisher} />
                                <input required type='text' placeholder='Image Url' required name='image_url' onChange={this.handleChange} autoComplete value={image_url} />
                                <input required type='text' placeholder='Buy Url' required name='buy_url' onChange={this.handleChange} autoComplete value={buy_url} />
                                <input required type='text' placeholder='Page Count' required name='pages' onChange={this.handleChange} autoComplete value={pages} />
                                <br />
                                <br />
                                <p>
                                    <button className='btn btn-default btn-md' style={{ float: 'left' }} onClick={() => { this.props.history.goBack() }}> <i className='fa fa-arrow-left'></i>&nbsp; Back </button>
                                    <button className='btn btn-primary btn-lg' style={{ float: 'right' }} type='submit'><i className='fa fa-save'></i> &nbsp;Save </button>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div>
                    </div>
                </main>

            </div>

        )
    }
}

export default withRouter(EditBooks);
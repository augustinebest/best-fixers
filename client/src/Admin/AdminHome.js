import React, { Component } from 'react'
import './Admin.css';
import Axios from 'axios';
import Thummnail from './thumbnail';


class AdminHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            BOOKS: '',
        }
    }

    async componentDidMount() {
        await Axios.get('http://localhost:4000/api/books')
            .then(res => {
                this.setState({
                    BOOKS: res.data
                })
            })
    }


    render() {
        const { BOOKS } = this.state
        return (
            <div className='AdminBody'>
                <main className='adminContentScreen' style={{ width: '73%' }}>
                    <h2 style={{ marginLeft: '40%' }}>All BOOKS</h2>
                    <div className='Thumbs'>
                        {
                            BOOKS &&
                            BOOKS.slice(0, BOOKS.length).map((item, index) => {
                                return (
                                    <Thummnail book={item} key={index} />
                                )
                            })
                        }
                    </div>
                </main>
            </div>
        )
    }
}

export default AdminHome;
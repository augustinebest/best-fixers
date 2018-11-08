import React, { Component, Fragment } from 'react';
import axios from 'axios';


export default class SignInUser extends Component {

    state = {
        username: null,
        password: null
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    signin = (artisan) => {
        axios.post('http://localhost:4000/api/addUser', artisan)
            .then(res => {
                alert(res.data.message);
            });
    }

    handleSubmit = event => {
        this.setState({
            loading: true
        });
        let { username, password } = this.state;
        const detail = { username, password };
        console.log(detail);
        this.signin(detail);
        this.props.history.replace('/requestService')
    }

    render() {
        const { username, password } = this.state;

        return (
            <Fragment>
                <div className='Artisan-Reg'>
                    <label> User SignIn </label>
                    <form className='Artisan-Reg-Form' onSubmit={this.handleSubmit}>
                        <input type='text' required placeholder='Username' required name='name' onChange={this.handleChange} value={username} />
                        <input type='password' required placeholder='Password' required name='phoneNumber' onChange={this.handleChange} value={password} />
                        <br />
                        <br />
                        <p>
                            <button className='btn btn-primary btn-md' type='submit'><i className='fa fa-save'></i>&nbsp; Submit </button>
                        </p>
                    </form>
                </div>
            </Fragment >
        )
    }
}
import React, { Component, Fragment } from 'react';
import axios from 'axios';


export default class SignUpUser extends Component {

    state = {
        name: '',
        phoneNumber: '',
        location: '',
        address: '',
        JobDescription: '',
        pictures: [],
        ExperienceLevel: '',
        DateAvailable: '',
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addArtisan = (artisan) => {
        axios.post('http://localhost:4000/api/addUser', artisan)
            .then(res => {
                alert(res.data.message);
            });
    }

    handleSubmit = event => {
        this.setState({
            loading: true
        });
        let { name, phoneNumber, location, address, JobDescription, pictures, ExperienceLevel, DateAvailable } = this.state;
        const artisan = { name, phoneNumber, location, address, JobDescription, pictures, ExperienceLevel, DateAvailable };
        console.log(artisan);
        this.addArtisan(artisan);
        this.props.history.replace('/requestService')
    }

    render() {
        const { name, phoneNumber, location, address, JobDescription, pictures, ExperienceLevel, DateAvailable } = this.state;

        return (
            <Fragment>
                <div className='Artisan-Reg'>
                    <label> User Register/SignUp </label>
                    <form className='Artisan-Reg-Form' onSubmit={this.handleSubmit}>
                        <input type='text' required placeholder='Enter Name' required name='name' onChange={this.handleChange} value={name} />
                        <input type='number' required placeholder='Phone Contact' required name='phoneNumber' onChange={this.handleChange} value={phoneNumber} />
                        <input type='text' required placeholder='Location' required name='location' onChange={this.handleChange} value={location} />
                        <input required type='text' placeholder='Address' required name='address' onChange={this.handleChange} value={address} />
                        <textarea required style={{ height: 150 }} placeholder='Description of Job' name='JobDescription' onChange={this.handleChange} value={JobDescription}></textarea>
                        {/* <div className='ArtisanImage'><img src='' alt='Image'/></div> */}
                        <input required type='file' accept="image/*" placeholder='Pictures' required name='pictures' onChange={this.handleChange} value={pictures} />
                        <input required type='text' placeholder='Experience Level' required name='ExperienceLevel' onChange={this.handleChange} value={ExperienceLevel} />
                        Date Available: <input required type='date' required name='DateAvailable' onChange={this.handleChange} value={DateAvailable} />
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
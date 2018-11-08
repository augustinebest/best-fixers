import React, { Fragment, Component } from 'react';
import { NavLink } from "react-router-dom";

class Thummnail extends Component {

    render() {
        const { book } = this.props;
        console.log(book);

        return (
            <Fragment>
                <div className='thumbnail'>
                    <div className='ThumbnailImage'>
                        <img src={book.image_url} alt='' style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className='thumbnailName'>
                        <b style={{fontSize: 'larger'}}>{book.title}</b>
                        <NavLink to={`/admin/books/${book._id}`}>
                            <button className='btn btn-primary btn-md' style={{ float: "right" }}> More Details</button>
                        </NavLink><br />
                        <b> {book.author} </b>
                    </div>
                </div>
            </Fragment >
        )
    }
}

export default Thummnail;
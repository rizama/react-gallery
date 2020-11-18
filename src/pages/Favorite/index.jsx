import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Favorite extends Component {

    render() {
        console.log(this.props.favorites);
        return (
            <div className="container mt-4">
                <div className="card-columns ">
                    {
                        this.props.favorites.length > 0 ?
                            this.props.favorites.map(favorite => {
                                return (
                                    <div className="card" key={favorite.id}>
                                        <img src={favorite.url} className="card-img-top" alt="thumb" />
                                        <div className="card-body">
                                            <h5 className="card-title">{favorite.title}</h5>
                                            <p className="card-text">Album - {favorite.album}</p>
                                            <p className="card-text">By - {favorite.user}</p>
                                        </div>
                                    </div>
                                )
                            }) :
                            <div className="text-center">
                                <h1>No Favorite Photos</h1>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    favorites: state.favorites
})


export default connect(reduxState)(Favorite)

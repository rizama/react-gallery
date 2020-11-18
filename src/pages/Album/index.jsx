import React, { Component } from 'react'
import { connect } from 'react-redux';
import API from '../../services/request';
import { actionAddComment, actionAddFavorite } from '../../configs/redux/action';
import './Album.css';

export class Album extends Component {

    state = {
        photos: [],
        album: null,
        user: null,
        comment: ""
    }

    albumId = this.props.match.params.id;

    async componentDidMount() {
        this.getDataApi();
    }

    getDataApi = async () => {

        const result = await API.GET(`photos?albumId=${this.albumId}`);
        const [album] = await API.GET(`albums?id=${this.albumId}`);
        const [userData] = await API.GET(`users?id=${album.userId}`);

        this.setState({
            photos: result,
            album: album,
            user: userData
        })
    }

    handleComment = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    handleSubmitComment = () => {

        let new_comment = {
            albumId: this.state.album.id,
            content: this.state.comment
        }

        if (!new_comment.content.trim()) return;

        this.props.addComment(new_comment)
            
        this.setState({
            ...this.state,
            comment: ''
        })
    }

    handleFavorite = (photo, user, album) => {
        photo.user = user
        photo.album = album
        this.props.addFavorite(photo)

        this.forceUpdate()
    }

    handleDetailUser = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    render() {
        return (
            <div className="container-fluid mt-4">
                <div className="jumbotron">
                    <h1 className="display-4">{this.state.album?.title}</h1>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card-columns">
                            {
                                this.state.photos.map((photo, index) => {
                                    return (
                                        <div className="card" key={photo.id}>
                                            <img src={photo.url} className="card-img-top" alt="thumb" />
                                            <div className="card-body text-center">
                                                <h5 className="card-title">{photo.title}</h5>
                                                <button type="submit" className={`btn btn-success`} onClick={() => this.handleFavorite(photo, this.state.user?.name, this.state.album?.title)}>Make as Favorite</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card" >
                            <img src="https://picsum.photos/300/100" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Comments</h5>
                                <p className="card-text">Hi..</p>
                                <div className="form-group">
                                    <label htmlFor="comment">Comment Here...</label>
                                    <input type="text" className="form-control" placeholder="Comment" id="comment" aria-describedby="comment" onChange={this.handleComment} value={this.state.comment}/>
                                    <small id="info" className="form-text text-muted">I'm very appreciated it.</small>
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.handleSubmitComment}>Submit</button>
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    this.props.comments.filter(comment => comment.albumId === parseInt(this.albumId)).map((item, index) => {
                                        return (
                                            <li className="list-group-item" key={index}>{item.content}</li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="card-body">
                                <span onClick={() => this.handleDetailUser(this.state.user?.id)} className="card-link cursor">{this.state.user?.name}</span>
                                <span className="card-link cursor">{this.state.user?.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    userId: state.user_id,
    comments: state.comments,
    favorites: state.favorites
})

const reduxDispatch = (dispatch) => ({
    addComment: (data) => dispatch(actionAddComment(data)),
    addFavorite: (data) => dispatch(actionAddFavorite(data))
})

export default connect(reduxState, reduxDispatch)(Album)

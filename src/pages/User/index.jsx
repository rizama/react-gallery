import React, { Component } from 'react'
import API from '../../services/request';
import './User.css';

export class User extends Component {
    state = {
        user: {},
        albums: []
    }

    async componentDidMount() {
        this.getDataApi();
    }

    userId = this.props.match.params.id;

    getDataApi = async () => {

        const albums = await API.GET(`albums?userId=${this.userId}`);
        const [userData] = await API.GET(`users?id=${this.userId}`);

        this.setState({
            user: userData,
            albums
        })
    }

    handleDetailAlbum = (id) => {
        this.props.history.push(`/albums/${id}`)
    }


    render() {
        return (
            <div className="container mt-4 mb-4">
                <div className="row">
                    <div className="col-4">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Profile</a>
                            <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Address</a>
                            <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Company</a>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                                <table className="table table-borderless table-sm">
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>{this.state.user.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Username</td>
                                            <td>{this.state.user.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{this.state.user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td>{this.state.user.phone}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                                <table className="table table-borderless table-sm">
                                    <tbody>
                                        <tr>
                                            <td>City</td>
                                            <td>{this.state.user.address?.city}</td>
                                        </tr>
                                        <tr>
                                            <td>Street</td>
                                            <td>{this.state.user.address?.street}</td>
                                        </tr>
                                        <tr>
                                            <td>Suite</td>
                                            <td>{this.state.user.address?.suite}</td>
                                        </tr>
                                        <tr>
                                            <td>Zipcode</td>
                                            <td>{this.state.user.address?.zipcode}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                                <table className="table table-borderless table-sm">
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>{this.state.user.company?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Catch Phrase</td>
                                            <td>{this.state.user.company?.catchPhrase}</td>
                                        </tr>
                                        <tr>
                                            <td>BS</td>
                                            <td>{this.state.user.company?.bs}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="mt-4">List Album</h2>
                <div className="row">
                    {
                        this.state.albums.map((item) => {
                            return (
                                <div className="col-md-6 mt-2" key={item.id}>
                                    <div className="card mb-3">
                                        <img src="https://picsum.photos/100/30?blur" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title" onClick={() => this.handleDetailAlbum(item.id)}>{item.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default User

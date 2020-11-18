import React, { Fragment } from 'react';
import { Component } from 'react';
import API from '../../services/request';
import './Home.css';

class Home extends Component {
    state = {
        albums: [],
        filterResult: []
    }

    async componentDidMount() {
        
        let albums = [];
        let users = [];
        try {
            albums = await this.getData('albums');
            users = await this.getData('users');
        } catch (error) {
            albums = [];
            users = [];
        }

        let data = albums.map((album) => {
            let dataUser = users.find(user => user.id === album.userId);

            let { name, email } = dataUser;
            album.user = { name, email }
            return album
        })
        this.setState({
            albums: data,
            filterResult: data
        })
    }

    async getData(path) {
        return await API.GET(path);
    }

    handleFilter = (event) => {
        let term = event.target.value;
        this.setState({
            filterTerm: term
        })

        const result = this.state.albums.filter(album => {
            if (album.title.toLowerCase().includes(term.toLowerCase()) || album.user.name.toLowerCase().includes(term.toLowerCase())) {
                return album
            }
        })

        this.setState({
            filterResult: result
        })
    }

    handleDetailAlbum = (id) => {
        this.props.history.push(`/albums/${id}`)
    }

    handleDetailUser = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    render() {
        return (
            <Fragment>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <div className="input-group input-group-lg">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-lg">Search Album</span>
                            </div>
                            <input placeholder="Search Here.." onChange={this.handleFilter} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                    </div>
                </div>
                <div className="container mt-4 mb-4">
                <h1 className="display-4 text-center" >All Albums</h1>
                    <div className="row ">
                        {
                            this.state.filterResult.map((item) => {
                                return (
                                    <div className="col-md-6 mt-2" key={item.id}>
                                        <div className="card mb-3">
                                            <img src="https://picsum.photos/100/30?blur" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title" onClick={() => this.handleDetailAlbum(item.id)}>{item.title}</h5>
                                                <p className="card-title" onClick={() => this.handleDetailUser(item.userId)}><small className="text-muted">By - {item.user.name} ({item.user.email})</small></p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Home
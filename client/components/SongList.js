import React, { Component } from 'react';
import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSong';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
    onSongDelete(id) {
        console.log(this.props)
        this.props.mutate({ variables: { id }})
        .then(() => {
            this.props.data.refetch();
        })
    }
    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => {
            return (
                <li key={ id } className="collection-item">
                <Link to={`/songs/${id}`}>
                        { title }
                        </Link>
                    <div className="right" style={{cursor: "pointer"}}>
                        <i 
                            className="material-icons"
                            onClick={() => this.onSongDelete(id)}
                        >delete</i></div>
                </li>
            )
        })
    }
    render() {
        if(this.props.data.loading) {
            return (
                <div>Loading</div>
            )
        } else {
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right">
                <i className="material-icons">add</i>
                </Link>
            </div>

        )
    }
    }
}

export default graphql(deleteSong)(
    graphql(fetchSongs)(SongList)
);
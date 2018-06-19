import React, { Component } from 'react';
import gql from 'graphql-tag';
import fetchSongs from '../queries/fetchSongs'
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '' }
    }
    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{ query: fetchSongs }]
        }).then(() => hashHistory.push('/'));
    }

    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                <Link to="/">Back</Link>
                    <h3>Create a new Song</h3>
                    <label>Song Title:</label>
                    <input 
                        onChange={event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>                
            </div>
        )
    }
}

const mutation = gql`
mutation AddSong($title: String){
	addSong(title: $title) {
        title
  }
}
`;

// props.mutate
export default graphql(mutation)(SongCreate);

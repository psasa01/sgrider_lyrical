import React, { Component } from 'react'
import likeLyric from '../queries/likeLyric';
import { graphql } from 'react-apollo';

class LyricList extends Component {
    onLike(id) {
        this.props.mutate({ variables: { id } })
    
    }
    renderLyrics() {
        return this.props.lyrics.map(({ id, content }) => {
            return(
                <li className="collection-item" key={id}>
                    {content}
                    <i 
                        className="material-icons right"
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                            this.onLike(id)
                        }}
                    >
                        thumb_up
                    </i>
                </li>
            )
        })
    }
    render() {
        
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

export default graphql(likeLyric)(LyricList);

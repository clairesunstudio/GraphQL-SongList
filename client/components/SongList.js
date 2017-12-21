import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../queries/fetchSongs'

import '../style/style.css'

class SongList extends Component {
  onSongDelete(id){
    this.props.mutate({ variables: { id }})
      .then(() => { this.props.data.refetch() }) //this component have access to query data and can directly run this refetch method
  }

  renderSongs() {
    return this.props.data.songs.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          {title}
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(id)}
          >
          delete</i>
        </li>
      )
    })
  }
  render(){
    console.log(this.props.data.songs)
    if (this.props.data.loading) {return <div>Loading...</div>}
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>

    )
  }
}

const mutation = gql`
  mutation deleteSong($id: ID){
    deleteSong(id: $id){
  		id
    }
  }
`

export default graphql(mutation)(
  graphql(query)(SongList)
)

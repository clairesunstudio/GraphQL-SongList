import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'

class SongCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }] //force refetch query for Apollo client to render
    }).then(() => hashHistory.push('/'))
  }
  render() {
    return (
      <div>
        <Link
          to="/"
          className="btn-floating btn-large blue"
        >
          <i className="material-icons">keyboard_backspace</i>
        </Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title: </label>
          <input
            onChange={event=> this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation addSong($title: String){
    addSong(title: $title ){
      title
    }
  }
`

export default graphql(mutation)(SongCreate)

import React, { Component } from 'react'
import Modal from 'react-modal'
import UserList from './UserList'
import Header from './Header'

class UserCard extends Component {
  constructor (props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)

    this.state = {
      modalIsOpen: false
    }
  }

  toggleModal () {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen
    }))
  }

  render () {
    return (
      <div className='card'>
        <Header toggleModal={this.toggleModal}/>
        <UserList />
        <Modal isOpen={this.state.modalIsOpen}>
          <form>
            <input type='text' placeholder='fullname' />
            <input type='text' placeholder='email' />
            <input type='text' placeholder='username' />
            <input type='text' placeholder='password' />
            <input type='submit' />
          </form>
        </Modal>
        <style jsx>{`
          .card {
            max-width: 960px;
            margin: 0 auto;
          }
        `}</style>
      </div>
    )
  }
}

export default UserCard

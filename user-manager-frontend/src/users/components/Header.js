import React from 'react'
import UserSearch from './UserSearch'
import Button from '../../shared/components/Button'
import SubHeader from './SubHeader'

const Header = (props) => (
  <header className='header'>
    <div className='principal'>
      <UserSearch />
      <Button onClick={props.toggleModal}>
        Add user
      </Button>
    </div>
    <SubHeader />
    <style jsx>{`
      .header {
        background-color: #f5f5f5;
      }

      .principal {
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        height: 56px;
        justify-content: space-between;
      }
    `}</style>
  </header>
)

export default Header

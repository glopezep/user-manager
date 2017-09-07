import React from 'react'
import UserSearch from './UserSearch'
import Button from '../../shared/components/Button'

const SubHeader = (props) => (
  <div className="row">
    <span className='column'>Id</span>
    <span className='column'>Fullname</span>
    <span className='column'>Email</span>
    <span className='column'>Username</span>
    <style jsx>{`
      .column {
        flex: 1
      }

      .row {
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        height: 30px;
      }
    `}</style>
  </div>
)

export default SubHeader

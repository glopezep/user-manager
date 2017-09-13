import React from 'react'

const User = (props) => (
  <article className='row'>
    <span className='column'>1</span>
    <span className='column'>Guillermo Lopez</span>
    <span className='column'>guillermolopez2529@gmail.com</span>
    <span className='column'>guillermolopez</span>

    <style jsx>{`
      .column {
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        flex: 1
        font-size: .9em;
        height: 56px;
      }

      .row {
        display: flex;
      }
    `}</style>
  </article>
)

export default User

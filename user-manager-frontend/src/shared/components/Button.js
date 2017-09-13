import React from 'react'

const Button = (props) => (
  <button className="button" style={props.style} onClick={props.onClick}>
    {props.children}

    <style jsx>{`
      .button {
        align-items: center;
        background-color: #039be5;
        border: none;
        box-shadow: 0 2px 5px 0 silver;
        color: #fff;
        cursor: pointer;
        display: flex;
        font-weight: lighter;
        font-size: .9em
        justify-content: center;
        min-height: 36px;
        min-width: 86px;
        padding: 0 1em;
        transition: background .3s ease;
        text-transform: uppercase;
      }

      .button:hover {
        background-color: #0388ca;
      }
    `}</style>
  </button>
)

export default Button

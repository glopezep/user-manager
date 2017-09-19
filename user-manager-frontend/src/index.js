import React from 'react'
import page from 'page'
import { render } from 'react-dom'

const container = document.getElementById('root')

page('/', (ctx, next) => {
  render(<h1>Home view</h1>, container)
})

page('/next', (ctx, next) => {
  render(<h1>Next view</h1>, container)
})

page()

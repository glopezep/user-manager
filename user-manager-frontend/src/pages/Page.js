import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Home from './Home'

const Page = (props) => (
  <Router>
    <main>
      <Route exact path="/" component={Home}/>

      {/* Global Styles */}
      <style jsx global>{`
        body {
          font-size: 16px;
          font-family: 'arial'
        }
      `}</style>
    </main>
  </Router>
)

export default Page

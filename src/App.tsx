import React from 'react'

import 'antd/dist/antd.css'
import './App.css'
import { REACT_APP_BASE_URL } from './actions/types'
import TabsContainer from './components/TabsContainer'
import categoriesList from './reducer/categories-list'

const App: React.FC = () => {
  console.log('app.tsx')
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>APP</code>
        </p>
        <a
          className="App-link"
          href={REACT_APP_BASE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          BASE_URL
        </a>
      </header>
      <TabsContainer/>
    </div>
  )
}

export default App

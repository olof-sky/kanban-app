import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteHandler from './helpers/routeHandler'
import { AuthProvider } from './context/AuthContext'
import './styles/App.scss'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <AuthProvider>
            <BrowserRouter>
              <RouteHandler/>
            </BrowserRouter>
          </AuthProvider>
        </main>
      </div>
    )
  }
}

export default App;
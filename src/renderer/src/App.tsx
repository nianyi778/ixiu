import { Suspense } from 'react'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import Overlook from './views/Overlook'
import Home from './views/Home'
import SettingMenu from './views/SettingMenu'

import Layout from './components/Layout'

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Suspense fallback={null}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout type="upDown">
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/overlook"
              element={
                <Layout>
                  <Overlook />
                </Layout>
              }
            />
            <Route
              path="/settingmenu"
              element={
                <Layout type="none" defaultVisible>
                  <SettingMenu />
                </Layout>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App

import { lazy, Suspense } from 'react'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
const Overlook = lazy(() => import('./views/Overlook'))
const Home = lazy(() => import('./views/Home'))
const SettingMenu = lazy(() => import('./views/SettingMenu'))
import Layout from './components/Layout'

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Suspense fallback={<div>加载中...</div>}>
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

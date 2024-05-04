import { Col, Container } from 'react-bootstrap'
import './App.scss'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AuthProvider } from './context/AuthContext'

const Home = lazy(() => import  ('./components/Home'))
const File = lazy(() => import  ('./components/File'))
const FileSent = lazy(() => import  ('./components/FileSent'))
const RequestFiles = lazy(() => import  ('./components/RequestFiles'))

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Container>
          <Col xl={{span: 6, offset: 3}}>
            <Routes>
              <Route path='/' element={<Suspense><Home/></Suspense>}/>
              <Route path='/files' element={<Suspense><RequestFiles/></Suspense>}/>
              <Route path='/files/:id' element={<Suspense><File/></Suspense>}/>
              <Route path='/sent' element={<Suspense><FileSent/></Suspense>}/>
            </Routes>
          </Col>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Reg from './pages/Reg'
import Log from './pages/Log'
import Main from "./pages/protected/Main"
import ProtectedRoute from './components/ProtectedRoute'
import AllNotes from "./pages/protected/AllNotes"
import User from "./pages/protected/User"
import ConfirmBox from "./components/ConfirmBox"
import { Toaster } from 'react-hot-toast'
 



function App() {

  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Reg/>} />
        <Route path="/" element={<Log/>}/>
        <Route path="/" element={<ConfirmBox/>}/>

        // Protected Routes
        <Route path="/main" element={
        <ProtectedRoute>
          <Main/>
        </ProtectedRoute>}/>

        <Route path="/all" element={
          <ProtectedRoute>
            <AllNotes/>
          </ProtectedRoute>
        } />

        <Route path="/user" element={
          <ProtectedRoute>
            <User/>
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App

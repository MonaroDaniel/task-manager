//@ts-ignore
import React from "react"
import Routes from "./routes/routes"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <div className='w-screen h-screen relative bg-wh-02'>
      <Routes />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        pauseOnFocusLoss
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"></ToastContainer>
    </div>
  )
}

export default App

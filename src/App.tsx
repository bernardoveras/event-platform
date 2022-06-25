import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import { client } from "./lib/apollo"
import { Router } from "./Router"

import 'react-toastify/dist/ReactToastify.min.css';
import { Slide, ToastContainer } from "react-toastify";

function App() {


  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
        <ToastContainer
          limit={3}
          theme='dark'
          pauseOnFocusLoss={false}
          transition={Slide}
          draggable={false}
        />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App

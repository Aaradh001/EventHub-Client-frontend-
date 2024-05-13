import { Provider } from "react-redux";
import clientStore from "./redux/clientStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientWrapper from "./components/ClientWrapper"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from "./constants/constants";
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <Router>
      < ToastContainer/>
      <Provider store={clientStore}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Routes>
            <Route path="/*" element={<ClientWrapper />}></Route>
          </Routes>
        </GoogleOAuthProvider>
      </Provider>
    </Router >
  );
}

export default App;




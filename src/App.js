import './App.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Switch
} from "react-router-dom";
import Login from './login';
import Welcome from './welcome';
import Layout from './layout';
import Docs from './docs';
import YourDocs from './docs/yourdocs';
import PrivateRoute from './privateRoute';
import UploadDocs from './docs/uploaddocs';

function App() {
  return (

    <div>

      <BrowserRouter>
        <Switch>

          <Route exact path="/" component={Login} />
          <Layout>
            <PrivateRoute exact path="/welcome" component={Welcome} />
            <PrivateRoute exact path="/home" component={Docs} />
            <PrivateRoute exact path="/yourdocs" component={YourDocs} />
            <PrivateRoute exact path="/uploaddocs" component={UploadDocs} />

          </Layout>

        </Switch>
      </BrowserRouter>

      {/* <ToastContainer position='bottom-center' style={{ fontSize: "12px", fontWeight: "600" }} /> */}
    </div>

  );
}

export default App;

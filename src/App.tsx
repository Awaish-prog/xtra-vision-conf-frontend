import { Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MeetingPage from './pages/MeetingPage';

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/signup" element = {<Signup />} />
      <Route path = "/meetings" element = {<Dashboard />} />
      <Route path = "/join-meeting*" element = {<MeetingPage />} />
    </Routes>
    </>
  );
}

export default App;

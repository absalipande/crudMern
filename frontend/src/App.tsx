import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Users from './components/User';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          path='/'
          element={<Users _id={''} name={''} age={0} email={''} gender={''} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

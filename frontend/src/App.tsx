import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Users from './components/User';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          path='/'
          element={<Users _id={''} name={''} age={0} email={''} gender={''} />}
        />
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/edit-user/:id' element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import 'bootstrap';
import Navigation from './utils/navigation';
import UserProvider from './utils/userProvider';

function App() {
  return (
    <UserProvider>
      <Navigation/>
    </UserProvider>
  );
}

export default App;

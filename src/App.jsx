import './App.css';
import React, { Suspense } from 'react';

const Data = React.lazy(() => import('./data/data.jsx'));

function App() {
  return (
    <div>
      <h1 className='text-5xl font-bold tracking-tight text-gray-1000 ' >Lazy Loading</h1>
      <Suspense fallback={<h2>Please Wait Data Loading...</h2>}>
        <Data />
      </Suspense>
    </div>
  );
}

export default App;
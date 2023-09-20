import { useState } from 'react';
import Header from './Components/Header';
import News from './Components/News';
import { Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default function App() {

  const [progress, setProgress] = useState(0)

  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NOT_SECRET_CODE;

  return (
    <>
      <Header />
      <LoadingBar color='#f11946' progress={progress} height={4} />
      <Routes>
        <Route key="home" path='/' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} query="India" />}></Route>
        <Route key="business" path='/business' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} query="business" />}></Route>
        <Route key="entertainment" path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} query="entertainment" />}></Route>
        <Route key="general" path='/general' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} query="general" />}></Route>
        <Route key="health" path='/health' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} query="health" />}></Route>
        <Route key="science" path='/science' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} query="science" />}></Route>
        <Route key="sports" path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} query="sports" />}></Route>
        <Route key="technology" path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} query="technology" />}></Route>
      </Routes>
    </>
  )
}

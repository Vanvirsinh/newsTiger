import React, { Component } from 'react';
import Header from './Components/Header';
import News from './Components/News';
import { Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route key="home" path='/' element={<News pageSize={9} query="modi" />}></Route>
          <Route key="business" path='/business' element={<News pageSize={9} query="business" />}></Route>
          <Route key="entertainment" path='/entertainment' element={<News pageSize={9} query="entertainment" />}></Route>
          <Route key="general" path='/general' element={<News pageSize={9} query="general" />}></Route>
          <Route key="health" path='/health' element={<News pageSize={9} query="health" />}></Route>
          <Route key="science" path='/science' element={<News pageSize={9} query="science" />}></Route>
          <Route key="sports" path='/sports' element={<News pageSize={9} query="sports" />}></Route>
          <Route key="technology" path='/technology' element={<News pageSize={9} query="technology" />}></Route>
        </Routes>
      </>
    )
  }
}

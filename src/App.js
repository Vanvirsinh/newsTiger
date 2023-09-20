import React, { Component } from 'react';
import Header from './Components/Header';
import News from './Components/News';
import { Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({
      progress
    })
  }

  pageSize = 9;
  apiKey = process.env.REACT_APP_NOT_SECRET_CODE;

  render() {
    return (
      <>
        <Header />
        <LoadingBar color='#f11946' progress={this.state.progress} height={4} />
        <Routes>
          <Route key="home" path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} query="India" />}></Route>
          <Route key="business" path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} query="business" />}></Route>
          <Route key="entertainment" path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} query="entertainment" />}></Route>
          <Route key="general" path='/general' element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} query="general" />}></Route>
          <Route key="health" path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} query="health" />}></Route>
          <Route key="science" path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} query="science" />}></Route>
          <Route key="sports" path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} query="sports" />}></Route>
          <Route key="technology" path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} query="technology" />}></Route>
        </Routes>
      </>
    )
  }
}

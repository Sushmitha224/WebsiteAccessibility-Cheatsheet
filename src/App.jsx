// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import Searchbar from './components/Searchbar/Searchbar';
import Buttons from './components/Buttons/Buttons';
import ZoomReflowTextSpacing from './components/Codes/ZoomReflowTextSpacing/ZoomReflowTextSpacing';
import VFI from './components/Codes/VFI/VFI';
import KeyboardAccessibility from './components/Codes/KeyboardAccessibility/KeyboardAccessibility';
import { getZoomAllCodes } from './components/Codes/ZoomReflowTextSpacing/ZoomReflowTextSpacing';
import { getVFIAllCodes } from './components/Codes/VFI/VFI';
import { getKeyboardAllCodes } from './components/Codes/KeyboardAccessibility/KeyboardAccessibility';
import './App.css';

const App = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [foundResult, setFoundResult] = useState(true); // New state variable

  const redirectToPage = (page, keyword) => {
    window.location.href = `/${page}?keyword=${encodeURIComponent(keyword)}`;
  };
  

  useEffect(() => {
    setFoundResult(true); // Reset foundResult to true for each search

    if (searchKeyword.trim() !== '') {
      switch (true) {
        case isKeywordPresentInTitles(searchKeyword, getZoomAllCodes()):
          redirectToPage('zoomreflowtextspacing', searchKeyword);
          break;
        case isKeywordPresentInTitles(searchKeyword, getVFIAllCodes()):
          redirectToPage('vfi', searchKeyword);
          break;
        case isKeywordPresentInTitles(searchKeyword, getKeyboardAllCodes()):
          redirectToPage('keyboardaccessibility', searchKeyword);
          break;
        default:
          setFoundResult(false); // Set foundResult to false if no match is found
          break;
      }
    }
  }, [searchKeyword]);

  return (
    <Router basename="/WebsiteAccessibility-Cheatsheet">
      <Routes>
        <Route path="/" element={<DefaultLayout content={null} setSearchKeyword={setSearchKeyword} foundResult={foundResult} searchKeyword={searchKeyword}/>} />
        <Route path="/zoomreflowtextspacing" element={<ZoomReflowTextSpacing />} />
        <Route path="/vfi" element={<VFI />} />
        <Route path="/keyboardaccessibility" element={<KeyboardAccessibility />} />
      </Routes>
    </Router>
  );
};

const DefaultLayout = ({ content, setSearchKeyword, foundResult, searchKeyword }) => (
  <div>
    <NavBar />
    <Searchbar setSearchKeyword={setSearchKeyword} />
    <Buttons />
    <div className='not-found'>{foundResult ? content : <p><strong>{searchKeyword}</strong> Not found.</p>}</div>
  </div>
);


// Function to check if the searchKeyword is present in any title in any codes
const isKeywordPresentInTitles = (searchKeyword, allCodes) => {
  return Object.values(allCodes).some(code => code.title.toLowerCase().includes(searchKeyword.toLowerCase()));
};



export default App;

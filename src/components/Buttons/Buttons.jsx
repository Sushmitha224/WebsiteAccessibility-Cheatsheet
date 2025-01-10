import React from 'react';
import { Link } from 'react-router-dom';
import './Buttons.css';

const Buttons = () => {
    return (
        <div className='button-container'>
            <Link to="/zoomreflowtextspacing">
                <button>Zoom, Reflow, Text Spacing</button>
            </Link>
            <Link to="/vfi">
                <button>VFI</button>
            </Link>
            <Link to="/keyboardaccessibility">
                <button>Keyboard Accessibility</button>
            </Link>
    </div>
  )
}

export default Buttons;

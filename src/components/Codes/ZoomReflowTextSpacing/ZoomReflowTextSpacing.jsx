import React, { useState, useEffect } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; //We can choose different style
import { useLocation } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import 'prismjs/themes/prism.css'

import './ZoomReflowTextSpacing.css';

const ZoomReflowTextSpacing = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchKeyword = searchParams.get('keyword');

    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        // Fetch codes
        const codesArray = Object.entries(getZoomAllCodes()).map(([key, value]) => ({ ...value, id: key, copied: false }));
        setCodeBlocks(codesArray);
    }, []);

    const handleCopy = (index) => {
        const updatedCodeBlocks = [...codeBlocks];
        updatedCodeBlocks[index].copied = true;
        setCodeBlocks(updatedCodeBlocks);

        setTimeout(() => {
            updatedCodeBlocks[index].copied = false;
            setCodeBlocks(updatedCodeBlocks);
        }, 2000);
    };

    const filteredCodes = searchKeyword
        ? codeBlocks.filter((code) => code.title.toLowerCase().includes(searchKeyword.toLowerCase()))
        : codeBlocks;

    return (
        <div id="/zoomreflowtextspacing">
            <h1>Zoom, Reflow, Text Spacing</h1>
            <div className='code-container'>
                {filteredCodes.map(({ title, code, copied }, index) => (
                    <CodeBlock
                        key={index}
                        title={title}
                        code={code}
                        copied={copied}
                        handleCopy={() => handleCopy(index)}
                    />
                ))}
            </div>
        </div>
    );
};

const CodeBlock = ({ title, code, copied, handleCopy }) => {
    return (
        <div className='code-wrapper'>
            <h2>{title}</h2>
            <CopyToClipboard text={code} onCopy={handleCopy}>
                <div className='code-container'>
                    <SyntaxHighlighter language="css" style={atomDark}>
                        {code}
                    </SyntaxHighlighter>
                    <button className='copy-button'>{copied ? 'Copied!' : 'Copy Code'}</button>
                </div>
            </CopyToClipboard>
        </div>
    );
};


export const getZoomAllCodes = () => {
    return {
      'code1': {
        title: 'Text in the email address field is overlapping with the tick mark.',
        code: `/* Text in the email address field is overlapping with the tick mark */
form .email-wrap input[type="email"] {
    padding-right: 48px;
}
form .nf-pass.field-wrap .nf-field-element:after {
    right: 10px !important;
}`
      },
      'code2': {
        title: 'Form error messages are broken at 100% zoom with or without text-spacing.',
        code: `/* Error message is misaligned in forms */
.label-right .nf-after-field {
    width: 100% !important;
}
.nf-after-field .nf-error-msg {
    margin-right: 0px !important;
}`
      },
  
    };
  };

export default ZoomReflowTextSpacing;

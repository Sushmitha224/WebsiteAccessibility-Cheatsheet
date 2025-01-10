import React, { useState, useEffect } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; //We can choose different style
import { useLocation } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import './VFI.css';

const VFI = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchKeyword = searchParams.get('keyword');

    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        // Fetch codes
        const codesArray = Object.entries(getVFIAllCodes()).map(([key, value]) => ({ ...value, id: key, copied: false }));
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
        <div id="/vfi">
            <h1>VFI</h1>
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


export const getVFIAllCodes = () => {
    return {
    'code1' : {
        title: 'VFI: Links or Buttons',
        code: `/* VFI for links or buttons */
a:focus {
    outline: #000 2px dotted !important;
    outline-offset: 0 !important;
    box-shadow: 0 0 0 2px #fff !important;
    border-radius: 0 !important;
}`
    },

    'code2' : {
        title: 'Partial VFI: Links in copyright section',
        code: `/* Partial VFI for copyright section links */
.default-footer a:focus {
    box-shadow: none !important;
    outline-color: #ffffff !important;
}`
    }
};
};



export default VFI;

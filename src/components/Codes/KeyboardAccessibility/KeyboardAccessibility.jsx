import React, { useState, useEffect } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; //We can choose different style
import { useLocation } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import './KeyboardAccessibility.css';

const KeyboardAccessibility = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchKeyword = searchParams.get('keyword');

    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        // Fetch codes
        const codesArray = Object.entries(getKeyboardAllCodes()).map(([key, value]) => ({ ...value, id: key, copied: false }));
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
        <div id="/keyboardaccessibility">
            <h1>Keyboard Accessibility</h1>
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


export const getKeyboardAllCodes = () => {
    return {
      'code1': {
        title: 'Esc key: Disclaimer close',
        code: `// Esc key is not working for form disclaimer close
$(window).on('keydown', function(e) {
    if (e.key.toUpperCase() === 'ESCAPE') {
        $('#fl-disclaimer.active #fl-disclaimer__close').click();
    }
}); `
      },
      'code2': {
        title: 'Esc key: Chat close',
        code: `// [ADA] Fix Chat to close with ESCAPE key
$(window).on('keydown', function(e){
    var closeChat = $('.LPMcloseButton');
    if (e.key.toUpperCase() === 'ESCAPE' && closeChat.is(':visible') === true){
        closeChat.trigger('click');
    }
});`
      },
    };
  };

export default KeyboardAccessibility;

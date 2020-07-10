import React, { useState, ChangeEvent } from 'react';
import './style.scss';
import Icon from 'components/Icon';

interface CodeProps {}

interface Lang {
  label: string;
  syntax: string;
}

const LANGS: Lang[] = [
  { label: 'Javascript', syntax: 'javascript' },
  { label: 'CSS', syntax: 'css' },
  { label: 'HTML', syntax: 'html' },
  { label: 'Golang', syntax: 'golang' },
  { label: 'C', syntax: 'c' },
  { label: 'C++', syntax: 'cpp' },
  { label: 'Bash', syntax: 'bas' },
  { label: 'Java', syntax: 'java' },
  { label: 'Typescript', syntax: 'ts' },
  { label: 'React JSX ', syntax: 'jsx' },
  { label: 'React TSX', syntax: 'tsx' },
  { label: 'Git', syntax: 'git' },
  { label: 'Json', syntax: 'json' },
];

const Code: React.FC<CodeProps> = ({ children, ...props }) => {
  const [selectedLang, setSelectedLang] = useState('javascript');

  const handleLangChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLang(event.target.value);
  };

  return (
    <div className='prismjscode'>
      <div className='prismjscode-header' contentEditable={false}>
        <select
          className='prismjscode-switch'
          value={selectedLang}
          onChange={handleLangChange}
        >
          {LANGS.map((lang) => (
            <option value={lang.syntax} key={lang.syntax}>
              {lang.label}
            </option>
          ))}
        </select>
        <Icon>description</Icon>
      </div>
      <pre className={`language-${selectedLang}`}>
        <code {...props}>{children}</code>
      </pre>
    </div>
  );
};

export default Code;

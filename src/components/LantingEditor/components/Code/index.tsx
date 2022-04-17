import React, {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import './style.scss';
import Prismjs from 'prismjs';
import Icon from 'components/Icon';

interface CodeProps {
  children?: ReactNode;
}

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
  const ref = useRef<HTMLPreElement>(null);

  const highlight = () => {
    if (ref.current) {
      Prismjs.highlightElement(ref.current);
    }
  };

  useEffect(() => {
    highlight();
  }, [selectedLang]);

  const copy = () => {
    if (ref.current) {
      const text = ref.current.innerText;
      navigator.clipboard.writeText(text);
    }
  };

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
        <Icon onClick={copy}>content_copy</Icon>
      </div>
      <pre className={`language-${selectedLang}`} ref={ref}>
        <code {...props}>{children}</code>
      </pre>
    </div>
  );
};

export default Code;

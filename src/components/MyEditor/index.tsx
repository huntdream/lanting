import React, { useState, useMemo, KeyboardEvent, useCallback } from 'react';
import { createEditor, Node, Transforms, Text } from 'slate';
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';
import './style.scss';
import CodeElement from './Elements/CodeElement';
import Toolbar from './Toolbar';
import DefaultElement from './Elements/DefaultElement';

interface MyEditorProps {}

const MyEditor: React.FC<MyEditorProps> = () => {
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const editor = useMemo(() => withReact(createEditor()), []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.ctrlKey) {
      console.log(event.key);

      switch (event.key) {
        case 'b':
          event.preventDefault();

          Transforms.setNodes(
            editor,
            { bold: true },
            { match: (n) => Text.isText(n), split: true }
          );
          break;
      }
    }
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar editor={editor} />
      <Editable
        className='my-editor'
        placeholder='Tell a story...'
        renderElement={renderElement}
        onKeyDown={handleKeyDown}
      />
    </Slate>
  );
};

export default MyEditor;

import React, { FC, useEffect, useRef, useState } from 'react';
import Icon from 'components/LantingEditor/Icon';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
} from 'lexical';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { $createCodeNode } from '@lexical/code';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { createPortal } from 'react-dom';
import { ReactComponent as Arrow } from 'assets/icons/chevron-down.svg';
import DropDownItem from './Item';
import './style.scss';

interface Props {
  blockType: string;
  editor: LexicalEditor;
}

const blockTypeToBlockName: { [key: string]: string } = {
  paragraph: 'Normal',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  ol: 'Numbered List',
  ul: 'Bulleted List',
  quote: 'Quote',
  code: 'Code Block',
};

const BlockFormatDropDown: FC<Props> = ({ blockType, editor }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const button = buttonRef.current;

    if (button && dropDown) {
      const { left, top, height } = button.getBoundingClientRect();

      dropDown.style.top = `${top + height}px`;
      dropDown.style.left = `${Math.min(
        left,
        window.innerWidth - dropDown.offsetWidth - 20
      )}px`;
    }
  }, [showDropDown, dropDownRef, buttonRef]);

  useEffect(() => {
    const button = buttonRef.current;

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!button.contains(target)) {
          setShowDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown]);

  const handleClick = () => {
    setShowDropDown(true);
  };

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (headingSize: any) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () =>
            $createHeadingNode(headingSize)
          );
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    console.log(blockType);
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            $wrapLeafNodesInElements(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.removeText();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  const handleBlockTypeClick = (type: string) => {
    switch (type) {
      case 'paragraph':
        formatParagraph();
        break;
      case 'h1':
        formatHeading('h1');
        break;
      case 'h2':
        formatHeading('h2');
        break;
      case 'h3':
        formatHeading('h3');
        break;
      case 'ol':
        formatNumberedList();
        break;
      case 'quote':
        formatQuote();
        break;
      case 'ul':
        formatBulletList();
        break;
      case 'code':
        formatCode();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        ref={buttonRef}
        onClick={handleClick}
        className='lanting-editor-dropdown-item'
      >
        <Icon type={blockType} /> {blockTypeToBlockName[blockType]}
        <Arrow style={{ margin: ' 3px 0 0 6px' }} />
      </div>

      {showDropDown &&
        createPortal(
          <div className='lanting-editor-dropdown' ref={dropDownRef}>
            {Object.entries(blockTypeToBlockName).map(([key, value]) => (
              <DropDownItem
                icon={key}
                key={key}
                onClick={() => handleBlockTypeClick(key)}
              >
                {value}
              </DropDownItem>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default BlockFormatDropDown;

import React, { FC, useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  ElementFormatType,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isCodeNode } from '@lexical/code';
import { $isParentElementRTL } from '@lexical/selection';

import { IS_APPLE } from 'utils/platform';
import Button from 'components/Button';
import Divider from 'components/Divider';

import Select from 'components/Select';

import './style.scss';
import useModal from 'hooks/useModal';
import InsertImage from '../component/InsertImage';
import BlockFormatDropDown from './BlockFormatDropDown';
import { CODE_LANGUAGE_MAP, CODE_LANGUAGE_OPTIONS } from './constants';
import Align from './Align';
import AudioPlugin from '../component/InsertAudio';

interface Props {}

const Toolbar: FC<Props> = () => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<string>('');
  const [codeLanguage, setCodeLanguage] = useState<string>('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [formatType, setFormatType] = useState<ElementFormatType>('');
  const [isCode, setIsCode] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [modal, showModal] = useModal();

  useEffect(() => {}, []);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));
      setIsRTL($isParentElementRTL(selection));

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        setFormatType(element.getFormatType());

        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);

          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();

          setBlockType(type);

          if ($isCodeNode(element)) {
            const language = element.getLanguage();
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : ''
            );
            return;
          }
        }
      }
    }
  }, [activeEditor]);

  const handleUndo = () => {
    activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const handleRedo = () => {
    activeEditor.dispatchCommand(REDO_COMMAND, undefined);
  };

  const onCodeLanguageSelect = useCallback(
    (newLang: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(newLang);
          }
        }
      });
    },
    [activeEditor, selectedElementKey]
  );

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload: boolean) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload: boolean) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [activeEditor, updateToolbar]);

  return (
    <div className='lanting-editor-toolbar'>
      <Button
        variant='text'
        title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
        onClick={handleUndo}
        icon='undo'
        disabled={!canUndo}
        aria-label='Undo'
      />
      <Button
        variant='text'
        title={IS_APPLE ? 'Redo (⌘Y)' : 'Undo (Ctrl+Y)'}
        onClick={handleRedo}
        icon='redo'
        disabled={!canRedo}
        aria-label='Redo'
      />
      <BlockFormatDropDown blockType={blockType} editor={activeEditor} />
      {blockType === 'code' ? (
        <>
          <Select
            value={codeLanguage}
            onChange={onCodeLanguageSelect}
            options={CODE_LANGUAGE_OPTIONS.map(([value, label]) => ({
              label,
              value,
            }))}
          />
          <Divider />
        </>
      ) : (
        <>
          <Divider />
          <Button
            active={isBold}
            icon='format_bold'
            variant='text'
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
            aria-label={`Format text as bold. Shortcut: ${
              IS_APPLE ? '⌘B' : 'Ctrl+B'
            }`}
          />
          <Button
            active={isItalic}
            icon='format_italic'
            variant='text'
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            }}
            title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
            aria-label={`Format text as italics. Shortcut: ${
              IS_APPLE ? '⌘I' : 'Ctrl+I'
            }`}
          />
          <Button
            active={isUnderline}
            icon='format_underline'
            variant='text'
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            }}
            title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
            aria-label={`Format text to underlined. Shortcut: ${
              IS_APPLE ? '⌘U' : 'Ctrl+U'
            }`}
          />
          <Button
            active={isStrikethrough}
            icon='format_strikethrough'
            variant='text'
            onClick={() => {
              activeEditor.dispatchCommand(
                FORMAT_TEXT_COMMAND,
                'strikethrough'
              );
            }}
            title='Strikethrough'
            aria-label='Format text with a strikethrough'
          />
          <Button
            icon='code'
            active={isCode}
            variant='text'
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
            }}
            title='Insert code block'
            aria-label='Insert code block'
          />
          <Button
            icon='image'
            variant='text'
            onClick={() => {
              showModal('Insert Image', (onClose) => (
                <InsertImage activeEditor={activeEditor} onClose={onClose} />
              ));
            }}
            title='Insert code block'
            aria-label='Insert code block'
          />
          <Button
            icon='music_note'
            variant='text'
            onClick={() => {
              showModal('Insert Audio', (onClose) => (
                <AudioPlugin activeEditor={activeEditor} onClose={onClose} />
              ));
            }}
            title='Insert code block'
            aria-label='Insert code block'
          />
          <Divider />
          <Align editor={activeEditor} isRTL={isRTL} formatType={formatType} />
        </>
      )}
      {modal}
    </div>
  );
};

export default Toolbar;

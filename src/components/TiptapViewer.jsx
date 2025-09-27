'use client'; // Обязательно для App Router

import React, {useEffect} from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Этот компонент используется только для отображения
export default function TiptapViewer({ content }) {
    useEffect(() => {
    }, [content]);
    const editor = useEditor({
        immediatelyRender: false,
        editable: false,

        content: content || '',

        extensions: [
            StarterKit,
        ],
    });

    useEffect(() => {
        if (!editor || content === undefined || content === null) {
            return;
        }

        const currentHtml = editor.getHTML();

        if (content !== currentHtml) {
            editor.commands.setContent(content, {
                emitUpdate: false
            });
            editor.commands.focus('end');
        }
    }, [content, editor]);

    return <EditorContent editor={editor} />;
}
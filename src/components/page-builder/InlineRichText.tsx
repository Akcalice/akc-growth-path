import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

type InlineRichTextProps = {
  html: string;
  editable: boolean;
  className?: string;
  onChange: (nextHtml: string) => void;
};

const InlineRichText = ({ html, editable, className, onChange }: InlineRichTextProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: html,
    editable,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    if (editor.getHTML() !== html) {
      editor.commands.setContent(html, { emitUpdate: false });
    }
    editor.setEditable(editable);
  }, [editor, html, editable]);

  if (!editor) {
    return null;
  }

  return (
    <div className={className}>
      {editable && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1 shadow-lg">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="px-2 py-1 text-xs rounded hover:bg-accent"
            >
              Gras
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="px-2 py-1 text-xs rounded hover:bg-accent"
            >
              Italique
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="px-2 py-1 text-xs rounded hover:bg-accent"
            >
              Liste
            </button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default InlineRichText;

import { useDoc } from "@/context/DocContext";
import { FC, useEffect, useRef } from "react";

interface EditorProps {
  height?: string;
}

const Editor: FC<EditorProps> = ({ height = "100%" }) => {
  const { markdown, updateMarkdown } = useDoc();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent): void => {
      if (e.key === "Tab" && document.activeElement === textareaRef.current) {
        e.preventDefault();

        if (!textareaRef.current) return;

        const { selectionStart: start, selectionEnd: end } =
          textareaRef.current;

        // Insert two spaces at current cursor
        const newText =
          markdown.substring(0, start) + "  " + markdown.substring(end);
        updateMarkdown(newText);

        // Move cursor after the inserted spaces
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = start + 2;
            textareaRef.current.selectionEnd = start + 2;
          }
        }, 0);
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [markdown, updateMarkdown]);

  return (
    <div
      className="h-full w-full flex flex-col overflow-hidden"
      style={{ height }}
      data-testid="editor-container"
    >
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-sm font-medium text-gray-700">Editor</h2>
      </div>

      <textarea
        ref={textareaRef}
        className="flex-1 w-full h-full p-4 font-mono text-sm resize-none focus:outline-none overflow-auto"
        value={markdown}
        onChange={(e) => updateMarkdown(e.target.value)}
        placeholder="Write your documentation in Markdown..."
        data-testid="editor-textarea"
      />
    </div>
  );
};

export default Editor;

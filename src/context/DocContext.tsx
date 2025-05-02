import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useDebounce } from "../hooks/useDebounce";
import { extractTitle } from "../utils/markdown";

type SavedStatus = "saved" | "saving" | "unsaved";

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

interface HistoryEntry {
  timestamp: number;
  content: string;
}

interface DocContextShape {
  markdown: string;
  title: string;
  showPreview: boolean;
  comments: Comment[];
  savedStatus: SavedStatus;
  lastSaved: number;
  documentId: string;
  canUndo: boolean;
  canRedo: boolean;
  updateMarkdown: (content: string) => void;
  togglePreview: () => void;
  addComment: (text: string, author?: string) => void;
  deleteComment: (commentId: number) => void;
  publishDoc: () => Promise<PublishResult>;
  shareDoc: () => Promise<ShareResult>;
  undo: () => void;
  redo: () => void;
  createNewDocument: () => void;
}

interface PublishResult {
  success: true;
  documentId: string;
  title: string;
  url: string;
}
interface ShareResult {
  success: true;
  documentId: string;
  title: string;
  shareLink: string;
}

const DocContext = createContext<DocContextShape | null>(null);

const DEFAULT_MARKDOWN = `# Your Documentation

Start writing your documentation here...

## Features
- Easy Markdown editing
- Live preview
- Collaboration through comments
- Publishing options

## Getting Started
1. Write your content in the editor
2. Preview your changes in real-time
3. Share with collaborators for feedback
4. Publish when ready

## Examples

### Code Block Example
\`\`\`javascript
function helloWorld() {
  console.log('Hello, Documentation System!');
}
\`\`\`

### Table Example
| Feature | Description |
|---------|-------------|
| Editor | Markdown editor with syntax highlighting |
| Preview | Real-time preview of your content |
| Comments | Collaborative feedback system |
| Publishing | One-click publishing to share your work |
`;

export function DocProvider({ children }: { children: ReactNode }) {
  // Main document state
  const [markdown, setMarkdownRaw] = useLocalStorage<string>(
    "doc-content",
    DEFAULT_MARKDOWN
  );
  const [title, setTitle] = useState(() => extractTitle(markdown));
  const [showPreview, setShowPreview] = useLocalStorage<boolean>(
    "doc-show-preview",
    true
  );
  const [comments, setComments] = useLocalStorage<Comment[]>(
    "doc-comments",
    []
  );
  const [savedStatus, setSavedStatus] = useState<SavedStatus>("saved"); // 'saved', 'saving', 'unsaved'
  const [documentId, setDocumentId] = useLocalStorage<string>(
    "doc-id",
    `doc-${Date.now()}`
  );
  const [documentHistory, setDocumentHistory] = useLocalStorage<HistoryEntry[]>(
    "doc-history",
    []
  );
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  // Document metadata
  const [lastSaved, setLastSaved] = useState(Date.now());

  // Debounce markdown changes to avoid excessive localStorage writes
  const debouncedMarkdown = useDebounce(markdown, 1000);

  // Update title whenever markdown changes (debounced)
  useEffect(() => {
    setTitle(extractTitle(debouncedMarkdown));
  }, [debouncedMarkdown]);

  // Simulate autosave functionality
  useEffect(() => {
    setSavedStatus("saving");
    const timeout = setTimeout(() => {
      setSavedStatus("saved");
      setLastSaved(Date.now());

      // Add to history if content has changed
      if (
        documentHistory.length === 0 ||
        documentHistory[documentHistory.length - 1].content !==
          debouncedMarkdown
      ) {
        const newHistory = [...documentHistory];
        if (newHistory.length >= 50) {
          newHistory.shift(); // Remove oldest entry if we have too many
        }
        newHistory.push({
          timestamp: Date.now(),
          content: debouncedMarkdown,
        });
        setDocumentHistory(newHistory);
        setCurrentHistoryIndex(newHistory.length - 1);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [debouncedMarkdown, documentHistory, setDocumentHistory]);

  // Update markdown content
  const updateMarkdown = useCallback(
    (content: string) => {
      setMarkdownRaw(content);
      setSavedStatus("unsaved");
    },
    [setMarkdownRaw]
  );

  // Toggle preview
  const togglePreview: () => void = useCallback(
    () => setShowPreview((prev: boolean) => !prev),
    [setShowPreview]
  );

  // Add a comment
  const addComment = useCallback(
    (text: string, author = "User") => {
      const newComment: Comment = {
        id: Date.now(),
        text,
        author,
        timestamp: new Date().toISOString(),
      };
      setComments((prev: Comment[]) => [...prev, newComment]);
    },
    [setComments]
  );

  // Delete a comment
  const deleteComment = useCallback(
    (commentId: number): void =>
      setComments((prev: Comment[]) =>
        prev.filter((comment: Comment) => comment.id !== commentId)
      ),
    [setComments]
  );

  // Publishing functionality
  const publishDoc = useCallback(async (): Promise<PublishResult> => {
    setSavedStatus("saving");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSavedStatus("saved");
    return {
      success: true,
      documentId,
      title,
      url: `https://docs.example.com/published/${documentId}`,
    };
  }, [documentId, title]);

  // Sharing functionality
  const shareDoc = useCallback(async (): Promise<ShareResult> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      documentId,
      title,
      shareLink: `https://docs.example.com/shared/${documentId}`,
    };
  }, [documentId, title]);

  // Undo/Redo functionality
  const canUndo = currentHistoryIndex > 0;
  const canRedo = currentHistoryIndex < documentHistory.length - 1;

  const undo = useCallback(() => {
    if (!canUndo) return;

    const newIndex = currentHistoryIndex - 1;
    setCurrentHistoryIndex(newIndex);
    setMarkdownRaw(documentHistory[newIndex].content);
  }, [canUndo, currentHistoryIndex, documentHistory, setMarkdownRaw]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    const newIndex = currentHistoryIndex + 1;
    setCurrentHistoryIndex(newIndex);
    setMarkdownRaw(documentHistory[newIndex].content);
  }, [canRedo, currentHistoryIndex, documentHistory, setMarkdownRaw]);

  // Create a new document
  const createNewDocument = useCallback(() => {
    const newDocId = `doc-${Date.now()}`;
    setDocumentId(newDocId);
    setMarkdownRaw(DEFAULT_MARKDOWN);
    setComments([]);
    setDocumentHistory([]);
    setCurrentHistoryIndex(-1);
  }, [setDocumentId, setMarkdownRaw, setComments, setDocumentHistory]);

  return (
    <DocContext.Provider
      value={{
        markdown,
        title,
        showPreview,
        comments,
        savedStatus,
        lastSaved,
        documentId,
        canUndo,
        canRedo,
        updateMarkdown,
        togglePreview,
        addComment,
        deleteComment,
        publishDoc,
        shareDoc,
        undo,
        redo,
        createNewDocument,
      }}
    >
      {children}
    </DocContext.Provider>
  );
}

export const useDoc = (): DocContextShape => {
  const ctx = useContext(DocContext);
  if (!ctx) throw new Error("useDoc must be used within <DocProvider>");
  return ctx;
};

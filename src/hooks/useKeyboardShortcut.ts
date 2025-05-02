import { useEffect } from "react";

/**
 * Custom hook for handling keyboard shortcuts
 * @param {Object} keyMap - Map of key combinations to handler functions
 * @param {Object} options - Configuration options
 */
interface ShortcutOptions {
  enabled?: boolean;
}
type KeyMap = Record<string, (e: KeyboardEvent) => void>;

export function useKeyboardShortcut(
  keyMap: KeyMap,
  options: ShortcutOptions = {}
): void {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Get key combination string (e.g. "ctrl+s")
      const key = event.key.toLowerCase();
      const combo: string[] = [];
      if (event.ctrlKey) combo.push("ctrl");
      if (event.metaKey) combo.push("meta");
      if (event.altKey) combo.push("alt");
      if (event.shiftKey) combo.push("shift");
      combo.push(key);
      const keyCombo = combo.join("+");

      // Check if we have a handler for this key combination
      const handler = keyMap[keyCombo];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyMap, enabled]);
}

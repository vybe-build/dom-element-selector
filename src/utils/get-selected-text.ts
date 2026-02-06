export function getSelectedText(): string | undefined {
  const selection = window.getSelection();
  if (selection && selection.toString().trim()) {
    return selection.toString().trim();
  }
  return undefined;
}

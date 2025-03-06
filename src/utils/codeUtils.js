// Utility functions for code-related operations

// Detect language based on code content
export const detectLanguage = (code) => {
  if (!code) return 'javascript';
  
  // Simple detection based on common patterns
  if (
    code.includes('function') ||
    code.includes('const') ||
    code.includes('let') ||
    code.includes('var')
  ) {
    return 'javascript';
  } else if (code.includes('import') && code.includes('from')) {
    return 'jsx';
  } else if (code.includes('class') && code.includes('public')) {
    return 'java';
  } else if (code.includes('def ') && code.includes(':')) {
    return 'python';
  }
  // Default fallback
  return 'javascript';
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}; 
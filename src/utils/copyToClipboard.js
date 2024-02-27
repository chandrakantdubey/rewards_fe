export const copyToClipboard = async (text) => {
  try {
    await window.navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Unable to copy text to clipboard:", error);
  }
};

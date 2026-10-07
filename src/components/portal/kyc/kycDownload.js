/**
 * Turns a downloaded KYC document Blob into a transient object URL, clicks
 * a hidden <a> to trigger the browser's save/open, then revokes the URL
 * immediately after. Nothing is persisted (no localStorage, no component
 * state holding the URL) - every click re-fetches through the authenticated
 * API client.
 */
export function triggerBlobDownload({ blob, fileName }) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName || 'document';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/** Read real logical-screen dimensions; reject malformed headers before publishing. */
export function gifDimensions(bytes: Uint8Array) {
  const header = new TextDecoder().decode(bytes.slice(0, 6));
  if (bytes.length < 10 || !['GIF87a', 'GIF89a'].includes(header)) throw new Error('Invalid GIF header');
  const width = bytes[6] | bytes[7] << 8;
  const height = bytes[8] | bytes[9] << 8;
  if (!width || !height) throw new Error('Invalid GIF dimensions');
  return { width, height };
}

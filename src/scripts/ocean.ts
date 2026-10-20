export function initOceanMap() {
  const map = document.querySelector<HTMLElement>('#ocean-map');
  const image = document.querySelector<HTMLImageElement>('#ocean-image');
  const dialog = document.querySelector<HTMLDialogElement>('#map-dialog');
  const container = document.querySelector<HTMLElement>('#expanded-map-container');
  if (!map || !image || !dialog || !container) return;
  const home = map.parentElement!;
  const sibling = map.nextSibling;
  const button = document.querySelector<HTMLButtonElement>('#expand-map');
  const showError = () => {
    image.hidden = true;
    const note = document.querySelector<HTMLElement>('#map-error');
    if (note) note.hidden = false;
    if (button) button.disabled = true;
  };
  image.addEventListener('error', showError);
  if (image.complete && !image.naturalWidth) showError();
  button?.addEventListener('click', () => {
    container.appendChild(map);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
  document.querySelector('#close-map')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    home.insertBefore(map, sibling);
    document.body.style.overflow = '';
    button?.focus();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
}

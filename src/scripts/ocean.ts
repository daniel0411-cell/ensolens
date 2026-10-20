type Geometry = { type: string; coordinates: number[][][] | number[][][][] };
type Land = { features: { geometry: Geometry }[] };

export async function initOceanMap() {
  const canvas = document.querySelector<HTMLCanvasElement>('#pacific-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  let land: Land | null = null;
  let loaded = false;
  const map = document.querySelector<HTMLElement>('#ocean-map')!;
  const home = map.parentElement!;
  const sibling = map.nextElementSibling;

  function render() {
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = '#203940';
    context.fillRect(0, 0, width, height);
    // A deliberately synthetic field; it is never presented as observed SST.
    const image = context.createImageData(width, height);
    const stops = [[31, 59, 76], [58, 101, 125], [133, 156, 153], [201, 187, 137], [215, 139, 83], [198, 91, 65]];
    for (let y = 0; y < height; y++) {
      const latitude = 30 - y / height * 60;
      for (let x = 0; x < width; x++) {
        const longitude = 120 + x / width * 180;
        const equator = Math.exp(-Math.pow(latitude / 6, 2));
        const east = Math.exp(-Math.pow((longitude - 224) / 64, 2));
        const variation = Math.sin(longitude * 0.14 + latitude * 0.36) * 0.16 + Math.sin(longitude * 0.37 - latitude * 0.19) * 0.09 + Math.cos(latitude * 0.6 + longitude * 0.05) * 0.07;
        const value = Math.max(0, Math.min(1, 0.22 + equator * east * 0.67 + variation));
        const index = value * (stops.length - 1);
        const low = Math.floor(index), high = Math.min(stops.length - 1, low + 1), amount = index - low;
        const offset = (y * width + x) * 4;
        for (let c = 0; c < 3; c++) image.data[offset + c] = stops[low][c] * (1 - amount) + stops[high][c] * amount;
        image.data[offset + 3] = 255;
      }
    }
    context.putImageData(image, 0, 0);
    context.strokeStyle = '#e2eee214';
    context.lineWidth = ratio * 0.6;
    for (let longitude = 120; longitude <= 300; longitude += 30) { const x = (longitude - 120) / 180 * width; context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
    for (let latitude = -20; latitude <= 20; latitude += 10) { const y = (30 - latitude) / 60 * height; context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }

    if (land) {
      context.fillStyle = '#183039';
      context.strokeStyle = '#9eb0a047';
      context.lineWidth = ratio * 0.6;
      for (const feature of land.features) {
        const geometry = feature.geometry;
        const polygons = geometry.type === 'Polygon' ? [geometry.coordinates as number[][][]] : geometry.coordinates as number[][][][];
        for (const polygon of polygons) {
          // Unwrap dateline-crossing islands before drawing Pacific-centered copies.
          const rings = polygon.map(ring => {
            let previous = ring[0][0];
            return ring.map(([longitude, latitude]) => {
              while (longitude - previous > 180) longitude -= 360;
              while (longitude - previous < -180) longitude += 360;
              previous = longitude;
              return [longitude, latitude];
            });
          });
          for (const shift of [-360, 0, 360, 720]) {
            context.beginPath();
            for (const ring of rings) {
              ring.forEach(([longitude, latitude], i) => {
                const x = (longitude + shift - 120) / 180 * width;
                const y = (30 - latitude) / 60 * height;
                if (i === 0) context.moveTo(x, y); else context.lineTo(x, y);
              });
              context.closePath();
            }
            context.fill('evenodd');
            context.stroke();
          }
        }
      }
    }
    const shade = context.createLinearGradient(0, 0, 0, height);
    shade.addColorStop(0, '#0c232d99'); shade.addColorStop(0.35, '#10272d10'); shade.addColorStop(0.7, '#10272d10'); shade.addColorStop(1, '#10272db0');
    context.fillStyle = shade;
    context.fillRect(0, 0, width, height);
    canvas.dataset.rendered = String(loaded);
  }

  const observer = new ResizeObserver(render);
  observer.observe(canvas);
  render();
  try {
    const response = await fetch('/land.geojson');
    if (!response.ok) throw new Error('Land boundaries unavailable');
    land = await response.json();
    loaded = true;
    render();
  } catch {
    const note = document.querySelector('.ocean-section .figure-note');
    if (note) note.textContent = 'Land boundaries unavailable. Colors remain an illustrative field, not observations.';
  }
  const dialog = document.querySelector<HTMLDialogElement>('#map-dialog');
  const container = document.querySelector('#expanded-map-container');
  document.querySelector('#expand-map')?.addEventListener('click', () => {
    if (!dialog || !container) return;
    container.append(map);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    render();
  });
  function restore() {
    if (sibling) home.insertBefore(map, sibling); else home.append(map);
    document.body.style.overflow = '';
    document.querySelector<HTMLButtonElement>('#expand-map')?.focus();
    render();
  }
  document.querySelector('#close-map')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('close', restore);
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); }
  });
}

import { Chart, registerables } from 'chart.js';
import { weeklyValues, monthlyValues, probabilities, seasons } from '../data/demo';

Chart.register(...registerables);
Chart.defaults.font.family = 'Arial, Helvetica, sans-serif';
Chart.defaults.font.size = 9;
Chart.defaults.color = '#8b9387';
Chart.defaults.animation = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 500 };

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const blob = new Blob([rows.map(row => row.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function initCharts() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts, { once: true });
    return;
  }
  const lineCanvas = document.querySelector<HTMLCanvasElement>('#trend-chart');
  if (lineCanvas) {
    const dates = weeklyValues.map((_, i) => new Date(Date.UTC(2025, 9, 27 + i * 7)).toISOString().slice(0, 10));
    const seasonal = weeklyValues.map((_, i) => monthlyValues[Math.min(11, Math.floor(i * 12 / weeklyValues.length))]);
    const makeData = (count: number) => ({
      labels: dates.slice(-count),
      datasets: [
        { label: 'Weekly Niño 3.4 (example)', data: weeklyValues.slice(-count), borderColor: '#d18160', backgroundColor: '#d1816012', fill: true, borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: 0.28 },
        { label: 'Seasonal RONI (example)', data: seasonal.slice(-count), borderColor: '#648265', borderDash: [4, 4], borderWidth: 1.3, pointRadius: 0, pointHoverRadius: 3, tension: 0.35 },
      ],
    });
    const line = new Chart(lineCanvas, {
      type: 'line',
      data: makeData(weeklyValues.length),
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        layout: { padding: { right: 6 } },
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#2b3e31', padding: 11, titleFont: { size: 10 }, bodyFont: { size: 10 }, callbacks: { label: context => `${context.dataset.label}: ${Number(context.parsed.y).toFixed(2)}°C` } } },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { maxTicksLimit: 7, maxRotation: 0, autoSkip: true, font: { size: 8 }, callback: function(value) { const label = this.getLabelForValue(Number(value)); return new Date(`${label}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }); } } },
          y: { min: -1, max: 2, border: { display: false }, grid: { color: context => context.tick.value === 0 ? '#c9d1c5' : '#e6e9e1', drawTicks: false }, ticks: { stepSize: 0.5, padding: 9, font: { size: 8 }, callback: value => `${Number(value) > 0 ? '+' : ''}${Number(value).toFixed(1)}°` } },
        },
      },
    });
    document.querySelectorAll<HTMLButtonElement>('[data-range]').forEach(button => button.addEventListener('click', () => {
      const months = Number(button.dataset.range);
      line.data = makeData(months === 6 ? 26 : weeklyValues.length);
      line.update();
      document.querySelectorAll('[data-range]').forEach(other => { other.classList.toggle('selected', other === button); other.setAttribute('aria-pressed', String(other === button)); });
      const live = document.querySelector('#trend-live');
      if (live) live.textContent = `Showing ${months} months of illustrative data.`;
    }));
    document.querySelector('.download-data')?.addEventListener('click', () => downloadCsv('ensolens-illustrative-trend.csv', [['data_status', 'date', 'weekly_nino34_c', 'example_seasonal_roni_c'], ...dates.map((date, i) => ['ILLUSTRATIVE_NOT_OFFICIAL', date, weeklyValues[i], seasonal[i]])]));
  }

  const probabilityCanvas = document.querySelector<HTMLCanvasElement>('#probability-chart');
  if (!probabilityCanvas) return;
  const colors = ['#759bb1', '#c6cec0', '#d78b6b'];
  const names = ['La Niña', 'Neutral', 'El Niño'];
  const keys = ['nina', 'neutral', 'nino'] as const;
  const makeProbabilities = (compare: boolean) => {
    const current = keys.map((key, i) => ({ label: `${names[i]} · October example`, data: probabilities.current[key], backgroundColor: colors[i], stack: 'current', borderWidth: 0, borderRadius: 2, borderSkipped: false as const, barPercentage: 0.6, categoryPercentage: 0.75 }));
    if (!compare) return current;
    return [...current, ...keys.map((key, i) => ({ label: `${names[i]} · September example`, data: probabilities.previous[key], backgroundColor: `${colors[i]}70`, stack: 'previous', borderWidth: 0, borderRadius: 2, borderSkipped: false as const, barPercentage: 0.6, categoryPercentage: 0.75 }))];
  };
  const chart = new Chart(probabilityCanvas, {
    type: 'bar',
    data: { labels: seasons, datasets: makeProbabilities(false) },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      layout: { padding: { top: 5, right: 8 } },
      plugins: { legend: { display: false }, tooltip: { backgroundColor: '#2b3e31', padding: 11, titleFont: { size: 10 }, bodyFont: { size: 10 }, callbacks: { label: context => `${context.dataset.label}: ${context.parsed.y}%` } } },
      scales: {
        x: { stacked: true, border: { display: false }, grid: { display: false }, ticks: { font: { size: 9 }, padding: 7 } },
        y: { stacked: true, min: 0, max: 100, border: { display: false }, grid: { color: '#e4e8df', drawTicks: false }, ticks: { stepSize: 25, font: { size: 8 }, padding: 10, callback: value => `${value}%` } },
      },
    },
  });
  document.querySelector<HTMLInputElement>('#compare-forecast')?.addEventListener('change', event => {
    const checked = (event.target as HTMLInputElement).checked;
    chart.data.datasets = makeProbabilities(checked);
    chart.update();
    const note = document.querySelector<HTMLElement>('#forecast-comparison');
    if (note) note.hidden = !checked;
  });
  document.querySelector('.download-probabilities')?.addEventListener('click', () => downloadCsv('ensolens-illustrative-probabilities.csv', [['data_status', 'example_issue', 'season', 'la_nina_percent', 'neutral_percent', 'el_nino_percent'], ...(['current', 'previous'] as const).flatMap(issue => seasons.map((season, i) => ['ILLUSTRATIVE_NOT_OFFICIAL', issue === 'current' ? '2026-10' : '2026-09', season, probabilities[issue].nina[i], probabilities[issue].neutral[i], probabilities[issue].nino[i]]))]));
}

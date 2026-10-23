import { Chart, registerables } from 'chart.js';
import type { Forecast, WeeklyPoint, SeasonalPoint } from '../lib/enso';

Chart.register(...registerables);
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
Chart.defaults.font.size = 11;
Chart.defaults.color = '#94a3b8';
Chart.defaults.animation = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 300 };
const stamp = (date: string) => Date.parse(date + 'T00:00:00Z');
const seasonLabel = (row: { season: string; year: number }) => row.season === 'DJF' ? row.season + ' ' + (row.year - 1) + '-' + String(row.year).slice(-2) : row.season === 'NDJ' ? row.season + ' ' + row.year + '-' + String(row.year + 1).slice(-2) : row.season + ' ' + row.year;

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const escape = (value: string | number) => '"' + String(value).replaceAll('"', '""') + '"';
  const blob = new Blob([rows.map(row => row.map(escape).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
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
  if (lineCanvas && !Chart.getChart(lineCanvas)) {
    const payload: { weekly: WeeklyPoint[]; roni: SeasonalPoint[]; retrievedAt: { weekly: string; roni: string } } = JSON.parse(document.querySelector('#trend-data')!.textContent!);
    const latest = Math.max(stamp(payload.weekly.at(-1)!.date), stamp(payload.roni.at(-1)!.date));
    const makeData = (months: number) => {
      const cutoff = new Date(latest);
      cutoff.setUTCMonth(cutoff.getUTCMonth() - months);
      return { datasets: [
        { label: 'Weekly Niño 3.4', data: payload.weekly.filter(p => stamp(p.date) >= +cutoff).map(p => ({ x: stamp(p.date), y: p.anomaly })), borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.08)', fill: true, borderWidth: 2.2, pointRadius: 0, pointHoverRadius: 4, tension: 0.15 },
        { label: 'Seasonal RONI', data: payload.roni.filter(p => stamp(p.date) >= +cutoff).map(p => ({ x: stamp(p.date), y: p.value })), borderColor: '#10b981', borderDash: [4, 4], borderWidth: 1.8, pointRadius: 2, tension: 0 },
      ] };
    };
    const line = new Chart(lineCanvas, {
      type: 'line', data: makeData(12),
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'nearest', axis: 'xy' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(11, 19, 16, 0.95)',
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            borderWidth: 1,
            callbacks: {
              title: items => new Date(items[0].parsed.x ?? 0).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' }),
              label: ctx => ctx.dataset.label + ': ' + ctx.parsed.y?.toFixed(1) + '°C',
            }
          }
        },
        scales: {
          x: { type: 'linear', grid: { display: false }, ticks: { maxTicksLimit: 6, maxRotation: 0, color: '#94a3b8', callback: value => new Date(Number(value)).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }) } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.08)' }, ticks: { color: '#94a3b8', callback: value => Number(value).toFixed(1) + '°' } },
        },
      },
    });
    document.querySelectorAll<HTMLButtonElement>('[data-range]').forEach(button => button.addEventListener('click', () => {
      const months = Number(button.dataset.range);
      line.data = makeData(months);
      line.update();
      document.querySelectorAll('[data-range]').forEach(other => { other.classList.toggle('selected', other === button); other.setAttribute('aria-pressed', String(other === button)); });
      document.querySelector('#trend-live')!.textContent = 'Showing ' + months + ' months of official observations.';
    }));
    document.querySelector('.download-data')?.addEventListener('click', () => downloadCsv('ensolens-official-trend.csv', [
      ['series', 'observation_period_end', 'season', 'anomaly_c', 'retrieved_at'],
      ...payload.weekly.map(p => ['CPC weekly Nino3.4', p.date, '', p.anomaly, payload.retrievedAt.weekly]),
      ...payload.roni.map(p => ['CPC seasonal RONI', p.date, seasonLabel(p), p.value, payload.retrievedAt.roni]),
    ]));
  }
  const canvas = document.querySelector<HTMLCanvasElement>('#probability-chart');
  if (canvas && !Chart.getChart(canvas)) {
  const { current, previous }: { current: Forecast; previous: Forecast | null } = JSON.parse(document.querySelector('#forecast-data')!.textContent!);
  const colors = ['#06b6d4', '#64748b', '#f97316'];
  const names = ['La Niña', 'Neutral', 'El Niño'];
  const keys = ['nina', 'neutral', 'nino'] as const;
  const datasets = (compare: boolean) => {
    const make = (forecast: Forecast, prior: boolean) => keys.map((key, i) => ({
      label: names[i] + ' · ' + forecast.issue,
      data: current.rows.map(row => forecast.rows.find(p => p.key === row.key)?.[key] ?? null),
      backgroundColor: prior ? colors[i] + '60' : colors[i],
      stack: prior ? 'previous' : 'current', borderWidth: 0, barPercentage: 0.7, categoryPercentage: 0.8,
    }));
    return [...make(current, false), ...(compare && previous ? make(previous, true) : [])];
  };
  const chart = new Chart(canvas, {
    type: 'bar', data: { labels: current.rows.map(seasonLabel), datasets: datasets(false) },
    options: {
      responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(11, 19, 16, 0.95)',
          titleColor: '#fff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          borderWidth: 1,
          callbacks: { label: ctx => ctx.dataset.label + ': ' + ctx.parsed.y + '%' }
        }
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { maxRotation: 45, font: { size: 10 }, color: '#94a3b8' } },
        y: { stacked: true, min: 0, max: 100, grid: { color: 'rgba(255, 255, 255, 0.08)' }, ticks: { stepSize: 25, color: '#94a3b8', callback: value => value + '%' } }
      },
    },
  });
  document.querySelector<HTMLInputElement>('#compare-forecast')?.addEventListener('change', event => {
    const checked = (event.target as HTMLInputElement).checked;
    chart.data.datasets = datasets(checked);
    chart.update();
    document.querySelector<HTMLElement>('#forecast-comparison')!.hidden = !checked;
  });
  document.querySelector('.download-probabilities')?.addEventListener('click', () => downloadCsv('ensolens-official-probabilities.csv', [
    ['issue', 'season', 'target_key', 'la_nina_percent', 'neutral_percent', 'el_nino_percent', 'source'],
    ...[current, ...(previous ? [previous] : [])].flatMap(issue => issue.rows.map(row => [issue.issue, seasonLabel(row), row.key, row.nina, row.neutral, row.nino, issue.source])),
  ]));
  }

  const analogCanvas = document.querySelector<HTMLCanvasElement>('#analog-chart');
  if (analogCanvas && !Chart.getChart(analogCanvas)) {
    interface AnalogWeek { week: number; anomaly: number; date?: string; sst?: number }
    interface AnalogBenchmark { id: string; name: string; color: string; weeks: AnalogWeek[] }
    interface AnalogPayload { year: number; current: AnalogWeek[]; benchmarks: AnalogBenchmark[] }

    const raw = document.querySelector('#analog-data')?.textContent;
    if (!raw) return;
    const payload: AnalogPayload = JSON.parse(raw);

    const monthByWeek = (week: number) => {
      const map: Record<number, string> = { 1: 'Jan', 5: 'Feb', 9: 'Mar', 14: 'Apr', 18: 'May', 22: 'Jun', 27: 'Jul', 31: 'Aug', 36: 'Sep', 40: 'Oct', 44: 'Nov', 49: 'Dec' };
      return map[week] ?? '';
    };

    const currentDataset = {
      label: payload.year + ' (Latest available)',
      data: payload.current.map(w => ({ x: w.week, y: w.anomaly })),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      borderWidth: 3,
      pointRadius: 2.5,
      pointHoverRadius: 5,
      tension: 0.2,
      order: 0,
    };

    const benchmarkDatasets = payload.benchmarks.map((b, i) => ({
      label: b.name,
      data: b.weeks.map(w => ({ x: w.week, y: w.anomaly })),
      borderColor: b.color,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderDash: b.id === '2020' ? [4, 4] : [],
      pointRadius: 0,
      pointHoverRadius: 4,
      tension: 0.2,
      order: i + 1,
    }));

    const analogChart = new Chart(analogCanvas, {
      type: 'line',
      data: { datasets: [currentDataset, ...benchmarkDatasets] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(11, 19, 16, 0.95)',
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            borderWidth: 1,
            callbacks: {
              title: items => 'Week ' + items[0].parsed.x + ' (Annual Progression)',
              label: ctx => ctx.dataset.label + ': ' + ((ctx.parsed.y ?? 0) > 0 ? '+' : '') + ctx.parsed.y?.toFixed(1) + '°C'
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            min: 1,
            max: 53,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              stepSize: 1,
              color: '#94a3b8',
              callback: value => monthByWeek(Number(value))
            }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            ticks: {
              color: '#94a3b8',
              callback: value => (Number(value) > 0 ? '+' : '') + Number(value).toFixed(1) + '°C'
            }
          }
        }
      }
    });

    document.querySelectorAll<HTMLButtonElement>('[data-analog-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.analogToggle;
        const index = payload.benchmarks.findIndex(b => b.id === id);
        if (index === -1) return;
        const datasetIndex = index + 1;
        const visible = analogChart.isDatasetVisible(datasetIndex);
        analogChart.setDatasetVisibility(datasetIndex, !visible);
        analogChart.update();
        btn.classList.toggle('active', !visible);
        btn.setAttribute('aria-pressed', String(!visible));
        document.querySelector('#analog-live')!.textContent = payload.benchmarks[index].name + (visible ? ' hidden.' : ' shown.');
      });
    });

    document.querySelector('.download-analog-data')?.addEventListener('click', () => {
      const rows: (string | number)[][] = [
        ['series', 'week_number', 'observation_date', 'sst_anomaly_c'],
        ...payload.current.map(w => [payload.year + ' (Latest available)', w.week, w.date || '', w.anomaly]),
        ...payload.benchmarks.flatMap(b => b.weeks.map(w => [b.name, w.week, w.date || '', w.anomaly]))
      ];
      downloadCsv('ensolens-historical-analogs.csv', rows);
    });
  }
}

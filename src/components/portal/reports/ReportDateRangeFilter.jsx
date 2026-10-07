const PERIODS = [
  { value: 'TODAY', label: 'Today' },
  { value: 'YESTERDAY', label: 'Yesterday' },
  { value: 'LAST_7_DAYS', label: 'Last 7 Days' },
  { value: 'LAST_30_DAYS', label: 'Last 30 Days' },
  { value: 'THIS_MONTH', label: 'This Month' },
  { value: 'LAST_MONTH', label: 'Last Month' },
  { value: 'THIS_YEAR', label: 'This Year' },
  { value: 'CUSTOM', label: 'Custom Range' },
];

/**
 * Single source of truth for the period/from/to filter every report call on
 * this page shares - centralized here per the Phase 11 brief rather than
 * re-implemented per chart/table. `value` is always { period, from, to };
 * `from`/`to` only matter (and only get sent) when period is CUSTOM.
 */
export default function ReportDateRangeFilter({ value, onChange }) {
  const { period, from, to } = value;

  function handlePeriodChange(nextPeriod) {
    onChange({ period: nextPeriod, from, to });
  }

  return (
    <div className="ld-toolbar" style={{ flexWrap: 'wrap', gap: 12 }}>
      <select
        className="ld-form-input"
        value={period}
        onChange={(e) => handlePeriodChange(e.target.value)}
        aria-label="Report period"
      >
        {PERIODS.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      {period === 'CUSTOM' && (
        <>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            From
            <input
              type="date"
              className="ld-form-input"
              value={from || ''}
              max={to || undefined}
              onChange={(e) => onChange({ period, from: e.target.value, to })}
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            To
            <input
              type="date"
              className="ld-form-input"
              value={to || ''}
              min={from || undefined}
              onChange={(e) => onChange({ period, from, to: e.target.value })}
            />
          </label>
        </>
      )}
    </div>
  );
}

export { PERIODS };

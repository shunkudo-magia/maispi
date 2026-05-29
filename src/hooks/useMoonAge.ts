import { useMemo } from 'react';

export function useMoonAge(date: Date = new Date()): number {
  return useMemo(() => calculateMoonAge(date), [date.toDateString()]);
}

function calculateMoonAge(date: Date): number {
  // J2000 epoch calculation
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();

  const jd =
    367 * Y -
    Math.trunc((7 * (Y + Math.trunc((M + 9) / 12))) / 4) +
    Math.trunc((275 * M) / 9) +
    D +
    1721013.5;

  const daysSinceNewMoon2000 = jd - 2451549.5;
  const moonCycle = 29.53058868;
  const age = ((daysSinceNewMoon2000 % moonCycle) + moonCycle) % moonCycle;

  return Math.round(age * 10) / 10;
}

export function map(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export function circleVectorAtDegrees(
  x: number,
  y: number,
  radius: number,
  degrees: number,
) {
  return {
    x: x + radius * Math.cos((degrees * Math.PI) / 180),
    y: y + radius * Math.sin((degrees * Math.PI) / 180),
  };
}

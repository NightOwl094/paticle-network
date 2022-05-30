// min, max 사이의 랜덤 실수
export const randomFloatBetween = (min, max) =>
  Math.random() * (max - min + 1) + min;

// 두 점 (x1, y1)과 (x2, y2) 사이의 거리
export const computeDistance = (x1, y1, x2, y2) => {
  const distX = x2 - x1;
  const distY = y2 - y1;
  return Math.sqrt(distX * distX + distY * distY);
};

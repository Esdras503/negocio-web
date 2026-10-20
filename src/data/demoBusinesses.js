import { barberiaDonRafael } from './demos/barberiaDonRafael';
import { cafeNube } from './demos/cafeNube';
import { comalDeCasa } from './demos/comalDeCasa';

export const demoBusinesses = [comalDeCasa, cafeNube, barberiaDonRafael];

export function getDemoById(id) {
  return demoBusinesses.find((business) => business.id === id) ?? null;
}

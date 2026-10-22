import { barberiaDonRafael } from './demos/barberiaDonRafael';
import { cafeNube } from './demos/cafeNube';
import { casalista } from './demos/casalista';
import { clinicaBrisa } from './demos/clinicaBrisa';
import { comalDeCasa } from './demos/comalDeCasa';
import { estudioAlba } from './demos/estudioAlba';
import { habitaInmobiliaria } from './demos/habitaInmobiliaria';
import { lumaTienda } from './demos/lumaTienda';
import { torqueNorte } from './demos/torqueNorte';

export const demoBusinesses = [
  comalDeCasa,
  cafeNube,
  barberiaDonRafael,
  torqueNorte,
  casalista,
  estudioAlba,
  habitaInmobiliaria,
  clinicaBrisa,
  lumaTienda,
];

export function getDemoById(id) {
  return demoBusinesses.find((business) => business.id === id) ?? null;
}

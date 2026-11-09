import {
  formatAddOnPrice,
  formatMaintenancePrice,
  formatPlanPrice,
} from '../data/pricing';

export function buildPlanWhatsAppMessage(plan) {
  if (!plan) return '';
  return `Hola, quiero consultar por el ${plan.fullName} (${formatPlanPrice(plan)}). ¿Me pueden dar más información?`;
}

export function buildMaintenanceWhatsAppMessage(plan) {
  if (!plan) return '';
  return `Hola, quiero consultar por el ${plan.fullName} (${formatMaintenancePrice(plan)}). ¿Me pueden dar más información?`;
}

export function buildAddOnWhatsAppMessage(addOn) {
  if (!addOn) return '';
  return `Hola, quiero cotizar el servicio adicional "${addOn.name}" (${formatAddOnPrice(addOn)}). ¿Me pueden dar más información?`;
}

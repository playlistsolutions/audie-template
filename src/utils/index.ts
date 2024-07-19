export const monthsData = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const states = [
  {label: 'AC', value: 'AC'},
  {label: 'AL', value: 'AL'},
  {label: 'AP', value: 'AP'},
  {label: 'AM', value: 'AM'},
  {label: 'BA', value: 'BA'},
  {label: 'CE', value: 'CE'},
  {label: 'DF', value: 'DF'},
  {label: 'ES', value: 'ES'},
  {label: 'GO', value: 'GO'},
  {label: 'MA', value: 'MA'},
  {label: 'MT', value: 'MT'},
  {label: 'MS', value: 'MS'},
  {label: 'MG', value: 'MG'},
  {label: 'PA', value: 'PA'},
  {label: 'PB', value: 'PB'},
  {label: 'PR', value: 'PR'},
  {label: 'PE', value: 'PE'},
  {label: 'PI', value: 'PI'},
  {label: 'RJ', value: 'RJ'},
  {label: 'RN', value: 'RN'},
  {label: 'RS', value: 'RS'},
  {label: 'RO', value: 'RO'},
  {label: 'RR', value: 'RR'},
  {label: 'SC', value: 'SC'},
  {label: 'SP', value: 'SP'},
  {label: 'SE', value: 'SE'},
  {label: 'TO', value: 'TO'}
];

export function formatBirthDate(date: Date): string {
  const splitDate = date.toISOString().split('-');
  const day = splitDate[2].split('T')[0];
  const month = splitDate[1];
  const year = splitDate[0];

  return `${day} de ${monthsData[parseInt(month) - 1]} de ${year}`;
}

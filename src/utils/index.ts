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

export function formatBirthDate(date: Date): string {
  const splitDate = date.toISOString().split('-');
  const day = splitDate[2].split('T')[0];
  const month = splitDate[1];
  const year = splitDate[0];

  return `${day} de ${monthsData[parseInt(month) - 1]} de ${year}`;
}

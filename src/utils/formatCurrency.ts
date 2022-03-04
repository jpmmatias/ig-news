export default function formatToCurrency(numberToFormat: number) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		minimumFractionDigits: 2,
		currencyDisplay: 'symbol',
		currency: 'BRL',
	}).format(numberToFormat);
}

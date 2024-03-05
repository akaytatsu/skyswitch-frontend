function dateDisplay(
  date: string | Date | undefined,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'pt-BR',
): string {
  try {
    if (date instanceof Date) date = date.toISOString();
    if (!date || typeof date !== 'string') return '';

    let _date;
    if (!date.includes('T')) {
      const arrDt = date.split('-');
      if (!arrDt || arrDt.length < 3) return '';
      _date = new Date(
        parseInt(arrDt[0]),
        parseInt(arrDt[1]) - 1,
        parseInt(arrDt[2]),
      );
    } else {
      _date = new Date(date);
    }

    const optionDefault: Intl.DateTimeFormatOptions = {};
    return new Intl.DateTimeFormat(locale, {
      ...optionDefault,
      ...options,
    }).format(_date);
  } catch (error) {
    return '';
  }
}

function dateOutput(date: string | Date | undefined): string {
  try {
    if (date && !(date instanceof Date) && typeof date !== 'string') {
      date = new Date(date);
    }

    if (date instanceof Date) date = date.toISOString();
    if (!date || typeof date !== 'string') return '';
    if (date.includes('T')) {
      date = date.split('T')[0];
    }
    const arrDt = date.split('-');
    if (arrDt && arrDt.length == 3) {
      return `${arrDt[0]}-${arrDt[1]}-${arrDt[2]}`;
    }
    const arrDtf = date.split('/');
    if (arrDtf && arrDtf.length == 3) {
      return `${arrDtf[2]}-${arrDtf[1]}-${arrDtf[0]}`;
    }
    return date;
  } catch (error) {
    return '';
  }
}

type AmountDisplayProps = {
  locale?: string;
  currency?: string;
  showSymbol?: boolean;
  minimumFractionDigits?: number;
  style?: 'currency' | 'decimal' | 'percent' | 'unit';
};

function amountDisplay(
  amount: number | string | undefined,
  options: AmountDisplayProps = {},
): string {
  try {
    const currency = options?.currency || 'BRL';
    const locale = options?.locale || 'pt-BR';
    if (typeof amount === 'string') amount = parseFloat(amount);
    if (typeof amount !== 'number') return '';
    const value = new Intl.NumberFormat(locale, {
      style: options.style || 'currency',
      currency: currency,
      currencyDisplay: options?.showSymbol ? 'symbol' : 'code',
      minimumFractionDigits: options.minimumFractionDigits || 2,
    }).format(amount);
    if (value && !options?.showSymbol)
      return value.replace(currency, '').trim();

    return value;
  } catch (error) {
    return '';
  }
}

function percentageDisplay(value?: number): string {
  if (value === undefined) return '';
  // Define the format options
  const formatOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    maximumFractionDigits: 2,
  };

  // If the value is an integer, don't show decimal places
  if (Math.floor(value) === value) {
    formatOptions.maximumFractionDigits = 0;
  }

  // Create the formatter
  const formatter = new Intl.NumberFormat('pt-BR', formatOptions);

  // Format the number
  return formatter.format(value / 100); // Dividing by 100 to convert to percentage
}

function camelToSnake(str?: string): string {
  if (!str) return '';
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function snakeToCamel(str?: string): string {
  if (!str) return '';
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );
}

function upperFisrtLetter(str?: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  amountDisplay,
  camelToSnake,
  dateDisplay,
  dateOutput,
  percentageDisplay,
  snakeToCamel,
  upperFisrtLetter,
};

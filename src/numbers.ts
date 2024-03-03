function sum(...args: number[]): number {
    return args.reduce((a, b) => a + b, 0);
}

const factor = 1000;
function fThousands(value: number, sep = ' '): string {
    if (value < 0) {
        return '-' + fThousands(-value, sep);
    }
    const blocks = [];
    do {
        blocks.unshift(value % factor);
        value = Math.floor(value / factor);
    } while (value > 0);
    const res = blocks
        .map(num => num.toString().padStart(3, '0'))
        .join(sep)
        .replace(/^0+/, '');
    return res || '0';
}

function toRomanThousands(value: number): string {
    const thousands = Math.floor(value / 1000);
    return 'M'.repeat(thousands);
}

function toRomanHundreds(value: number): string {
    const hundreds = Math.floor((value % 1000) / 100);
    if (hundreds === 9) {
        return 'CM';
    }
    if (hundreds >= 5) {
        return 'D' + 'C'.repeat(hundreds - 5);
    }
    if (hundreds === 4) {
        return 'CD';
    }
    return 'C'.repeat(hundreds);
}

function toRomanTens(value: number): string {
    const tens = Math.floor((value % 100) / 10);
    if (tens === 9) {
        return 'XC';
    }
    if (tens >= 5) {
        return 'L' + 'X'.repeat(tens - 5);
    }
    if (tens === 4) {
        return 'XL';
    }
    return 'X'.repeat(tens);
}

function toRomanOnes(value: number): string {
    const ones = Math.floor(value % 10);
    if (ones === 9) {
        return 'IX';
    }
    if (ones >= 5) {
        return 'V' + 'I'.repeat(ones - 5);
    }
    if (ones === 4) {
        return 'IV';
    }
    return 'I'.repeat(ones);
}

function toRomanAbsolute(value: number): string {
    return [
        toRomanThousands(value),
        toRomanHundreds(value),
        toRomanTens(value),
        toRomanOnes(value),
    ].join('');
}

function toRoman(value: number): string {
    const absolute = Math.floor(Math.abs(value));
    if (absolute === 0) {
        return '0';
    }
    if (value < 0) {
        return '-' + toRomanAbsolute(absolute);
    }
    return toRomanAbsolute(absolute);
}

export { sum, fThousands, toRoman };

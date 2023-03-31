const buttonNum = document.querySelectorAll('[data-number]');
const display = document.querySelector('.user-input');
const output = document.querySelector('.result');
const buttonOparator = document.querySelectorAll('[data-operator]')

const del = document.querySelector('.del');

const dec = document.querySelector('.decimal');

const clear = document.querySelector('#clear');

const neg = document.querySelector('#negative');

const perc = document.querySelector('#percentage');

const bracket = document.querySelector('#brackets');

const calc = document.querySelector('#equal');

buttonNum.forEach((button) =>
    button.addEventListener('click', () => {
        if (output.textContent !== '') {
            erase();
        }
        display.textContent += button.value;
    })
);

buttonOparator.forEach((button) =>
    button.addEventListener('click', () => {
        if (output.textContent !== '') {
            erase();
        }
        switch (display.textContent.slice(-1)) {
            case '+':
            case '-':
            case '÷':
            case '×':

                return;
                break;
        }
        display.textContent += button.value;
    })
);

del.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
});

dec.addEventListener('click', () => {

    const regex = /(\d+\.\d)(\d+)/;

    if (display.textContent === '') {
        return;
    } else if (display.textContent.slice(-1) === '.') {
        return;
    }

    display.textContent += dec.value;
});

clear.addEventListener('click', () => {
    erase();
});

function erase() {
    display.textContent = '';
    output.textContent = '';
}

neg.addEventListener('click', () => {

    if (output.textContent !== '') {
        erase();
    }

    let lastchar = display.textContent.slice(-1);

    if (lastchar === '-' && display.textContent.slice(-2, -1) === '(') {
        display.textContent = display.textContent.slice(0, -2);
    } else {
        display.textContent += '(-';
    }

})

perc.addEventListener('click', () => {

    if (display.textContent === '') {
        return;
    } else if (display.textContent.slice(-1) === '%') {
        return;
    } else {
        display.textContent += '%';
    }
});



bracket.addEventListener('click', () => {
    const lastChar = display.textContent.slice(-1);

    if (lastChar === "" || lastChar === "(" || lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        display.textContent += "(";
    } else if (lastChar >= "0" && lastChar <= "9") {
        let openParentheses = 0;
        let closedParentheses = 0;
        for (let i = display.textContent.length - 1; i >= 0; i--) {
            if (display.textContent[i] === "(") {
                openParentheses++;
            } else if (display.textContent[i] === ")") {
                closedParentheses++;
            }
            if (openParentheses === closedParentheses) {
                display.textContent += ")";
                break;
            }
        }
    }
});


calc.addEventListener('click', () => {

    if (display.textContent.includes('%')) {
        const regex = /([0-9.]+)%/;
        const match = display.textContent.match(regex);
        const num = parseFloat(match[1]);

        const result = num / 100;
        output.textContent = result;

    } else {
        display.textContent = display.textContent.replace(/÷/g, '/');
        display.textContent = display.textContent.replace(/×/g, '*');


        const regex = /[^0-9+\-*/().]/g;

        if (regex.test(display.textContent)) {
            return;
        }

        const answer = eval(display.textContent);
        display.textContent = display.textContent.replace(/\//g, '÷').replace(/\*/g, '×');
        output.textContent = answer;
    }
});
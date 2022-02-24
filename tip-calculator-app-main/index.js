let bill = document.getElementById('bill');
let people = document.getElementById('people');
let custom = document.getElementById('custom');
let buttons = [ ...document.querySelectorAll('button') ];
let personPlaceholder = document.getElementById('person-placeholder');
let totalPlaceholder = document.getElementById('total-placeholder');
let reset = document.getElementById('reset');
let tip = 5;
let resetEnable = false;
// console.log(buttons);

// console.log(bill);
let billTemplateString = /^[1-9]\d*(\.\d+)?$/i;
let peopleTemplateString = /^[1-9][0-9]?$|^100$/i;

const calculateValueAndSetFlag = () => {
	let billValue = parseFloat(bill.value);
	let peopleValue = parseInt(people.value);
    let totalTip = billValue * (tip / 100 );
    let total = billValue + totalTip;
    let perPersonTotal = total / peopleValue;
    let tipPerPerson = totalTip / peopleValue;
    if(perPersonTotal && tipPerPerson){
        // console.log("Can print the value");
        personPlaceholder.innerText = `${tipPerPerson.toFixed(2)}$`;
        totalPlaceholder.innerText = `${perPersonTotal.toFixed(2)}$`;
        reset.removeAttribute("disabled");
        // reset.classList.remove
    }else{
        personPlaceholder.innerText = `0.00$`;
        totalPlaceholder.innerText = `0.00$`;
        reset.setAttribute("disabled","");
    }
};

bill.addEventListener('input', (e) => {
	// console.log(calculateValueAndSetFlag);
	if (!billTemplateString.test(e.target.value)) {
		let value = e.target.value;
		console.log(value.indexOf('.'));
		if (value.indexOf('.') === value.length - 1) {
			// console.log('Breaking pattern but single dot');
			return;
		} else if (value.indexOf('.') < value.length - 1 && value[value.length - 1] === '.') {
			// console.log('Breaking pattern and second dot');
			e.target.value = e.target.value.slice(0, -1);
		} else {
			// console.log('complete breaking pattern');
			e.target.value = e.target.value.slice(0, -1);
		}
	}
    calculateValueAndSetFlag();
});

people.addEventListener('input', (e) => {
	// console.log(calculateValueAndSetFlag);

	if (peopleTemplateString.test(e.target.value)) {
		e.target.value = parseInt(e.target.value);
		// console.log(e.target.value)
	} else {
		// console.log(e.target.value);
		e.target.value = e.target.value.slice(0, -1);
	}
	// e.target.value = parseInt(e.target.value);
	calculateValueAndSetFlag();
});

custom.addEventListener('input', (e) => {
	// console.log(calculateValueAndSetFlag);

	buttons.forEach((button) => {
		button.classList.remove('selected');
	});
	if (peopleTemplateString.test(e.target.value)) {
		e.target.value = parseInt(e.target.value) > 100 ? 100 : parseInt(e.target.value);
	} else {
		if (e.target.value.length >= 3 && parseInt(e.target.value) > 100) {
			e.target.value = 100;
		} else if (e.target.value.length === 0) {
			e.target.value = 0;
		}
	}
	tip = parseInt(e.target.value);
	// console.log(tip);
	calculateValueAndSetFlag();
});

function select() {
	buttons.forEach((button) => {
		button.classList.remove('selected');
	});
	custom.value = 0;
	this.classList.add('selected');
	tip = parseInt(this.innerText);
	calculateValueAndSetFlag();
}

buttons.forEach((button) => {
	if (button.id !== 'reset') button.addEventListener('click', select);
});

reset.addEventListener('click',(e)=>{
    tip = 5;
    personPlaceholder.innerText = `0.00$`;
    totalPlaceholder.innerText = `0.00$`;
    bill.value = "";
    custom.value = "";
    people.value = "";
    buttons.forEach(button => button.classList.remove('selected'));
    buttons[0].classList.add('selected');
    reset.setAttribute("disabled","");
})
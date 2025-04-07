const form = document.querySelector(".form");
const amountInput = document.querySelector("#amount");
const termInput = document.querySelector("#term");
const rateInput = document.querySelector("#rate");
const typeInputs = document.querySelectorAll('input[name="Type"]');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    document.querySelectorAll(".error_text").forEach(el => el.classList.add("off"));

    if (amountInput.value === "") {
        amountInput.parentElement.nextElementSibling.classList.remove("off");
        valid = false;
    }
    if (termInput.value === "") {
        termInput.parentElement.nextElementSibling.classList.remove("off");
        valid = false;
    }
    if (rateInput.value === "") {
        rateInput.parentElement.nextElementSibling.classList.remove("off");
        valid = false;
    }
    if (![...typeInputs].some(input => input.checked)) {
        typeInputs[typeInputs.length - 1].closest("fieldset").querySelector(".error_text").classList.remove("off");
        valid = false;
    }

    if (!valid) return;

    const values = calculator(parseFloat(amountInput.value), parseInt(termInput.value), parseFloat(rateInput.value));
    showResults(values);
});

function createP() {
    return document.createElement('p')
}

function calculator(amount, term, rate) {
    const x = (rate / 100) / 12;
    const y = term * 12;

    const selectedType = [...typeInputs].find(input => input.checked)?.value;

    let result, total;

    if (selectedType === "repayment") {
        result = amount * (x * Math.pow(1 + x, y)) / (Math.pow(1 + x, y) - 1);
        total = result * y;
    } else if (selectedType === "interest-only") {
        result = amount * x;
        total = result * y;
    } else {
        result = 0;
        total = 0;
    }

    return { result, total };
}

function showResults({result, total}) {
    const noResults = document.querySelector(".no_results");
    const monthRepay = document.querySelector(".monthly_repay");
    const totalRepay = document.querySelector(".total_repay")

    const monthP = createP();
    const totalP = createP();
    monthP.innerHTML = `${result.toLocaleString("en-us", {
        style: "currency", currency: "GBP"
    })}`;
    totalP.innerHTML = `${total.toLocaleString("en-us", {
        style: "currency", currency: "GBP"
    })}`;

    noResults.classList.add("off");
    noResults.nextElementSibling.classList.remove("off");

    monthRepay.innerHTML = "";
    totalRepay.innerHTML = "";

    monthRepay.appendChild(monthP);
    totalRepay.appendChild(totalP);
}

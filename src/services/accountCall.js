
import company from "./company";
import reports from "./reports";
import pricesDic from "./pricesForAccountCall";

const reportsNames = Object.keys(reports);
const productPrices = pricesDic.products;
const expensesPrices = pricesDic.expenses;


const generateRandomDate = (year) => {
    const from = new Date(year, 0, 1);
    let to = new Date();
    year !== new Date().getFullYear() && (to = new Date(year, 11, 31));
    return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()))
                    .toISOString().split('T')[0];
}

const lastDayOfMonth = (date) => {
    const howMuchDays = ( year , month) => {
        const date1 = new Date(year, month-1, 1);        
        const date2 = new Date(year, month, 1);        
        return Math.round((date2 - date1) / 1000 / 3600 / 24);       
    }
    const lastDay = howMuchDays(date.substring(0, 4), date.substring(5, 7));
    return date.slice(0, -2) + lastDay;
}

const randomSelectChoise = (array) => {    
    return array[Math.floor(Math.random() * array.length)];
}

const randomDoubleRadio = (probabilityFirstValue, firstValue, secondValue) => {    
    return Math.random() < probabilityFirstValue ? firstValue : secondValue;
}

const randomClient = (clients) => {    
    const randonClient = randomSelectChoise(clients);
    return `${randonClient.name}, ${randonClient.form}`;
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const generateRandomPrice = (prices, type, typeOfSale="розница") => {
    let randomPrise = getRandomInt(prices[type].min, prices[type].max);
    typeOfSale === "опт" && (randomPrise *=  getRandomInt(50, 100));
    return randomPrise;
}


const accountCall = (selectedCompany, reportType, year) => {

    let dataIncome = ["2024-11-20", "Сноуборды", "12345", "Москва, Центральная", "опт", "Физ.Лицо", "12300"];
    let dataExpense = ["2024-09-12", "54321", "Зарплата"];

    const createDataIncome = () => {
        dataIncome[0] = generateRandomDate(year);
        dataIncome[1] = randomSelectChoise(company[selectedCompany].productCategories);
        dataIncome[4] = randomDoubleRadio(0.90, "розница", "опт");
        dataIncome[2] = generateRandomPrice(productPrices, dataIncome[1], dataIncome[4]);
        dataIncome[3] = randomSelectChoise(company[selectedCompany].points);        
        dataIncome[4] === "опт" &&  (dataIncome[5] = randomClient(company[selectedCompany].clients));
        dataIncome[6] = Math.round(dataIncome[2]*(getRandomInt(70, 95)/100));
    }

    const createDataExpense = () => {
        dataExpense[0] = lastDayOfMonth(generateRandomDate(year));
        dataExpense[2] = randomSelectChoise(company[selectedCompany].expenses);
        dataExpense[1] = generateRandomPrice(expensesPrices, dataExpense[2]);        
    }

    switch (reportType) {
        case reportsNames[0]:
            createDataIncome();
            break;
        case reportsNames[1]:
            createDataExpense();
            break;
        default:   
            createDataIncome();
            createDataExpense();
            break;
    }

    return {
        dataIncome: dataIncome,
        dataExpense: dataExpense
    }
}

export default accountCall;
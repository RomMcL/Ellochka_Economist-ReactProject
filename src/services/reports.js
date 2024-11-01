
/* const reports = {
    salesDynamics: {
        name: "Динамика продаж",
        requiredData: ["Дата", "Категория", "Сумма продаж"],
        width: ["32%", "32%", "32%"],

    },
    salesStructure: {
        name: "Структура продаж",
        requiredData: ["Дата", "Категория", "Сумма продаж", "Точка", "Тип продажи", "Контрагент"],
        width: ["15%", "15%", "15%", "15%", "15%", "15%"],

    },
    grossProfit: {
        name: "Валовая прибыль",
        requiredData: ["Дата", "Категория", "Сумма продаж", "Цена закупки"],
        width: ["21%", "21%", "21%", "21%"],

    },
    costStructure: {
        name: "Структура расходов",
        requiredData: ["Дата", "Сумма", "Статья расходов"],
        width: ["32%", "32%", "32%"],

    },
} */

const incomeStatementReportsNames = {
    salesDynamics: "Динамика продаж",
    salesStructure: "Структура продаж",
    grossProfit: "Валовая прибыль"
}
const expenseReportReportsNames = {
    costStructure: "Структура расходов",
}


const reports = {
    incomeStatement: {
        name: "Отчёт по доходам",
        reportsNames: incomeStatementReportsNames,
        requiredData: ["Дата", "Категория", "Сумма продаж", "Точка", "Тип продажи", "Контрагент", "Цена закупки"],
        width: ["10%", "15%", "10%", "25%", "10%", "20%", "10%"],
    },
    expenseReport: {
        name: "Отчёт по расходам",
        reportsNames: expenseReportReportsNames,
        requiredData: ["Дата", "Сумма", "Статья расходов"],
        width: ["32%", "32%", "32%"],
    },
    generalReport: {
        name: "Общий отчёт",
        reportsNames: {...incomeStatementReportsNames, ...expenseReportReportsNames},

        /* requiredData: ["Дата", "Категория", "Сумма продаж", "Точка", "Тип продажи", "Контрагент", "Цена закупки"],
        width: ["10%", "15%", "10%", "25%", "10%", "20%", "10%"], */
    },

}


export default reports;
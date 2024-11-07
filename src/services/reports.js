
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
    },

}


export default reports;
module.exports = {
  components: {
    // FinancialBot
    'BalanceRetrieval': require('./banking/balance_retrieval'),
    //custom component registry
    'MedicineRetrieval' : require('./banking/medicine_retrieval')
  }
};

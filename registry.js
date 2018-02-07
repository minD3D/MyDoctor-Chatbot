module.exports = {
  components: {
    // FinancialBot
    'MedicineRetrieval' : require('./Medicine/medicine_retrieval'),
    'FAQRetrieval' : require('./FAQ/FAQ_retrieval'),
    'FindHospitalRetrieval' : require('./Hospital/FindHospital_retrieval'),
    'ProfessorInDeptRetrieval' : require('./Hospital/ProfessorInDept_retrieval')
  }
};

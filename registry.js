module.exports = {
  components: {
    'MedicineRetrieval' : require('./Medicine/medicine_retrieval'),
    'FAQRetrieval' : require('./FAQ/FAQ_retrieval'),
    'FindHospitalRetrieval' : require('./Hospital/FindHospital_retrieval'),
    'ProfessorInDeptRetrieval' : require('./Hospital/ProfessorInDept_retrieval'),
    'MakeReservation' : require('./Reservation/makeReservation'),
    'FindProfessorRetrieval' : require('./Hospital/FindProfessor_retrieval'),
    'SetProfessorInDept' : require('./Hospital/setProfessorInDept'),
    'StartServiceRetrieval' : require('./StartEnd/startServiceRetrieval'),
    'UndefinedServiceRetrieval' : require('./StartEnd/undefinedServiceRetrieval'),
    'DeleteReservation' : require('./Reservation/deleteReservation'),
    'ShowReservation' : require('./Reservation/showReservation')
    
  }
};

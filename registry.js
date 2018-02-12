module.exports = {
  components: {
    'MedicineRetrieval' : require('./Medicine/medicine_retrieval'),
    'FAQRetrieval' : require('./FAQ/FAQ_retrieval'),
    'FAQServiceRetrieval' : require('./FAQ/FAQ_service_retrieval'),
    'FindHospitalRetrieval' : require('./Hospital/FindHospital_retrieval'),
    'ProfessorInDeptRetrieval' : require('./Hospital/ProfessorInDept_retrieval'),
    'MakeReservation' : require('./Reservation/makeReservation'),
    'MakeReservationInOther' : require('./Reservation/makeReservationInOther'),
    'FindProfessorRetrieval' : require('./Hospital/FindProfessor_retrieval'),
    'SetProfessorInDept' : require('./Hospital/setProfessorInDept'),
    'SetProfessorInOther' : require('./Hospital/setProfessorInOther'),
    'StartServiceRetrieval' : require('./StartEnd/startServiceRetrieval'),
    'UndefinedServiceRetrieval' : require('./StartEnd/undefinedServiceRetrieval'),
    'DeleteReservation' : require('./Reservation/deleteReservation'),
    'ShowReservation' : require('./Reservation/showReservation')
  }
};

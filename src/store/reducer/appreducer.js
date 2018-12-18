import { AppAction } from "../action";
var is = {
  name: "zubair",
  vacancies: [],
  studentpro: [],
  companypro: [],
  vacanciesStudent: [],
  applied: [],
  studentlogin: false
};

export default function AppReducer(state = is, action) {
  switch (action.type) {
    case AppAction.STUDENT_SIGNUP:
      return Object.assign({}, state, { studentsignupP: true });
    case AppAction.COMPANY_SIGNUP:
      return Object.assign({}, state, { companysignupP: true });

    case AppAction.CLICKED:
      return Object.assign({}, state, { name: action.payload });
    case AppAction.GET_USER:
      return Object.assign({}, state, { user: action.payload });
    case AppAction.VACANCY_CREATED_SUCCESS:
      return Object.assign({}, state, { createdSuccess: true });
    case AppAction.VACANCY_CREATED_FAIL:
      return Object.assign({}, state, { createdSuccess: false });
    case AppAction.FETCHED_VACANCIED_SUCCESS:
      return Object.assign({}, state, { vacancies: action.payload });

    case AppAction.LOGIN_COMPANY:
      return Object.assign({}, state, {
        companylogin: true,
        user: action.payload
      });

    case AppAction.STUDENT_LOGIN:
      return Object.assign({}, state, {
        studentlogin: true,
        user: action.payload
      });
    case AppAction.STUDENT_P:
      console.log("company", action.payload);
      return Object.assign({}, state, { studentpro: action.payload });

    case AppAction.COMPANY_P:
      return Object.assign({}, state, { companypro: action.payload });
    case AppAction.VACANCIES:
      return Object.assign({}, state, { vacanciesStudent: action.payload });
    case AppAction.APPLIED:
      return Object.assign({}, state, { applied: action.payload });

    case AppAction.CLEAR_REDUX:
      return Object.assign({}, state, {
        companylogin: false,
        studentlogin: false,
        createdSuccess: false
      });
    case AppAction.LOGOUT_SUCCESS:
      return Object.assign({}, state, { user: undefined, logOutSuccess: true });
    default:
      return state;
  }
}

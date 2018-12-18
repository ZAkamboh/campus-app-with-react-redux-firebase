import firebase from "firebase";
export default class AppAction {
  static CLICKED = "CLICKED";
  static VACANCY_CREATED_SUCCESS = "VACANCY_CREATED_SUCCESS";
  static VACANCY_CREATED_FAIL = "VACANCY_CREATED_FAIL";
  static FETCHED_VACANCIED_SUCCESS = "FETCHED_VACANCIED_SUCCESS";
  static FETCHED_VACANCIED_FAIL = "FETCHED_VACANCIED_FAIL";
  static GET_USER = "GET_USER";
  static STUDENT_LOGIN = "STUDENT_LOGIN";
  static LOGIN_COMPANY = "LOGIN_COMPANY";
  static CLEAR_REDUX = "CLEAR_REDUX";
  static COMPANY_SIGNUP = "COMPANY_SIGNUP";
  static STUDENT_SIGNUP = "STUDENT_SIGNUP";
  static COMPANY_PROFILE = "COMPANY_PROFILE";
  static STUDENT_PROFILE = "STUDENT_PROFILE";
  static STUDENT_P = "STUDENT_P";
  static COMPANY_P = "COMPANY_P";
  static VACANCIES = "VACANCIES";
  static APPLIED = "APPLIED";
  static LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

  static login = payload => {
    alert("login successsfull");
    return dispatch => {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          if (payload.type === "student") {
            // localStorage.setItem("studentprofile", JSON.stringify(res));
            // dispatch({
            //   type: AppAction.STUDENT_LOGIN
            // });
            firebase
              .database()
              .ref(`studentprofile/${res.uid}`)
              .on("value", snap => {
                localStorage.setItem(
                  "studentprofile",
                  JSON.stringify(snap.val())
                );

                dispatch({
                  type: AppAction.STUDENT_LOGIN,
                  payload: snap.val()
                });
              });
          } else {
            localStorage.setItem("profile", JSON.stringify(res));
            firebase
              .database()
              .ref(`companyprofile/${res.uid}`)
              .on("value", snap => {
                localStorage.setItem(
                  "companyprofile",
                  JSON.stringify(snap.val())
                );
                dispatch({
                  type: AppAction.LOGIN_COMPANY,
                  payload: snap.val()
                });
              });
          }
        })
        .catch(error => {
          alert(error.message);
        });
    };
  };

  static getUserfromRedux = () => {
    return dispatch => {
      var student = localStorage.getItem("studentprofile");
      if (student === null) {
        var company = localStorage.getItem("companyprofile");
        return dispatch({
          type: AppAction.GET_USER,
          payload: JSON.parse(company)
        });
      } else {
        return dispatch({
          type: AppAction.GET_USER,
          payload: JSON.parse(student)
        });
      }
    };
  };
  static button(payload) {
    return { type: AppAction.CLICKED, payload: payload };
  }
  static createVacancy = payload => {
    return dispatch => {
      firebase
        .database()
        .ref(`companyvacancyy`)
        .push(payload)
        .then(response => {
          dispatch({
            type: AppAction.VACANCY_CREATED_SUCCESS
          });
        })
        .catch(error => {
          dispatch({
            type: AppAction.VACANCY_CREATED_FAIL
          });
        });
    };
  };

  static clear() {
    return dispatch => {
      dispatch({ type: AppAction.CLEAR_REDUX });
    };
  }

  static getVacancies = () => {
    return dispatch => {
      var user = JSON.parse(localStorage.getItem("profile"));
      var uid = user && user.uid;
      console.log(uid);
      firebase
        .database()
        .ref(`companyvacancyy`)
        .on("value", snap => {
          var values = [];
          var data = snap.val();
          // var keys = Object.keys(data);
          for (let keys in data) {
            if (data[keys]["companyUid"] === uid) {
              values.push({
                ...data[keys],
                key: keys
              });
            }
          }
          dispatch({
            type: AppAction.FETCHED_VACANCIED_SUCCESS,
            payload: values
          });
        });
    };
  };

  // static companySignup = payload => {
  //   alert("company successfully signup");
  //   return {
  //     type: AppAction.COMPANY_SIGNUP
  //   };
  // };
  static studentSignup = payload => {
    alert("student successfully signup");
    return dispatch => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          firebase
            .database()
            .ref(`studentprofile/${response.uid}`)
            .set(payload);

          dispatch({
            type: AppAction.STUDENT_SIGNUP
          });
        });
    };
  };

  static companySignup = payload => {
    alert("company");
    return dispatch => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          delete payload.password;
          delete payload.cpassword;
          firebase
            .database()
            .ref(`companyprofile/${response.uid}`)
            .set(payload);

          dispatch({
            type: AppAction.COMPANY_SIGNUP
          });
        });
    };
  };

  static studentP = () => {
    return dispatch => {
      //const stdpro = JSON.parse(localStorage.getItem("studentprofile"));
      var data = localStorage.getItem("studentprofile");
      var user = JSON.parse(data);

      return dispatch({
        type: AppAction.STUDENT_P,
        payload: user
      });
    };
  };

  static companyP = () => {
    alert("company");
    return dispatch => {
      //const stdpro = JSON.parse(localStorage.getItem("studentprofile"));
      var data = localStorage.getItem("companyprofile");
      var userC = JSON.parse(data);

      return dispatch({
        type: AppAction.COMPANY_P,
        payload: userC
      });
    };
  };

  static vacancies = () => {
    return dispatch => {
      var values = [];
      // var u = JSON.parse(localStorage.getItem("studentlogin"));
      // var uid = u && u.uid;
      //console.log(uid);
      firebase
        .database()
        .ref(`companyvacancyy`)
        .once("value", snap => {
          var data = snap.val();
          //var keys = Object.keys(data);
          for (let keys in data) {
            values.push({
              ...data[keys],
              key: keys
            });
          }
          console.log(values);
          dispatch({
            type: AppAction.VACANCIES,
            payload: values
          });
        });
    };
  };

  static applied = vacancyId => {
    return dispatch => {
      // var vacancyId = this.props.location.state.data;

      firebase
        .database()
        .ref(`/companyvacancyy/${vacancyId}/appliedStudents`)
        .on("value", snap => {
          var value = snap.val();
          var data = [];
          for (let keys in value) {
            data.push(value[keys]);
          }
          dispatch({
            type: AppAction.APPLIED,
            payload: data
          });
        });
    };
  };
  static LogOut() {
    return dispatch => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("companyprofile");
          localStorage.removeItem("studentlogin");
          localStorage.removeItem("studentprofile");
          dispatch({
            type: AppAction.LOGOUT_SUCCESS
          });
        });
    };
  }
}

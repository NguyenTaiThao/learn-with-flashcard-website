import axios from "axios";
import Cookie from 'js-cookie';
const Reactotron = process.env.NODE_ENV !== "production" && require("reactotron-react-js").default;

function createAxios() {
  var axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = "https://flashcard-web-project.herokuapp.com/api/";
  axiosInstant.defaults.timeout = 20000;
  axiosInstant.defaults.headers = { "Content-Type": "application/json" };

  axiosInstant.interceptors.request.use(
    async config => {
      config.headers.token = Cookie.get('SESSION_ID');
      return config;
    },
    error => Promise.reject(error)
  );


  axiosInstant.interceptors.response.use(
    response => {
      Reactotron.apisauce(response);

      // if (response.data && response.data.code == 403) {
      //   showMessages(
      //     R.strings().notif_tab_cus,
      //     R.strings().require_login_againt,
      //     () =>
      //       AsyncStorage.removeItem(ASYNC_STORAGE.TOKEN, () => {
      //         const store = require("@app/redux/store").default;
      //         store.dispatch({ type: "reset" });
      //         NavigationUtil.navigate(SCREEN_ROUTER_AUTH.AUTH_LOADING);
      //       })
      //   );
      // } else if (response.data && response.data.status != 1)
      //   showMessages(R.strings().notif_tab_cus, response.data.message);
      return response;
    });

  return axiosInstant;
}


// return axiosInstant;
// }

export const getAxios = createAxios();

/* Support function */
function handleResult(api) {
  return api.then(res => {
    if (res.data.status != 1) {
      return Promise.reject(res.data);
    }
    return Promise.resolve(res.data);
  });
}


// ========================= USER ===============================
export const requestRegister = (payload) => {
  return handleResult(
    getAxios.post("register", {
      "email": payload.email || "",
      "password": payload.password || "",
      "re_password": payload.repassword || "",
      "name": payload.username || ""
    })
  );
};

export const requestGetUserInfo = () => {
  return handleResult(getAxios.get(`user/info`))
}

export const requestLogin = (payload) => {
  return handleResult(
    getAxios.post(`login`, {
      email: payload.email || "",
      password: payload.password || ""
    }))
}

export const requestLogout = () => {
  return handleResult(getAxios.post(`logout`))
}


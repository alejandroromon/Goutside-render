const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      tokenLS: null,
      userRol: null,
      userId: null,
      userEmail: null,
      userName: null,
      userLastName: null,
      userAdress: null,
      userGender: null,
      userPhone: null,
      userProfileImagen: null,
      posterImagenUrl: null,
      competitions: [],
      error: false,
      loading: true,
      temporalUserSearch: [],
      pathName: window.location.pathname,
      imageCompetitions: [],
    },
    actions: {
      signup: async (email, password1, password2) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password1: password1,
              password2: password2,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await resp.json();
          if (resp.status === 400) {
            setStore({ error: true });
            return;
          }
          if (resp.status === 200) {
            localStorage.setItem("token", data.token);
            setStore({ tokenLS: data.token, userRol: data.rol });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      login: async (email, password) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await resp.json();
          if (resp.status === 200) {
            localStorage.setItem("token", data.token);
            setStore({
              tokenLS: data.token,
              userRol: data.rol,
              userId: data.user_id,
            });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      getUser: async () => {
        const options = {
          method: "GET",
          headers: { Authorization: "Bearer " + getActions().getTokenLS() },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/user",
            options
          );
          const data = await resp.json();
          if (resp.status === 200) {
            setStore({
              userEmail: data.email,
              userName: data.name,
              userLastName: data.last_name,
              userAdress: data.adress,
              userGender: data.gender,
              userPhone: data.phone,
              userProfileImagen: data.profile_image,
              userRol: data.rol,
              loading: false,
              tokenLS: getActions().getTokenLS(),
            });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeDataUser: async (name, last_name, adress, gender, phone) => {
        const body = {
          name: name,
          last_name: last_name,
          adress: adress,
          gender: gender,
          phone: phone,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            Authorization: "Bearer " + getActions().getTokenLS(),
            "Content-Type": "application/json",
          },
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/user",
            options
          );
          const data = await resp.json();
          if (resp.status === 200) {
            getActions().getUser();
            setStore({
              userName: data.name,
              userLastName: data.last_name,
              userAdress: data.adress,
              userGender: data.gender,
              userPhone: data.phone,
            });

            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      deleteUser: async () => {
        const options = {
          method: "DELETE",
          headers: { Authorization: "Bearer " + getActions().getTokenLS() },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/user",
            options
          );
          const data = await resp.json();
          if (resp.status === 200) {
            getActions().deleteTokenLS();
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      deleteTokenLS: () => {
        setStore({
          tokenLS: null,
          userRol: null,
          userId: null,
          userEmail: null,
          userName: null,
          userLastName: null,
          userAdress: null,
          userGender: null,
          userPhone: null,
          userProfileImagen: null,
          posterImagenUrl: null,
          imageCompetitions: null,
        });
      },
      getTokenLS: () => {
        return localStorage.getItem("token");
      },
      setUrlImagen: (url) => {
        setStore({ posterImagenUrl: url });
      },
      deleteUrlImg: () => {
        setStore({ posterImagenUrl: null });
      },
      changeError: () => {
        setStore({ error: !error });
      },
      addTemporalUserSearch: (data) => {
        setStore({ temporalUserSearch: data.users });
      },
      deleteTemporalUserSearch: () => {
        setStore({ temporalUserSearch: [] });
      },
      getImageCompetitions: (data) => {
        setStore({ imageCompetitions: data });
      },
    },
  };
};

export default getState;

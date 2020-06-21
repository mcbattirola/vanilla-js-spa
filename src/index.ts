import promiseXHR from "./promiseXHR";


const initApp = async () => {
    try {
        const rootElement = document.getElementById('app');
        const mainTable: HTMLElement = document.createElement("table");

        const userRequest = await promiseXHR("https://simple-users-backend.herokuapp.com/user", "GET");
        const users: JSON = JSON.parse(userRequest.response);

    } catch (error) {

    }
}



window.addEventListener("load", initApp)


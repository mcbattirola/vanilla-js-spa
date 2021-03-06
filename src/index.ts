import UsersTable from "./components/usersTable";
import { Renderizable } from "./interfaces";

let rootElement: HTMLElement;
let currentContentBuilder: Renderizable;

const initApp = async () => {
    rootElement = document.getElementById('app');

    let loading = createLoadingElement();
    rootElement.appendChild(loading)
    changeComponentHandler(new UsersTable);
};

const createLoadingElement = (): HTMLElement => {
    let loading = document.createElement("h1");
    loading.innerHTML = "loading...";
    return loading;
}

const changeComponentHandler = (component: Renderizable) => {
    currentContentBuilder = component;
    component.changeComponentHandler = changeComponentHandler;
    renderComponent();
}

const renderComponent = async () => {
    const appContent = await currentContentBuilder.render();
    const mainContainer = createMainContainer();
    mainContainer.appendChild(appContent)
    renderOnRoot(mainContainer);
}

const createMainContainer = (): HTMLElement => {
    const mainContainer = document.createElement("main");
    mainContainer.className = "app-container";
    return mainContainer;
}

const renderOnRoot = (component: HTMLElement) => {
    if (rootElement) {
        if (rootElement.firstChild) {
            rootElement.removeChild(rootElement.firstChild);
        }
        rootElement.appendChild(component);
    }
}

window.addEventListener("load", initApp)

interface Renderizable {
    render(): HTMLElement;
}
export default class UsersTable implements Renderizable {
    render() {
        return new HTMLElement();
    }
}
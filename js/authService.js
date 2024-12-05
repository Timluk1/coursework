class AuthService {
    constructor() {}
    checkAuth() {
        return Boolean(localStorage.getItem("isAuth"));
    }
    clearAuth() {
        localStorage.removeItem("username")
        localStorage.setItemI("isAuth", false)
    }
    loginUser(username) {
        localStorage.setItem("username", username)
        localStorage.setItem("isAuth", true)
    }
}

export const authService = new AuthService();

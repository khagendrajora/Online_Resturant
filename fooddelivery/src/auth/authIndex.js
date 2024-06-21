export const isAuthenticated = () => {
    if (localStorage.getItem('loginedUserDetail')) {
        return JSON.parse(localStorage.getItem('loginedUserDetail'))
    }
    else {
        return false
    }
}
export const getters = {
    // Renvoit un booléen. Lorsque l'utilisateur n'est pas connecté, la valeur est égale à false et true si connecté. 
    isAuthenticated(state) {
        return state.auth.loggedIn
    },
    // Retourne les données fournies par le endpoint "/me" de l'API JWT ou null si non connecté
    loggedInUser(state) {
        return state.auth.user
    }
}
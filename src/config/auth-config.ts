const authConfig = {
    authorizedOnly: {
        failureRedirect: '/users/sign-in'
    },
    anonymousOnly: {
        failureRedirect: '/users/profile'
    }
}

export default authConfig;
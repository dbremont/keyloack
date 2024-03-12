const keycloak = Keycloak({
    realm: "master",
    url: "http://localhost:8080/auth/",
    clientId: "my-client",
    redirectUri: "http://localhost"
});

function login() {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
        if (authenticated) {
            displayUserInfo();
        } else {
            console.error('Authentication failed');
        }
    });
}

function logout() {
    keycloak.logout();
}

function displayUserInfo() {
    keycloak.loadUserInfo().success(userInfo => {
        document.getElementById('content').innerHTML = `
            <p>Username: ${userInfo.username}</p>
            <p>Email: ${userInfo.email}</p>
        `;
    }).error(() => {
        console.error('Failed to load user info');
    });
}

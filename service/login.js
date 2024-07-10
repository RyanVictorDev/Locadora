let apiClient;

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        axios.post("https://livraria-api.altislabtech.com.br/auth/login", {
            username: username,
            password: password
        })
        .then(response => {
            const token = response.data.token;

            // Criar apiClient com o token recebido
            apiClient = axios.create({
                baseURL: "https://livraria-api.altislabtech.com.br",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Salvando o token no localStorage para ser usado no cache  
            localStorage.setItem('apiToken', token);

            // Redirecionando para a home
            window.location.href = "../html/dashboard.html";
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert("Nome de usuário ou senha incorretos.");
        });
    });
});

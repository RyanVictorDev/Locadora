axios.get("https://livraria-api.altislabtech.com.br/publisher")
.then((response) => {
    console.log(response.data)
})
.catch((error) => {
    console.log(error)
});

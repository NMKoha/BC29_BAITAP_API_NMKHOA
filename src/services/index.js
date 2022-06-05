function Services() {
    this.getListQLNDAPI = function() {
        return axios({
            url: "https://628fbc880e69410599e1d4bf.mockapi.io/api/quanlynguoidung",
            method: "GET",
        });
    };
}
function Services() {
    this.getListQLNDAPI = function() {
        return axios({
            url: "https://628fbc880e69410599e1d4bf.mockapi.io/api/quanlynguoidung",
            method: "GET",
        });
    };
    this.deleteNDApi = function(id) {
        return axios({
            url: `https://628fbc880e69410599e1d4bf.mockapi.io/api/quanlynguoidung/${id}`,
            method: "DELETE",
        });
    };
    this.addNDApi = function(nguoiDung) {
        return axios({
            url: "https://628fbc880e69410599e1d4bf.mockapi.io/api/quanlynguoidung",
            method: "POST",
            data: nguoiDung,
        });
    };
    this.getNDById = function(id) {
        return axios({
            url: `https://628fbc880e69410599e1d4bf.mockapi.io/api/quanlynguoidung/${id}`,
            method: "GET",
        });
    };
    this.updateND = function(nguoiDung) {
        return axios({
            url: `https://628fbc880e69410599e1d4bf.mockapi.io/api/quanlynguoidung/${nguoiDung.id}`,
            method: "PUT",
            data: nguoiDung,
        });
    };
};
var sevice = new Services();

function getEle(id) {
    return document.getElementById(id);
};

function getListQLND() {
    getEle("loader").style.display = "block";
    sevice.getListQLNDAPI()
        .then(function(result) {
            renderListQLND(result.data);
            getEle("loader").style.display = "none";
        })
        .catch(function(error) {
            console.log(error);
        });


};

getListQLND();

function renderListQLND(data) {
    var contentHTML = "";
    data.forEach(function(QLND) {
        if (QLND.loaiND === "GV") {
            contentHTML += `
            <div class="col-12 col-md-6 col-lg-3 ">
                            <div class="card teacher">
                                <div class="card_img"> <img src="./images/${QLND.hinhAnh} " class="card-img-top " alt="... "></div>
                                <div class="card-body">
                                    <div class="d-flex justify-content-between ">
                                        <div>
                                            <h3 class="teacher__title">${QLND.ngonNgu}</h3>
                                            <h1 class="teacher__title1">${QLND.hoTen}</h1>
                                            <p class="teacher__text ">${QLND.moTa}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
            </div>
            `
        }
        getEle("listProducts").innerHTML = contentHTML;
    })
};
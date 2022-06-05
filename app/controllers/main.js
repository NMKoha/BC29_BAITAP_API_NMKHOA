var service = new Services();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
};

function getListQLND() {
    service.getListQLNDAPI()
        .then(function(result) {
            renderListQLND(result.data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

getListQLND();

function renderListQLND(data) {
    var contentHTML = "";
    data.forEach(function(product, index) {
        contentHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.taiKhoan}</td>
                <td>${product.matKhau}</td>
                <td>${product.hoTen}</td>
                <td>${product.email}</td>
                <td>${product.ngonNgu}</td>
                <td>${product.loaiND}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editND(${product.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteND(${product.id})">Xoá</button>
                </td>
            </tr>
        `
    })
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
};
/**
 * Xoá sp
 */
function deleteND(id) {
    service.deleteNDApi(id)
        .then(function(result) {
            //render table
            getListQLND();
        })
        .catch(function(error) {
            console.log(error);
        });
};

getEle("btnThemNguoiDung").onclick = function() {
    //sửa lại title modal
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Người Dùng";
    //thêm nút "add" vào footer modal
    var footer = `<button class="btn btn-success" onclick="addND(true)">Add</button>`; // truyền tham số boolean vào nhá a
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

}

/**
 * Add ND
 */
function addND(isAdd) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;


    var isValid = true;

    if (isAdd) {
        isValid &= validation.kiemTraRong(
            taiKhoan,
            "errorTaiKhoan",
            "(*) Vui lòng nhập tài khoản"
        );
    }
    //họ tên    
    isValid &= validation.kiemTraRong(
        hoTen,
        "errorHoTen",
        "(*) Vui lòng nhập họ tên"
    ) && validation.kiemTraChuoiKyTu(
        hoTen,
        "erroHoTen",
        "(*) Vui lòng nhập chuỗi ký tự"
    );
    //mật khẩu
    isValid &= validation.kiemTraRong(
        matKhau,
        "errorMatKhau",
        "(*) Vui lòng nhập mật khẩu"
    );
    //email
    isValid &= validation.kiemTraRong(
        email,
        "errorEmail",
        "(*) Vui lòng nhập email"
    );
    //hình ảnh
    isValid &= validation.kiemTraRong(
        hinhAnh,
        "errorHinhAnh",
        "(*) Vui lòng nhập ảnh"
    );
    //loại người dùng
    isValid &= validation.kiemTraChon(
        "loaiNguoiDung",
        "errorLND",
        "(*) Vui lòng chọn loại người dùng"
    );
    //loại ngôn ngữ
    isValid &= validation.kiemTraChon(
        "loaiNgonNgu",
        "errorLNN",
        "(*) Vui lòng chọn loại ngôn ngữ"
    );
    //mô tả
    isValid &= validation.kiemTraRong(
        moTa,
        "errorMoTa",
        "(*) Vui lòng nhập mô tả"
    );
    console.log(kiemTraChon);
    if (!isValid) return; // nếu không valid thì sẽ dừng hàm lại
    //đối tượng người dùng
    var nguoiDung = new NguoiDung("", taiKhoan, hoTen, matKhau, email, loaiNguoiDung, loaiNgonNgu, moTa, hinhAnh);
    service.addNDApi(nguoiDung)
        .then(function() {
            getListQLND();
            // close modal
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function(error) {
            console.log(error);
        });
};

/**
 * Sửa người dùng
 */

function editND(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa Người Dùng";
    // thêm nút update
    var footer = `<button class="btn btn-success" onclick="updateND(${id})">Cập nhật</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    //get id ND
    service.getNDById(id)
        .then(function(result) {

            //show thông tin các thẻ input
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("HinhAnh").value = result.data.hinhAnh;
            getEle("loaiNguoiDung").value = result.data.loaiND;
            getEle("loaiNgonNgu").value = result.data.ngonNgu;
            getEle("MoTa").value = result.data.moTa;
        })
        .catch(function(error) {
            console.log(error);
        });
};

function updateND(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    var nguoiDung = new NguoiDung(id, taiKhoan, hoTen, matKhau, email, loaiNguoiDung, loaiNgonNgu, moTa, hinhAnh);
    service.updateND(nguoiDung)
        .then(function() {
            getListQLND();
            document.getElementsByClassName("close")[0].click();
            console.log(nguoiDung);
            console.log(nguoiDung.id);
        })
        .catch(function(error) {
            console.log(error);
        });
};
//viết lệnh load 
var arrGH = [];

function themvaogiohang(x) {
    arrGH = new Array();
    //ĐỌc giỏ hàng từ sessionStorage
    var gh_str = sessionStorage.getItem("ssgiohang");

    if (gh_str != null) arrGH = JSON.parse(gh_str);
    //Đọc Tổng số sp trong giờ hằng từ sessionStorge
    var countsp = sessionStorage.getItem("countsp");
    if (countsp == null) countsp = 0;
    //Lấy thông tin sản phẩm đang chon jtheem vào giỏ hàng
    var ttsp = x.parentElement.children;
    var hinh = ttsp[0].children[0].src;
    var giasp = ttsp[1].children[0].innerText;

    var tensp = ttsp[2].innerText;
    var slsp = ttsp[3].value;

    var sp = [hinh, tensp, giasp, slsp];

    //ktra sanr phẩm có chưa
    var coroi = 0;
    for (let i = 0; i < arrGH.length; i++) {
        if (arrGH[i][1] == tensp) {
            var sl = Number(arrGH[i][3]);
            sl += Number(slsp);
            arrGH[i][3] = sl;
            coroi = 1;
            break;
        }
    }
    if (coroi == 0) {
        arrGH.push(sp);
        countsp++;
    }
    sessionStorage.setItem("ssgiohang", JSON.stringify(arrGH));
    sessionStorage.setItem("countsp", countsp);
    showcountsp();
}

function showcountsp() {
    var countsp = sessionStorage.getItem("countsp");
    if (countsp == null) countsp = 0;
    document.getElementById('countsp').innerHTML = countsp;
}

//Hàm để gọi cái giỏ hàng ra 
function showcart() {
    var x = document.getElementById('showcart');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    //mỗi lần show thì add cart vô
    addcart();
}

function laydon() {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var arrGH = JSON.parse(gh_str);
    var ttgh = "";
    var tongtt = 0;
    for (var i = 0; i < arrGH.length; i++) {
        var tt = Number(arrGH[i][2] * arrGH[i][3]);
        tongtt += tt;
        ttgh += `
        <tr>
            <td>${i + 1}</td>
            <td><img src="${arrGH[i][0]}" /></td>
            <td>${arrGH[i][1]}</td>
            <td>${arrGH[i][2]}</td>
            <td><input type="number" min="0" max="10" value="${arrGH[i][3]}" onchange="tinhlaidon(this);" ></td>
            <td>${tt} ($)</td>
        </tr>
        `
    }

    ttgh += `
        <tr>
            <td colspan ="5" >TỔNG ĐƠN HÀNG</td>
            <td id="tongtien">${tongtt}</td>
        </tr>
    `;
    document.getElementById('mycart').innerHTML = ttgh;
}

function tinhlaidon(x) {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var arrGH = JSON.parse(gh_str);
    var tr = x.parentElement.parentElement;
    var dg = parseInt(tr.children[3].innerHTML);
    var sl = x.value;
    var tt = parseInt(tr.children[5].innerHTML);
    var tongdon = document.getElementById("tongtien").innerText;
    tongdon -= tt;
    var tensp = tr.children[2].innerText;
    if (sl == 0) {
        dongy = confirm("Số lượng sẽ xóa sản phẩm khỏi giỏ hàng.");
        if (dongy == true) tr.remove();
        for (let i = 0; i < arrGH.length; i++) {
            if (arrGH[i][1] == tensp) {
                arrGH.splice(i, 1);
            }
        }
        var countsp = parseInt(sessionStorage.getItem("countsp") - 1);
        sessionStorage.setItem("countsp", countsp);
    } else {
        for (let i = 0; i < arrGH.length; i++) {
            if (arrGH[i][1] == tensp) {
                arrGH[i][3] = sl;
            }
        }
        tt = dg * sl;
        tr.children[5].innerHTML = tt;
        tongdon += tt;
    }
    document.getElementById('tongtien').innerHTML = tongdon;
    sessionStorage.setItem("ssgiohang", JSON.stringify(arrGH));
}


//hàm thêm vô cái dỏ
function addcart() {
    var ttgh = "";
    var tongtt = 0;
    for (var i = 0; i < arrGH.length; i++) {
        var tt = Number(arrGH[i][2] * arrGH[i][3]);
        tongtt += tt;
        ttgh += `
        <tr>
            <td>${i + 1}</td>
            <td><img src="${arrGH[i][0]}" /></td>
            <td>${arrGH[i][1]}</td>
            <td>${arrGH[i][2]}</td>
            <td>${arrGH[i][3]}</td>
            <td>${tt} ($)</td>
        </tr>
        `;
    }

    ttgh += `
        <tr>
            <td colspan ="5" >TỔNG ĐƠN HÀNG</td>
            <td>${tongtt}</td>
        </tr>
    `;
    document.getElementById('mycart').innerHTML = ttgh;
}
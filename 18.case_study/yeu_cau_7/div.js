function showContent(id) {
    let main = document.getElementById("main")
    switch (id) {
        case 1:
            main.innerHTML = bai1;
            break;
        case 2:
            main.innerHTML = bai2;
            break;
        case 3:
            main.innerHTML = bai3;
            break;
        case 4:
            main.innerHTML = bai4;
            break;
        case 5:
            main.innerHTML = bai5;
            break;

    }

}

let bai1 = "<div> Bài 1: Vẽ hình chữ nhật rỗng chiều dài n và chiều rộng m theo hình dưới đây </div>";
let bai2 = "<div> Bài 2: Vẽ tam giác vuông cân rỗng có chiều cao h. Ví dụ: h = 5 </div>";
let bai3 = "<div> Bài 3: Vẽ tam giác cân đặc có chiều cao h. Ví dụ: h = 5 </div>";
let bai4 = "<div> Bài 4: Vẽ tam giác cân rỗng có chiều cao h. Ví dụ: h = 5 </div>";
let bai5 = "<div> Bài 5: Vẽ tam giác đều rỗng có chiều cao h. Ví dụ: h = 5 </div>";



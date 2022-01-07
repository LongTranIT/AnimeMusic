const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

isRandomAnimation = false;

const comboboxSelect=$('#mySelect');
const randomAnimationBtn=$('#animationRandomBtn');

loadAnimations();



var btnRight = $(".nuts b.phai"),
  btnLeft = $(".nuts b.trai"),
  btnLeft = $(".nuts b.trai"),
  chisohientai = 0,
  trangthai = "noEven";

function chuyenSlide(dicrection, appear, disappear) {
  //kiem tra trang thai
  if (trangthai == "haveEven") return false;
  trangthai = "haveEven";
  var countKetThuc = 0;

  // var phantuhientai = slides[chisohientai];
  var phantuhientai = $('#currentSlide');;
  // //xac dinh chi so phan tu tiep theo
  // if (dicrection == "left") {
  //   //nut trai
  //   if (chisohientai > 0) {
  //     chisohientai--;
  //   } else {
  //     //slide cuoi
  //     chisohientai = slides.length - 1;
  //   }
  // } else if (dicrection == "right") {
  //   //nut phai
  //   if (chisohientai < slides.length - 1) {
  //     chisohientai++;
  //   } else {
  //     //slide cuoi
  //     chisohientai = 0;
  //   }
  // }
  // var phantutieptheo = slides[chisohientai];
  var phantutieptheo = $('#nextSlide');

  //Xu ly khi hieu ung ket thuc
  var xuLyHienTaiDaKetThuc = function () {
    $('.dashboard').classList.remove('changing');
    this.classList.remove(disappear);
    this.classList.remove("active");
    countKetThuc++;
    if (countKetThuc == 2)
      //2 even deu ket thuc
      trangthai = "noEven";
  };
  var xyLyTiepTheoDaKetThuc = function () {
    this.classList.remove(appear);
    this.classList.add("active");
    countKetThuc++;
    if (countKetThuc == 2)
      //2 even deu ket thuc
      trangthai = "noEven";

    $('#currentSlide').style.backgroundImage = $('#nextSlide').style.backgroundImage;
  };

  phantuhientai.addEventListener("webkitAnimationEnd", xuLyHienTaiDaKetThuc);
  phantuhientai.classList.add(disappear);
  $('.dashboard').classList.add('changing');
  phantutieptheo.addEventListener(
    "webkitAnimationEnd",
    xyLyTiepTheoDaKetThuc
  );
  phantutieptheo.classList.add(appear);

}

var chuyenSlideChoNutPhai = function () {
  if (isRandomAnimation) {
    value = random1Item1active();
  }
  else
    value = document.getElementById("mySelect").value;
  chuyenSlide("right", "appearNext" + value, "disappearNext" + value);
};

var chuyenSlideChoNutTrai = function () {
  if (isRandomAnimation) {
    value = random1Item1active();
  }
  else
    value = document.getElementById("mySelect").value;
  chuyenSlide("left", "appearPrev" + value, "disappearPrev" + value);
};

//setInterval(chuyenSlideChoNutPhai,3000); //cho auto slide

var playlist = $('.playlist');
var category = $('.category');

category.onclick = function () {
  playlist.classList.toggle('opened');
  this.classList.toggle('opened');
}

randomAnimationBtn.onclick = function () {
  isRandomAnimation = !isRandomAnimation;
  this.classList.toggle('active');
}

aimationArrayActived=[]
function random1Item1active () {
  do{
    value = 1+Math.floor(Math.random() * 9)
  }
  while(aimationArrayActived.includes(value));
  aimationArrayActived.push(value);

  if(aimationArrayActived.length===9)
    aimationArrayActived=[];
  return value;
}

function loadAnimations () {
  fetch('./data.json')
        .then(response => response.json())
        .then((data) => {
            renderAnimations(data.animations);
        });
}

function renderAnimations (animations) {
  html=animations.map(animate=>{
    return `<option value="${animate.value}">${animate.name}</option>`
  })
  comboboxSelect.innerHTML=html.join('');
}


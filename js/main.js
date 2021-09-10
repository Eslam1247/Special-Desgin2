//All Selector
let boxSetting = document.querySelector('.setting-box'),
    caseBoxSetting = localStorage.getItem('case'),
    colorList = document.querySelectorAll('.colors-list li'),
    mainColoer = localStorage.getItem('theme'), 
    randomBakOp = document.querySelectorAll('.random-btns span'),
    yesOrNo = localStorage.getItem('Button'),
    allBackground = document.querySelectorAll(".images img"),
    bulltsOption = document.querySelectorAll('.control-bullts span'),
    bulltsCase = localStorage.getItem('Bullts'),
    btnUp = document.querySelector('.btn-up'),
    landingPage = document.querySelector('.landing-page'),
    backImage = localStorage.getItem('back'),
    resetBtn = document.querySelector('.reset'),
    linksContainer = document.querySelector('.links'),
    linksBtn = document.querySelector('.links').nextElementSibling,
    links = document.querySelectorAll('.links li a'),
    backgroundCase = true,
    backgroundInterval ,
    skils = document.querySelector('.skils'),
    theProggres = document.querySelectorAll('.skils-proggres .proggres'),
    galleryImage = document.querySelectorAll('.gallery-images img'),
    popup = document.querySelector('.show-image'),
    popupHeading =document.querySelector('.show-image .content .head h3'),
    popupClose =document.querySelector('.show-image .content .head .close'),
    popupImage = document.querySelector('.show-image .content .open'),
    popupCase = localStorage.getItem('Popup'),
    popupSrc = localStorage.getItem('src')
    nvigationBullts = document.querySelector('.navi-bullts'),
    bullts = document.querySelectorAll('.header-area .menu');

//Locale sorage 
if(caseBoxSetting === 'open'){
    boxSetting.classList.add('open')
    document.querySelector('.btn-setting').classList.add('fa-spin')//rotate btn sitting
}
if(mainColoer !== null){
document.documentElement.style.setProperty('--main-color' , mainColoer) 
}
//save background btn
if(yesOrNo == 'false'){
    noBtn(randomBakOp)
    backgroundCase = false
}else{
    backgroundCase = true
}
if(backImage !==null){
    landingPage.style.backgroundImage = `url('images/${backImage}.jpg')`
}
if(bulltsCase ==='none'){
    nvigationBullts.style.display = 'none'
    noBtn(bulltsOption)
}
if(popupCase !==null){
    popup.style.display = 'block'
    popupHeading.textContent = popupCase
    popupImage.innerHTML = `<img src="${popupSrc}" >`
}
//save background image
document.addEventListener('click' , (e)=>{
    if(e.target.classList.contains('btn-setting')){
        boxSetting.classList.toggle('open')//show setting box
        if(boxSetting.classList.contains('open')){
            document.querySelector('.btn-setting').classList.add('fa-spin')//rotate btn sitting
            localStorage.setItem('case' , 'open')
        }else{
            document.querySelector('.btn-setting').classList.remove('fa-spin')//Stop rotate btn sitting
            localStorage.removeItem('case')
        }  
    }
    if(e.target!==linksBtn || e.target!== linksContainer){ //Close meue links
        linksBtn.classList.remove('direction')
         linksContainer.classList.remove('show')
    }
})
//Change Theme
colorList.forEach((li) => {
    li.addEventListener('click' , e=>{
        //documentElement => html document (root)
        document.documentElement.style.setProperty('--main-color' , e.target.dataset.color)
        toggelActive(e)
        localStorage.setItem('theme' ,e.target.dataset.color )
    })
    if(mainColoer !== null){
        li.classList.remove('active')
    }
    if(li.dataset.color === mainColoer){
        li.classList.add('active')
    }
})
//Add active class when click on yese or no button
randomBakOp.forEach(btn => {
    btn.addEventListener('click' , e =>{
        toggelActive(e)
        if(e.target.textContent === 'NO'){
            backgroundCase = false;
            localStorage.setItem('Button' , false);
            clearInterval(backgroundInterval)
        }else{
            backgroundCase = true;
            localStorage.setItem('Button' , true);
            randomBackgroundCase()
        }
    })
})
allBackground.forEach(img => {
    img.addEventListener('click' , e=>{
        landingPage.style.backgroundImage= `url('images/${e.target.dataset.num}.jpg')`
        localStorage.setItem('back',e.target.dataset.num)
    })
})
bulltsOption.forEach(btn => {
    btn.addEventListener('click' , e => {
        toggelActive(e)
        if(e.target.classList.contains('no')){
            nvigationBullts.style.display='none'
            localStorage.setItem('Bullts' , 'none')
        }else{
            nvigationBullts.style.display=''
            localStorage.removeItem('Bullts')
        }
    })
})
//Reset Setting
resetBtn.addEventListener('click' , _=>{
    if(localStorage.getItem('Button')==='false'){
        randomBakOp[0].click()
    }
    if(localStorage.getItem('theme')!=='#f44336'){
        colorList[0].click()
    }
    if(localStorage.getItem('back')!=='1'){
        allBackground[0].click()
    }
    if(localStorage.getItem('Bullts')){
        bulltsOption[0].click()
    }
})
//Another way
// resetBtn.onclick = function (){
//     localStorage.clear();
//     location.reload()
// }
linksBtn.onclick = function(e){
    e.stopPropagation()
    this.classList.toggle('direction')
    linksContainer.classList.toggle('show')
} 
linksContainer.onclick = function(e){
    e.stopPropagation()
}

//Skils
window.onscroll = function(){
    let skilsoffsettop = skils.offsetTop,
        skilsHeight = skils.offsetHeight,
        windowHeight = this.innerHeight ,
        windowScrolTop = this.pageYOffset
        if(windowScrolTop > (skilsoffsettop + skilsHeight - windowHeight)){
            theProggres.forEach(skil => {
                skil.style.width = skil.dataset.proggres
                skil.nextElementSibling.textContent = skil.dataset.proggres 
            })
        }else{
             theProggres.forEach(skil => {
                skil.style.width = 0
                skil.nextElementSibling.textContent = ''
             })
        }
        if(this.scrollY > landingPage.offsetHeight){
            btnUp.style.display = 'block'
        }else{
            btnUp.style.display = ''
        }
}
btnUp.onclick = function(){
    landingPage.scrollIntoView({behavior:'smooth'})
}
//Gallery
galleryImage.forEach(img => {
    img.addEventListener('click' , e=>{
        showImage(e)
        localStorage.setItem('Popup',  e.target.alt)
        localStorage.setItem('src',  e.target.src)
    })
})
popupClose.addEventListener('click' , e=>{
    popup.style.display = ''
    localStorage.removeItem('Popup')
    localStorage.removeItem('src')

});

// function to Add  Active on cliked btn
function toggelActive(event){
    event.target.parentElement.querySelector('.active').classList.remove('active')
    event.target.classList.add('active')
}
//function to add active on no btn
function noBtn(element){
    element[0].classList.remove('active')
    element[1].classList.add('active')
}
//Function To create random background
function randomImages(){
    let randomSrc = Math.ceil(Math.random() * 5 )
        landingPage.style.backgroundImage= `url('images/${randomSrc}.jpg')`
        localStorage.setItem('back' , randomSrc)
}
//Function To Change background every ten seccond
function randomBackgroundCase(){
    if(backgroundCase === true){
         backgroundInterval = setInterval(_=>randomImages(),5000)
    }else{
        clearInterval(backgroundInterval)
    }
};
window.onload = _=> randomBackgroundCase()

function showImage(ele){
         popup.style.display = 'block'
        popupHeading.textContent = ele.target.alt
        popupImage.innerHTML = `<img src="${ele.target.src}" >`
}
//Navigation bullts
function scrollInto(elements){
    elements.forEach(elem => {
        elem.addEventListener('click' , e =>{
            e.preventDefault()
        document.querySelector(e.target.dataset.section).scrollIntoView({behavior:'smooth'})
        console.log(e.target)
        })
    })
}
scrollInto(links)
scrollInto(menu)
/*
window.addEventListener("load", function () {

    loader.className += " hidden"; // class "loader hidden"
},1000);
*/
const loader = document.querySelector(".loader");

window.addEventListener("load" , function() {
    loader.className = 'hidden';
}, 1000)
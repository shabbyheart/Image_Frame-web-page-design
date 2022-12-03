let sideImageNumber = 0;
let flag = 1;
let id = 0;
let end = 0;
let count = 1;
let duration = 2000;
const imageList = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg",
                    "11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg",
                    "21.jpg","22.jpg","23.jpg","24.jpg","25.jpg","26.jpg","27.jpg","28.jpg","29.jpg","30.jpg",
                    "31.jpg","32.jpg","33.jpg","34.jpg","35.jpg","36.jpg","37.jpg","38.jpg","39.jpg","40.jpg",
                    "41.jpg","42.jpg","43.jpg","44.jpg","45.jpg","46.jpg","47.jpg","48.jpg","49.jpg","50.jpg",
                    "51.jpg","52.jpg","53.jpg","54.jpg","55.jpg","56.jpg","57.jpg","58.jpg","59.jpg","60.jpg",
                    "61.jpg","62.jpg","63.jpg","64.jpg","65.jpg","66.jpg","67.jpg","68.jpg","69.jpg","70.jpg",
                    "71.jpg","72.jpg","73.jpg","74.jpg","75.jpg","76.jpg","77.jpg","78.jpg","79.jpg","80.jpg",
                ];


function swapTwoImage(a, b, imageDivs, whichSide){
    let index1 = 0,index2 = 0;
    for(let i = 0; i < imageDivs.length; i++){
        let indexNumber = parseInt(imageDivs[i].dataset.indexNumber);
        if(indexNumber === a){
            index1 = i;
        }
        else if(indexNumber === b){
            index2 = i;
        }
    }

    let style1 = imageDivs[index1].style.cssText;
    let style2 = imageDivs[index2].style.cssText;
    
    /// set image moving animation.
    // each time move animation function call 10 time. so we taken 4*10 time from parant animation

    clearInterval(end);
    end = setInterval(imageMove,duration/100);
    let temp = 0;
    let size = parseInt(imageDivs[index1].style.width);
    const increment = size / 10;
    function imageMove(){
        //console.log('imageMove', count++);
        temp = temp + increment;
        // top bottom image row
        if(whichSide === 1 || whichSide === 2){
            let left = parseInt(imageDivs[index1].style.left);
            left = left + increment;
            imageDivs[index1].style.left = `${left}px`;

            let left2 = parseInt(imageDivs[index2].style.left);
            left2 = left2 - increment;
            imageDivs[index2].style.left = `${left2}px`;
        }
        // left right image row
        else{
            let top = parseInt(imageDivs[index1].style.top);
            top = top + increment;
            imageDivs[index1].style.top = `${top}px`;

            let top2 = parseInt(imageDivs[index2].style.top);
            top2 = top2 - increment;
            imageDivs[index2].style.top = `${top2}px`;
        }
        /// for moving animation end;
        if(temp > size){
            imageDivs[index1].style.cssText = style2;
            imageDivs[index2].style.cssText = style1;
            let datasetIndex = imageDivs[index1].dataset.indexNumber;
            imageDivs[index1].dataset.indexNumber = imageDivs[index2].dataset.indexNumber;
            imageDivs[index2].dataset.indexNumber = datasetIndex;
            clearInterval(end);
        }
    }
}
function imageSwapAnimation(){
    
    //console.log('count', count++)
    window.addEventListener('blur', () =>{
        // alert('blur');
        //console.log('intervalid=',id)
        this.clearInterval(id);
        this.clearInterval(end);
        return;
    })
    const imageDivs = document.getElementsByClassName("img");
    let randomIndex = Math.floor(Math.random() * imageDivs.length-1);
    if(randomIndex >= 0 && randomIndex <= 9){
        if(randomIndex === 9){
            swapTwoImage(randomIndex - 1, randomIndex, imageDivs,1);
        }
        else{
            swapTwoImage(randomIndex, randomIndex+1, imageDivs,1);
        }   
    }
    else if(randomIndex >= 10 && randomIndex <= 19){
        if(randomIndex === 19){
            swapTwoImage(randomIndex - 1, randomIndex, imageDivs,2);
        }
        else{
            swapTwoImage(randomIndex, randomIndex+1, imageDivs,2);
        }
    }
    else if(randomIndex >= 20 && randomIndex < 20+sideImageNumber && sideImageNumber > 1){
        if(randomIndex === 20+sideImageNumber-1){
            swapTwoImage(randomIndex - 1, randomIndex, imageDivs,3);
        }
        else{
            swapTwoImage(randomIndex, randomIndex+1, imageDivs,3);
        }
    }
    else if(randomIndex >= 20+sideImageNumber && randomIndex < 20+(sideImageNumber*2) && sideImageNumber > 1){
        //console.log(randomIndex)
        if(randomIndex === imageDivs.length-1){
            swapTwoImage(randomIndex - 1, randomIndex, imageDivs,4);
        }
        else{
            swapTwoImage(randomIndex, randomIndex+1, imageDivs,4);
        }
    }
}


function createDiv(top,left,imageName,i,perImageDivSize){
    let element = document.createElement('div');
    element.className = 'img';
    element.setAttribute('data-index-number', `${i}`);
    let text = `top: ${top}px; `;
    text += `left: ${left}px; `;
    text += `width: ${perImageDivSize}px; `;
    text += `height: ${perImageDivSize}px; `;

    element.setAttribute('style',text);
    const txt = '<img src="images\\grid\\' + imageName+ '" alt="image">'
    element.innerHTML = txt;
    let div = document.querySelector('#frame');
    div.appendChild(element);
}


function removeHtmlElement(){
    const imageDivs = document.getElementsByClassName("img");
    //console.log(imageDivs);
    for(let i = 0; i < imageDivs.length; i++){
        if(i >= 20){ /// upper and lower total image is 20. rest image are side image.
            const parent = imageDivs[i].parentNode;
            parent.removeChild(imageDivs[i]);
        }
    }
}


function setSideImage(count, perImageDivSize){
    sideImageNumber = count;
    removeHtmlElement(); // first remove all previous created div;
    removeHtmlElement();
    removeHtmlElement();
    removeHtmlElement();
    removeHtmlElement();
    // left side picture
    for(let i = 0; i < count; i++){
        const left = 0;
        const top = perImageDivSize * (i+1);
        const imageName = imageList[i+20];
        createDiv(top,left,imageName,20+i,perImageDivSize);
    }
    // right side picture
    for(let i = 0; i < count; i++){
        const left = perImageDivSize*9;
        const top = perImageDivSize * (i+1);
        const imageName = imageList[i+20+count];
        createDiv(top,left,imageName,20+count+i,perImageDivSize);
    }
}

function changeDivProperty(perImageDivSize, heightOfContainer){
    const imageDivs = document.getElementsByClassName("img"); /// catches every image div;
    // traverse over the all divs
    for(let i = 0; i < imageDivs.length; i++){
        // every image div height width are set.
        imageDivs[i].style.width = `${perImageDivSize}px`;
        imageDivs[i].style.height = `${perImageDivSize}px`;
        let indexNumber = parseInt(imageDivs[i].dataset.indexNumber);
        // first row image property change;
        if(indexNumber >= 0 && indexNumber <= 9){
            imageDivs[i].style.left = `${perImageDivSize * (indexNumber)}px`;
        }
        // second row image property change.
        else if(indexNumber >= 10 && indexNumber <= 19){
            //let heightOfContainer = containerDiv.offsetHeight;
            let temp = Math.round(heightOfContainer / perImageDivSize);
            imageDivs[i].style.top = `${perImageDivSize*(temp-1)}px`;
            imageDivs[i].style.left = `${perImageDivSize * (indexNumber -10)}px`;
        }
    }
    /*
        side image are depend on parent div height. so first catch parent div height
        then take decision how many image are fit in the side bar.
    */
    let temp = Math.round(heightOfContainer / perImageDivSize);
    setSideImage(temp-2,perImageDivSize); // responsive side image div create.
     
    // content dive property are change in response time.
    const content = document.getElementsByClassName("content")[0];
    content.style.margin = `${perImageDivSize}px`;
    content.style.height = `${perImageDivSize*(temp-2)}px`;
    content.style.width = `${perImageDivSize*8}px`;
}

function setImageDivProperty(){
    let containerDiv = document.getElementById("container"); // catch the parent div
    let wightOfContainer = containerDiv.offsetWidth;
    let perImageDivSize = wightOfContainer/10;
    let heightOfContainer = containerDiv.offsetHeight;

    // flag 1 means div not ceated yet, flag 2 means divs are already created;
    if(flag){
        // for first row;
        for(let i = 0; i < 10; i++){
            const left = perImageDivSize*i;
            const top = 0;
            const imageName = imageList[i];
            createDiv(top,left,imageName,i,perImageDivSize);
        }
        // for last row;
        for(let i = 0; i < 10; i++){
            const left = perImageDivSize * i;
            const top = perImageDivSize * 2;
            const imageName = imageList[i+10];
            createDiv(top,left,imageName,i+10,perImageDivSize);
        }

        // content child property are changes.
        const content = document.getElementsByClassName("content")[0]; // get content child
        content.style.margin = `${perImageDivSize}px`;
        content.style.height = `${perImageDivSize}px`;
        content.style.width = `${perImageDivSize*8}px`;
        flag = 0;
    }
    else{
        changeDivProperty(perImageDivSize, heightOfContainer);
        // id = setInterval(imageSwapAnimation, 2000);
    }
     
}

/*program start form here
every image are put in the each div. for every image div are created by javascript
----> image div are created by setImageDivproperty function;
for responsive image we can do two things.
    1. every time clear previous div and create new div;
    2. once time create new div and another time change the div attribute.
*/
setImageDivProperty();
setImageDivProperty();
clearInterval(id);
id = setInterval(imageSwapAnimation, duration);
window.addEventListener('focus', () =>{
    this.clearInterval(id);
    setImageDivProperty();
    id = setInterval(imageSwapAnimation, duration);
    setImageDivProperty();
})

window.addEventListener("resize", function(){
    this.clearInterval(id);
    setImageDivProperty(); // each time resize window, it call this function;
    id = setInterval(imageSwapAnimation, duration);
    setImageDivProperty();
})

function setDurationValue(){
    let value = document.getElementById("duration").value;
    if(isNaN(value)) return;
    if(value > 500){
        duration = parseInt(value);
        //console.log(value);
        setImageDivProperty();
        clearInterval(id);
        id = setInterval(imageSwapAnimation, duration);
        setImageDivProperty();
    }
    else{
        alert("Please give a value greater than 500!!!");
    }
    
}
function resetDurationValue(){
    duration = 2000;
    //console.log(value);
    setImageDivProperty();
    clearInterval(id);
    id = setInterval(imageSwapAnimation, duration);
    setImageDivProperty();
    //console.log(duration);
}








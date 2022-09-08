//call inputs
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let tmp;
//get total
function gettotal(){
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }else{
        total.innerHTML='';
        total.style.background='rgb(35, 25, 25);';
    }
}
//create product
let datapro;
if(localStorage.product != null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}
submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //mooooooood
    if(mood === 'create'){
        //count
        if(newpro.count>1){
            for(let i=0;i<newpro.count;i++){
                datapro.push(newpro);
            }
        }
        else{
            datapro.push(newpro);
        }
    }
    else{
        datapro[tmp]=newpro;
        mood === 'create'
        submit.innerHTML='create';
        count.style.display='block';
    }
    
    //save data in local
    localStorage.setItem('product',     JSON.stringify(datapro)   )
    console.log(datapro)
    clear()
    show()
}
// clear after click create
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    total.style.background='rgb(22, 179, 127)';
}
// read 
function show(){
    gettotal()
    let tabel='';
    for(let i=0;i<datapro.length;i++){
        tabel+=`
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick="deletee(${i})"id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=tabel;
    let btn=document.getElementById('deleteall');
    if(datapro.length>0){
        btn.innerHTML=`
        <button onclick="deleteall()" > Delete All (${datapro.length})</button>
        `
    }
    else{
        btn.innerHTML='' ;
    }
}
show()
//delete
function deletee(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    show()
}
//delete All
function deleteall(){
    datapro.splice(0)
    localStorage.clear()
    show()
}
//update
function update(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    total.innerHTML=datapro[i].total;
    count.style.display='none';
    category.value=datapro[i].category;
    submit.innerHTML='update';
    mood='update';
    tmp=i;
    gettotal()
    scroll({
        top:0,
        behavior:'smooth'
    })
}
//search
let searchmood='title';
function getsearchmood(id){
    let search =document.getElementById('search');
    if(id == 'searchtitle'){
        searchmood='title';
    }
    else{
        searchmood='category';
    }
    search.Placeholder = 'Search By '+searchmood;
    search.focus()
    console.log(search.Placeholder)
}
function searchdata(value){
    let tabel='';
    switch (searchmood) {
        case 'title':
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                tabel+=`
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick="deletee(${i})"id="delete">delete</button></td>
                </tr>
                `    
            }
        }
        break;
        case 'category':
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                tabel+=`
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick="deletee(${i})"id="delete">delete</button></td>
                </tr>
                `    
            }
        }
        break;
    }
    document.getElementById('tbody').innerHTML=tabel;
}
//clean data
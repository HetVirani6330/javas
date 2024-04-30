
let catList = JSON.parse(localStorage.getItem("catInfo"));
let tr = '<option>--Select Catgeory--</option>'
catList.map((i) => {
    tr += `<option value=${i.id}>${i.name}</option>`
})

document.getElementById('catid').innerHTML = tr;


let arr2 = []

let prodData = () => {
    let data = JSON.parse(localStorage.getItem('productInfo'));
    let pid = document.proName.pid.value;
    let cid = document.proName.catid.value;
    let name = document.proName.prName.value;
    let pprice = document.proName.price.value;
    let disc = document.proName.desc.value;

    let image = JSON.parse(localStorage.getItem('image'))


    let obj = '';

    if(cid && name && pprice  != ""){
        if (pid != '') {
            console.log("hello");
            data.map((i)=>{
                if(i.id == pid){
                    i.cid=cid, 
                    i.name = name
                    i.price = pprice
                    i.discription=disc,
                    i.image = (image!=null)?image:i.image;

                }
            })
            localStorage.setItem("productInfo",JSON.stringify(data));
            // pid = ''
        } else {
            if (data != null) {
                console.log("hello2");
                //insert
                obj = {
                    id: data.length + 1,
                    name: name,
                    price: pprice,
                    discription: disc,
                    cid: cid,
                    image:image
                }
        
                arr2 = data
            }
            else {
                //new arr push
                obj = {
                    id: 1,
                    name: name,
                    price: pprice,
                    discription: disc,
                    cid: cid,
                    image:image
                }
            }
            arr2.push(obj)
            localStorage.setItem("productInfo", JSON.stringify(arr2));
        }
    
    
       
        localStorage.removeItem("image")
        document.proName.pid.value = "" 
        document.proName.prName.value = ""    
        document.image.src = ""
        document.proName.reset()
    
        disCat()
    }

}

let disCat = () => {
    id = document.proName.pid.value
    document.getElementById("btn").innerHTML=(id!="")?"Update":"Submit";
    let data = JSON.parse(localStorage.getItem('productInfo'));
    let catdata = JSON.parse(localStorage.getItem('catInfo'));
    let tr = ''
    data.map((i) => {
        catdata.filter((j) => {
            if (j.id == i.cid) {
                return i.proname = j.name;
            }
        })
        tr += `
            <tr>
                <td>${i.id}</td>   
                <td><img src="${i.image}" alt="" width=100 height=80></td> 
                <td>${i.proname}</td>  
                <td>${i.name}</td>
                <td>${i.price}</td> 
                <td>
                <a href="#"  class="btn btn-success" onclick="editData(${i.id})">Edit</a>
                <a href="#"  class="btn btn-danger" onclick="delData(${i.id})">Delete</a>
                </td>
            </tr>
        `
    })
    document.getElementById("dispData").innerHTML = tr;
}

let delData = (id) => {
    let data = JSON.parse(localStorage.getItem('productInfo'));
    data.splice(id - 1, 1);
    let k = 1  

    data.map((i) => {
        i.id = k++
    })

    localStorage.setItem("productInfo", JSON.stringify(data));
    disCat()

}


let editData=(id)=>{
    let data = JSON.parse(localStorage.getItem('productInfo'));
    let cat = data.filter((i)=>{
        return i.id == id
    }) 
    document.proName.pid.value=cat[0].id;
    document.proName.prName.value=cat[0].name;
    document.proName.price.value=cat[0].price
    document.proName.catid.value =cat[0].cid;
    document.proName.desc.value  = cat[0].discription ;
    document.image.src = cat[0].image;

    id = document.proName.pid.value
    document.getElementById("btn").innerHTML=(id!="")?"Update":"Submit";


    
}

const showImage = (e)=>{
    var input =  e.target
    var image = document.getElementById('preview');
    if (input.files && input.files[0]) {
       var reader = new FileReader();
       reader.onload = function(e) {
          image.src = e.target.result;
          localStorage.setItem("image",JSON.stringify(e.target.result))
       }
       reader.readAsDataURL(input.files[0]);
    }
}


disCat()



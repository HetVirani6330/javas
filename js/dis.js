let disCart = () => {
    let cartData = JSON.parse(localStorage.getItem("cartData"))
    let tr = ''
    let total=0
    let tt =""
    cartData.map((i) => {
        tr += `
        <tr class="table_row">
        <td class="column-1">
            <div class="how-itemcart1">
                <img src="${i.image}" alt="IMG">
            </div>
        </td>
        <td class="column-3">${i.name}</td>
        <td class="column-3">$ ${i.price}</td>
        <td class="column-4">
            <div class="wrap-num-product flex-w m-l-auto m-r-0 txt-center d-flex  justify-content-center">
                <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product1" value="${i.qty}">
            </div>
        </td>
        <td class="column-1">$ ${i.totel}</td> 
        <th style="width="100px"; margin-left:20px;"><button type="button" class="btn btn-danger" onclick="delData(${i.id})">Delet</button></th>
    </tr>
        `

        total+=i.totel

    }
)
    document.getElementById("showCart").innerHTML = tr;
        tt+=`<span class="mtext-110 cl2" >
                $${total}
        </span>`
document.getElementById("total").innerHTML = tt;
document.getElementById("total1").innerHTML = tt;


}

let delData = (i) => {
    let cartData = JSON.parse(localStorage.getItem("cartData"))
    cartData.splice(i.id - 1, 1);
    let k = 1  

    cartData.map((i) => {
        i.id = k++
    })

    localStorage.setItem("cartData", JSON.stringify(cartData));
    disCart()

}

disCart()
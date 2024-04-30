
let catInf = JSON.parse(localStorage.getItem('catInfo'));
let product = JSON.parse(localStorage.getItem('productInfo'));

let tr = `<button class="stext-106 cl6 hov1 bor3 trans-04  m-r-32 m-tb-5" data-filter="*">
All product
</button>`

catInf.map((i) => {
    tr += `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" how-active1 data-filter=".${i.name}">
    ${i.name}
</button>`
})
document.getElementById("CaName").innerHTML = tr

let th = ''
catInf.map((i) => {
    product.filter((j) => {
        if (i.id == j.cid) {
            th += `<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${i.name}">
        <!-- Block2 -->
        <div class="block2">
            <div class="block2-pic hov-img0">
                <img src="${j.image}" alt="IMG-PRODUCT" height="400px" width="190px">
    
                <a href="#"
                    class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" onclick="addCart(${j.id})">
                    Add to cart
                </a>
            </div>
    
            <div class="block2-txt flex-w flex-t p-t-14">
                <div class="block2-txt-child1 flex-col-l ">
                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        ${j.name}
                    </a>
    
                    <span class="stext-105 cl3">
                        $${j.price}
                    </span>
                </div>
    
                <div class="block2-txt-child2 flex-r p-t-3">
                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                        <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png"
                            alt="ICON">
                        <img class="icon-heart2 dis-block trans-04 ab-t-l"
                            src="images/icons/icon-heart-02.png" alt="ICON">
                    </a>
                </div>
            </div>
        </div>
    </div>`
        }
    })

})
document.getElementById('prinfo').innerHTML = th;

let cart = []
let addCart = (id)=>{
    let cartData = JSON.parse(localStorage.getItem("cartData"))
    let image = ""
    let price =""
    let name = ''
    let obj={}
    product.filter((i)=>{
        if(i.id == id){
            image=i.image
            price=i.price
            name=i.name
        }
    })

    if (cartData != null) {

        let ans = cartData.filter((i)=>{
            return i.id==id
        })
        if (ans.length > 0) {
            cartData.map((i)=>{
                if(i.id  == id){
                    i.qty += 1
                    i.totel=i.totel+i.price
                }
            })
        } else {
            obj={
                cartId:cartData.length+1,
                id:id,
                image:image,
                price:parseInt(price),
                name:name,
                qty:1,
                totel:parseInt(price)   
            }
            cartData.push(obj);
        }
        localStorage.setItem("cartData",JSON.stringify(cartData))
    
        
    } else {
        obj={
            cartId:1,
            id:id,
            image:image,
            price:parseInt(price),
            name:name,
            qty:1,
            totel:parseInt(price)      

        }
        cart.push(obj)
        localStorage.setItem("cartData",JSON.stringify(cart))
    }
}
disCart()


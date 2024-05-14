export function CartList(){
    const bought = [];
    const items = bought.map((item)=>{
        return(
            <CartList key = {item.id}></CartList>
        )
    })
    return(
        <div className = "cartContainer">
            {items}
        </div>
    )
}
export function CartItem({info}){

}
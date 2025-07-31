import Product from './product.jsx'

export default function ProductTab(){
     let products=["logitech Mx master 35","apple Pencil (2en Gen)","Zebronics zeb-tranceformr","Portronics Toad 23 Wireless Mouse"]
     
    return(
        <><div style={{display:'flex',flexDirection:'row'}}>
            <Product item={products[0]} idx={0}/>
        <Product item={products[1]} idx={1}/>
        <Product item={products[2]} idx={2}/>
        <Product item={products[3]} idx={3}/>

        </div>
        
        </>
    )
}
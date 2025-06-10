function bunHandler(event){
    console.log('hey its working')
    // console.log(event)
    event.preventDefault();
}


function Product({item, idx}) {
    let description=[
        ["5200Dp","5programable button"],["insenstive touch surface ","Desined for iPad Pro"],["intantive touch Surface","Designed for ipad pri"],["Sirless mouse z4Shz ","optical orintation"]
     ]
     let price=['1231','454','4544','4545']
     let newPrice=['454','54244','85745','5684']
    return (
        <div className="card" style={{ textAlign: "center" ,border:"1px solid black", borderRadius:'25px',margin:'0.2rem',padding:'0px 5px 0px 5px '}}>
            <h3>{item}</h3>
            <span onMouseOver={bunHandler}>{description[idx][0]}<br/>  {description[idx][1]}</span><br /><br />
            <button onClick={bunHandler}>button</button>
            <form action="">
                <input type="text" />
                <button onClick={bunHandler}>submit</button>
            </form>
            <div>
                <div style={{ backgroundColor: "yellow", borderBottomRightRadius:"25px",borderBottomLeftRadius:"25px"}}>
                    <span style={{ textDecoration: "line-through" }}>{"$"+price[idx]}</span>  {"$"+newPrice[idx]}
                </div>
            </div>
            {/* <div >
                <span >{price}</span> {newPrice}
            </div> */}

        </div>
    )
}
export default Product;
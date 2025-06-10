import './Amazoncard.css'
function CardComponent({ item, feature, features, price, newPrice }) {

    return (
        <div className="card" style={{ textAlign: "center" }}>
            <h3>{item}</h3>
            <p>{feature}</p>
            <p>{features}</p>
            <div style={{ backgroundColor: "yellow"}}>
                <span style={{ textDecoration: "line-through" }}>{price}</span> {newPrice}
            </div>
        </div>
    )
}
export default CardComponent
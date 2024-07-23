import { useNavigate } from "react-router-dom"

const Card = ({ incident }) => {
    const navigate = useNavigate()

    return (
        <div className="card w-72 bg-base-100 shadow-xl" onClick={() => {
            navigate(`/eventpage/${incident._id}`)
        }}>
            <figure><img src={incident?.thumbnail} alt="Shoes" /></figure>
            <div className="card-body px-4 py-4">
                <h2 className="card-title">{incident?.address?.city},{incident?.address?.state}</h2>
                <p>Volunteers needed</p>
                <div className="card-actions justify-end">
                    {/* <button className="btn btn-primary">Buy Now</button> */}
                </div>
            </div>
        </div>
    )
}

export default Card

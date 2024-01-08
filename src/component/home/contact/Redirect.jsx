import './redirect.css'
const Redirect=()=>{
    return(
        <div className="container">
                <button type="submit" className='btn'>Submit
                </button>
                <div className="popup">
                    <img src="tick.png" alt="" />
                    <h2>Thank You!</h2>
                    <p>Submited ! Our Team will Contact You Shortly !</p>
                    <button type='button'>OK</button>
                </div>
        </div>
    )
}
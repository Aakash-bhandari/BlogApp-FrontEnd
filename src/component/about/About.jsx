import './about.css'
const About = () => {
    return (
        <>
            <title>About Us Section</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
                rel="stylesheet"
                href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            />
            <link rel="stylesheet" type="text/css" href="css/style.css" />
            <div className="section">
                <div className="dabba">
                    <div className="content-section">
                        <div className="title">
                            <h1 className='header'>About Us</h1>
                        </div>
                        <div className="content">
                            <h3> Welcome to blog page !!  We're glad and grateful you're here.
                            </h3>
                            <p>
                            Blog page  exists to provide a trusted development ecosystem for bloging.
                             We are honored to help folks at all stages of their journey make progress toward new levels of success.
                              Whether you're an aspiring blogger we're here for you  !!
                            </p>
                            <div className="button">
                                <a href="#">Read More</a>
                            </div>
                        </div>
                        <div className="social">
                            <a href="#">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="#">
                                <i className="fab fa-instagram" />
                            </a>
                        </div>
                    </div>
                    <div className="image-section">
                        <img src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png" />
                    </div>
                </div>
            </div>
        </>

    )
}
export default About;
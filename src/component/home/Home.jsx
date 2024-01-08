import { Grid } from "@mui/material";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/posts";
import { useSearchParams,useParams } from "react-router-dom";
const Home = () => {
    const [searchParams] = useSearchParams();
    // const username = searchParams.get('username')
    const {username}=useParams();

    return (
        <>
            <Banner />
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts username={username}/>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;
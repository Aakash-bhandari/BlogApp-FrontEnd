import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import { getAllPosts } from '../../../service/api';
import { API } from '../../../service/api.js';

//components
import Post from './post';
const Posts = ({ username }) => {
    const navigate = useNavigate();
    const onClickch = (post_id) => {
        navigate(`/details/${post_id}`);
    }
    const data = {
        username: username
    }
    const [posts, getPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    useEffect(() => {
        if (username == undefined) {
            const fetchData = async () => {
                let response = await API.getAllPosts({ category: category || '' });
                if (response.isSucces) {
                    setTimeout(() => {
                        getPosts(response.data);
                        setLoading(false);
                    }, 2000);
                }
            };
            fetchData()
        }
    }, [category, username]);

    useEffect(() => {
        if (username != undefined) {
            const fetchData = async () => {
                let response = await API.getUserAllposts(data);
                if (response.isSucces) {
                    getPosts(response.data);
                    setLoading(false);
                }
            };
            fetchData()
        }
    }, [category, username]);



    return (
        <>
            {loading ? (
                // Loading GIF or any other loading indicator
                <>
                    <iframe src="https://giphy.com/embed/ZO9b1ntYVJmjZlsWlm" width="480" height="360"  frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </>
            ) : (
                // Render posts or no data message
                <>
                    {posts?.length ? (
                        posts.map(post => (
                            <Grid item lg={3} sm={4} xs={12} key={post._id}>
                                <div style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }} onClick={() => onClickch(post._id)}>
                                    <Post post={post} />
                                </div>
                            </Grid>
                        ))
                    ) : (
                        <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                            No data is available for selected category
                        </Box>
                    )}
                </>
            )}
        </>
    );
}

export default Posts;
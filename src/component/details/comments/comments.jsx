import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { DataContext } from '../../../context/DataProvider';
import Comment from './comment';
import { API } from '../../../service/api';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

export const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const { account } = useContext(DataContext);



    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSucces) {
                setComments(response.data);
            }
        }
        getData();
    }, [toggle, post]);



    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async () => {
        await API.newComment(comment);
        toast.success("Comment Added..")
        setComment(initialValue)
        setToggle(prev => !prev);
    }

    return (
        <Box>
            <Container>
                <ToastContainer />
                <Image src={url} alt="_user" srcset="" />
                <StyledTextArea
                    rowsMin={5}
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)}
                    value={comment.comments}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} key={comment._id} />
                    ))
                }
            </Box>
        </Box>
    )
}
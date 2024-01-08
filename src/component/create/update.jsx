import React, { useState, useEffect } from 'react';

import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { EditorState, RichUtils, convertFromHTML, ContentState } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
}

const Update = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('');

    const { id } = useParams();

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    //////

    //////
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSucces) {
                const updatedPost = {
                    ...initialPost, // Maintain the initial structure
                    ...response.data // Update with response data
                };
                setPost(updatedPost);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    post.picture = response.data;
                    setImageURL(response.data);
                }
            }
        }
        getImage();
    }, [file]);




    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        if (post.description !== '') {
            const contentBlock = convertFromHTML(post.description);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [post.description]);
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setPost({ ...post, description: html });
    }, [editorState]);

    const updateBlogPost = async () => {
        console.log("post", post);
         await API.updatePost(post);
        navigate(`/details/${id}`);
    }

    console.log(post);
    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" />
                <Button onClick={() => updateBlogPost()} variant="contained" color="primary">Update</Button>
            </StyledFormControl>

            {/* <StyledTextArea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
                value={post.description}
            /> */}

            <Editor
                name="description"
                rowsMin={5}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                    inline: {
                        inDropdown: true,
                        options: ['bold', 'italic', 'underline'],
                    },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                        defaultSize: {
                            width: '50vh%',
                            height: '50vh',
                        },
                        //uploadCallback: this.uploadFile,
                        alt: { present: true, mandatory: false },
                        previewImage: true,
                        inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    },
                    heading: {
                        options: ['h1', 'h2', 'h3'], // Include only the heading options you want to keep
                    },
                }}

            />
        </Container>
    )
}

export default Update;
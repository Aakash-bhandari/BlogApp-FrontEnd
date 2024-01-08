import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api'
import { EditorState, RichUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { PostValidation } from '../../utils/common_utils';
import { ToastContainer, toast } from 'react-toastify';
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

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
// const Textarea = styled(Editor)`
//     width: 100%;
//     border: none;
//     margin-top: 50px;
//     &:focus-visible {
//         outline: none;
//     }
// `;
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const Createpost = () => {
    const URL = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file])

    const savePost = async () => {
        const validate = await PostValidation(post);
        if(validate.isError){
            toast.error(validate.msg);
            return;
        }
        let response = await API.createPost(post);
        if (response.isSucces) {
            navigate('/');
        }

    }

    const [convertedContent, setConvertedContent] = useState(null);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setPost({ ...post, description: html});
    }, [editorState]);

    return (
        <Container>
            <Image src={URL} alt="banner" />
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
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            {/* <Textarea
                rowsMin={5}
                //placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)}
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
            <ToastContainer/>
        </Container>
    )
}

export default Createpost;
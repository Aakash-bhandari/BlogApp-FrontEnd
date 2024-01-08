import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 600px) {
        height: 40vh;
    }
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1;

    @media (max-width: 600px) {
        font-size: 50px;
    }
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

const Banner = () => {
    return (
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Taking every content to reality</SubHeading>
        </Image>
    );
};

export default Banner;

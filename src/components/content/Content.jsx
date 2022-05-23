import { Box, Chip, Container, Collapse, Grid, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import './content.css'
const Content = ({ user }) => {

    const [title, setTitle] = useState('') // State chứa title
    const [tags, setTags] = useState(''); // State chứa tên tags
    const [checked, setChecked] = useState(false)
    console.log(tags);

    // Array chứa mã màu CHip
    let chip = [
        { labela: 'lavender', color: '#E6E6FA' },
        { labela: 'Thistle', color: '#D8BFD8' },
        { labela: 'Plum', color: '#DDA0DD' },
        { labela: 'LightSalmon', color: '#FFA07A' },
        { labela: 'PapayaWhip', color: '#FFEFD5' },
        { labela: 'Moccasin', color: '#FFE4B5' },
        { labela: 'PaleGreen', color: '#98FB98' },
        { labela: 'LightCyan', color: '#E0FFFF' },
        { labela: 'LightBlue', color: '#ADD8E6' },
        { labela: 'Bisque', color: '#FFE4C4' },
        { labela: 'Snow', color: '#FFFAFA' },
    ]

    // Sự kiện Tags
    const handleClickChip = (items) => {
        setTags(items.labela);
    }
    // Sự kiện Checked
    const handleCheck = () => {
        setChecked((prev) => !prev)
    }

    useEffect(() => {
        fetchApi('http://localhost:8000/post')
            .then((data) => {

            })
    }, [])
    // Tạo Proime xử lí bđb
    const fetchApi = async (url, body) => {
        const response = await fetch(url, body);
        const data = await response.json();
        return data
    }

    return (
        <Container maxWidth='xl'>
            <Typography variant="h4" padding={5} textAlign='center'> SEAGAME 2022 </Typography>
            <Grid container className="content_infonTag">
                <Grid item>
                    <Typography variant="h5"  > kinggoro </Typography>
                    <Typography variant="p"  > Createed_at: 22/05/2022 </Typography>
                </Grid>
                <Grid item width='28%'>
                    {
                        chip.map((items, index) => {
                            return <Chip label={items.labela}
                                sx={{ color: '#99', background: items.color, fontSize: '12px', margin: '3px' }}
                                variant="outlined"
                                size="small"
                                clickable={true}
                                onClick={() => handleClickChip(items)}
                                key={index}
                            />
                        })
                    }
                </Grid>
            </Grid>
            <Typography padding={2}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore suscipit neque molestiae! Odio dolorem sit laboriosam dolor ab, sint, veritatis porro consectetur at sapiente facere architecto, quos unde itaque. Neque.</Typography>
            <Box>
                <Button
                    onClick={handleCheck}
                    sx={{ fontSize: '10px' }}
                > 2 replies
                </Button>
                <hr />
                <Box sx={{ display: 'flex' }}>     
                    <Collapse in={checked} > Việt Nam chiến thắng </Collapse>
                </Box>
            </Box>
        </Container>
    )
}

export default Content
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/header/Header"


const SignUp = () => {
    let navigation = useNavigate();
    const [username, setUserName] = useState(''); // State tài khoản
    const [password, setPassword] = useState(''); // State password
    const [name, setName] = useState(''); // State name
    const [dob, setDob] = useState('') // State birthday
    const [usernameExist, setUserNameExist] = useState('') // State dùng nó để check user có trùng hay không
    // Tạo object chứa Toastify
    let alert = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
    }

    useEffect(() => {

    }, [username, usernameExist])

    // Sự kiện đăng kí form
    const handleSignUp = () => {
        let validate = validateForm();
        if (validate) {
            //  Call Api gửi request lên sever
            fetchApi('http://localhost:8000/user', body)
                .then((data) => {
                    console.log(data);
                    toast.success('Tạo tài khoản thành công!, trình duyệt quay lại trang Đăng nhập trong 3s sau ', alert);
                    setTimeout(() => {
                        navigation('/login')
                    }, 3000);
                })
                .catch((error) => { console.log(error); toast.error('Tạo thất bại, vui lòng thử lại', alert) })
        }
    }
    // tạo biến thu thập toàn bộ dữ liệu từ form
    let objectCreate = {
        username: username,
        password: password,
        name: name,
        dob: dob
    }
    // Tạo body cho method POST
    let body = {
        method: 'POST',
        body: JSON.stringify(objectCreate),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }

    // Tiến hành Validate Form
    const validateForm = () => {
        // Gọi để lấy username của người dùng để check username có tồn tại không
        fetchApi(`http://localhost:8000/user?username=${username}`)
            .then((data) => {
                setUserNameExist(data.data[0].username)
            })


        let check = true
        if (username === '') {
            toast.warn('Chưa điền Username', alert);
            return false
        }
        if (username === usernameExist) {
            toast.error('Username đã tồn tại', alert)
            return false
        }
        if (password === '') {
            toast.warn('Chưa điền Password', alert);
            return false
        }
        if (name === '') {
            toast.warn('Chưa điền Name', alert);
            return false
        }
        return check
    }

    // Tạo Proime xử lí bđb
    const fetchApi = async (url, body) => {
        const response = await fetch(url, body);
        const data = await response.json();
        return data
    }
    return (
        <>
            <Header />
            <Container maxWidth='xl'>
                <Box className="login_">
                    <Stack spacing={2} className="login_stack">
                        <Typography variant="h5" textAlign='center'> Đăng kí tài khoản </Typography>
                        <TextField variant="outlined" label='Username' value={username} onChange={(e) => setUserName(e.target.value)} />
                        <TextField variant="outlined" label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField variant="outlined" label='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        {/* Date */}
                        <TextField
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            id="date"
                            label="Birthday"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Grid container justifyContent='flex-end'>
                            <Button variant="contained" className="login_button" sx={{ width: '150px' }} onClick={handleSignUp} > Đăng kí </Button>
                        </Grid>
                    </Stack>
                </Box>
            </Container>
            <ToastContainer />
        </>
    )
}

export default SignUp
import { Container, Grid, TextField, Box, Stack, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../components/header/Header"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = ({ user, setUser }) => {
    const [showPassword, setShowPassWord] = useState(false); // Tạo state ẩn hiện password
    const [userNameLogin, setUserNameLogin] = useState('') // Tạo state cho tài khoản
    const [passWordLogin, setPassWordLogin] = useState('') // Tạo state cho mật khẩu
    const [checkUsername, setCheckUserName] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    // Tạo object chứa Toastify
    let alert = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
    }

    // Tạo navigate
    let navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassWord(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        // Mục đích: load ra đầu tiên để lấy Exist check mật khẩu và tài khoản, 
        // depen: cần update liên tục 2 biến username và password  trường hợp client điền kí tự nào trước và sửa lại thì nó tự update lại để check liên tục vs API
        // VD: KH điền 123, API check ko có 123, nhưng khi KH điền ntd (ntd kết quả đúng) thì API check đúng nhưng vẫn false vì username chưa update, nó còn lưu lại 123
        fetchApi(`http://localhost:8000/user?limit=&username=${userNameLogin}`)
            .then((data) => {
                setCheckUserName(data.data[0].username);
                setCheckPassword(data.data[0].password);
            })
        
    }, [userNameLogin, passWordLogin])

    const handleSignIn = () => {
        let validate = Validate();
        if (validate) {
            // Gọi để lấy username của người dùng để check username và password

            fetchApi(`http://localhost:8000/user?limit=&username=${userNameLogin}&password=${passWordLogin}`)
                .then((data) => {
                    console.log(data);
                    setUser(data);
                    sessionStorage.setItem('data', JSON.stringify(data))
                    // Hiển thị alert
                    toast.success('Đăng nhập thành công', alert)
                    // sau 2s chuyển qua homepage
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Đăng nhập thất bại', alert)
                })
        }
    }

    // Validate thông tin
    const Validate = () => {

        let check = true
        if (userNameLogin === '') {
            toast.warn('Chưa nhập username', alert)
            return false
        }
        if (passWordLogin === '') {
            toast.warn('Chưa nhập password', alert)
            return false
        }
        if (userNameLogin !== checkUsername) {
            toast.error('Username hoặc password chưa đúng, vui lòng thử lại', alert)
            return false
        }
        if (passWordLogin !== checkPassword) {
            toast.error('Username hoặc password chưa đúng, vui lòng thử lại', alert)
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
                <Box className="login_" >
                    <Stack spacing={2} className="login_stack">
                        <Typography textAlign='center' variant="h5" >Đăng nhập tài khoản</Typography>
                        <TextField label="Username" variant="outlined" fullWidth value={userNameLogin} onChange={(e) => setUserNameLogin(e.target.value)} />
                        {/* Password */}
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={passWordLogin}
                                onChange={(e) => setPassWordLogin(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        {/* Đăng nhập */}
                        <Button variant="contained" className="login_button" onClick={handleSignIn}>Đăng nhập</Button>
                    </Stack>
                </Box>
                <Typography padding={2} textAlign='center' fontSize={15}> Do you have an account ?
                    <Link to={'/signup'}>
                        <Button sx={{ textTransform: "none" }}>
                            Sign up here
                        </Button>
                    </Link>
                </Typography>
                <ToastContainer />
            </Container>
        </>
    )
}

export default Login
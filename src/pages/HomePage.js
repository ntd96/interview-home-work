import { Typography } from "@mui/material"
import Content from "../components/content/Content"
import Header from "../components/header/Header"

const HomePage = ({user, setUser}) => {
    return (
        <>
            <Header user={user} setUser={setUser} />
            <Content user={user} />
        </>
    )
}

export default HomePage
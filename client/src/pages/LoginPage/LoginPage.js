import React from 'react';
import Login from "../../components/authentication/Login";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid} from "@material-ui/core";
import teamImg from "../../static/images/team.png"
import Register from "../../components/authentication/Register";

const useStyles = makeStyles(() => ({
    image: {
        backgroundImage: `url(${teamImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflowX: "hidden",
        overflowY: "hidden",
    },
}));


const LoginPage = () => {
    const classes = useStyles();
    const [optionLogin, setOptionLogin] = React.useState(true)

    return (
        <div className={classes.image}>
            <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '100vh'}}
            >
                <Grid item>
                    {optionLogin?
                        <Login/>
                    :
                       <Register/>}
                </Grid>
                <Grid item>
                    <Button variant={"contained"}
                    onClick={() => {setOptionLogin(!optionLogin)}}>
                        {optionLogin ?
                            "No account? Register now!" :
                            "Go to login page!"
                        }
                    </Button>
                </Grid>
            </Grid>
        </div>
    )

};

export default LoginPage;

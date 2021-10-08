import React from 'react';
import {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress} from "@material-ui/core";
import UserDataTable from "./UserDataTable";
import UserSkills from "./UserSkills";
import {useParams} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import image from '../../static/images/avatar.jpg'
import {Image, Transformation} from "cloudinary-react";
import {UserContext} from "../../components/Store/Store";
import UserPageBar from './UserPageBar';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },

    avatarSize: {
        width: theme.spacing(25),
        height: theme.spacing(25)
    }
}));

const UserPage = () => {


    const classes = useStyles();
    var {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUser, setLoadedUser] = useState([]);
    const [skills, setSkills] = useState([]);
    const [state, dispatch] = React.useContext(UserContext);


    useEffect(() => {
        setIsLoading(true);
        fetch(`https://localhost:5001/api/user/${id}`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedUser(data);
                setSkills(data.mySkills);
            });
    }, [id]);


    function createData(name, property) {
        return {name, property};
    }

    const rows = [
        createData("Id", loadedUser.id),
        createData("Name", loadedUser.firstName),
        createData("Lastname", loadedUser.lastName),
        createData("e-mail", loadedUser.email)
    ];

    if (isLoading || state.active === false) {
        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    User Page Loading...
                    <CircularProgress/>
                </Typography>
            </div>
        );
    }

    return (

        <div>
            <UserPageBar loadedUser={loadedUser} loggedUser={state.user} setLoadedUser={setLoadedUser}/>

            {loadedUser.logo ?
                <Avatar className={classes.avatarSize}>
                    <Image publicId={loadedUser.logo}>
                        <Transformation gravity="face" height="200" width="200" crop="fill" />
                    </Image>
                </Avatar>
                :
                <Avatar src={image} className={classes.avatarSize}/>
            }
            <UserDataTable rows={rows} classes={classes}/>

            <UserSkills loadedUser={loadedUser} skills={skills} setSkills={setSkills} classes={classes}
                        loggedUser={state.user}/>

        </div>
    )
}


export default UserPage;
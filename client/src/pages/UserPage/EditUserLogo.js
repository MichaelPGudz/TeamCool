import React from "react";
import {
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@material-ui/core";
import {Edit, PhotoCamera} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {UserContext} from "../../components/Store/Store";
import IconButton from "@material-ui/core/IconButton";


export default function EditUserLogo({setLoadedUser}) {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [state, dispatch] = React.useContext(UserContext);
    const [logo, setLogo] = React.useState("");
    const [logoPreview, setLogoPreview] = React.useState("");
    const [logoAdded, setlogoAdded] = React.useState(false);
    const [sending, setSending] = React.useState(false);


    const handleBtnClick = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSending(true);
        const data = new FormData();
        data.append('file', logo);
        data.append('cloud_name', 'teamcool');
        data.append("upload_preset", "teamlogo")
        fetch("  https://api.cloudinary.com/v1_1/teamcool/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                addLogoOnServer(data.public_id);
                setSending(false);
                setLogo("");
                setLogoPreview("");
                setOpenDialog(false);
            })
            .catch(err => console.log(err))
    }

    const addLogoOnServer = (logo) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify({firstName: state.user.firstName, lastName: state.user.lastName, logo: logo})
        };
        fetch(`https://localhost:5001/api/user/${state.user.id}/logo`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoadedUser(data);
                dispatch({type: "editUserLogo", payload: {id: data.id, logo: data.logo}})
            })
            .catch(err => console.log(err))
    }

    const addLogo = (event) => {
        let image = event.target.files[0]
        setLogo(image);
        setLogoPreview(URL.createObjectURL(image));
        setlogoAdded(true);
    }

    return (
        <div>
            <ListItem button
                      onClick={handleBtnClick}>
                <ListItemAvatar>
                    <Avatar>
                        <Edit/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"Edit logo"}/>
            </ListItem>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"edit-logoPreview-form"}>
                <DialogTitle id={"edit-logoPreview-form"}>Edit logo</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent style={{textAlign: "center"}}>
                        {logoAdded ?
                            <img src={logoPreview} alt={"No image"} style={{height: '35%', width: '35%'}}/>
                            :
                            <div style={{textAlign: "center"}}>
                                <input accept="image/*"
                                       id="icon-button-file"
                                       type="file"
                                       onChange={addLogo}
                                       style={{display: "none"}}/>
                                <label htmlFor="icon-button-file">
                                    <IconButton aria-label="upload picture"
                                                component="span">
                                        <PhotoCamera fontSize={"large"}/>
                                    </IconButton>
                                </label>
                            </div>
                        }
                        { sending ?
                        <CircularProgress/>
                        :
                        null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}
                                variant="contained"
                                type={'submit'}
                                size={'large'}>
                            Send
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function getModalStyle() {
    const top = 50;
    const left = 20;

    return {
        top: `${top}%`,
        left: `${left}%`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    useEffect(() => {
        fetch(`https://localhost:5001/api/skill/${props.id}/users`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedUsers(data);
            });
    }, [props]);

    const [isLoading, setIsLoading] = useState(true);
    const [loadedUsers, setLoadedUsers] = useState([]);



    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Users below has the same skill</h2>
            <List>
                {loadedUsers.map(({ id, firstName, lastName }) => (
                    <React.Fragment key={id}>
                        <ListItem button>
                            <ListItemText primary={id + " " + firstName} secondary={lastName} />
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
            <button type="button" onClick={handleClose}>
                Close Modal
            </button>
        </div>
    );

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
import React from "react";
import Button from "@material-ui/core/Button";
import {AddCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Grid
} from "@material-ui/core";
import AddChildTeam from "./AddChildTeam";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(() => ({
    shape: {
        maxWidth: "100%"
    },
    dialogSize: {
        maxWidth: '65%',
        width: '100%',
        maxHeight: '85%',
        height: '100%',
        overflowX: 'auto'
    },
    gridChildren: {
        height: '100%',
        maxHeight: '100%',
        overflowY: "auto",
        overflowX: "hidden"
    }
}))

export default function AddChildTeamDialog({members}) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [nbOfNewChildTeam, setNbOfNewChildTeam] = React.useState([{id: 1, ready: false}]);

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleAddOneMoreTeam = () => {
        let newId = nbOfNewChildTeam.length + 1;
        setNbOfNewChildTeam([...nbOfNewChildTeam, {id: newId, ready: false}]);
    }

    return (
        <div>
            <Button
                size={'large'}
                className={classes.shape}
                fullWidth
                onClick={() => {
                    setOpenDialog(true)
                }}
            >
                <AddCircle/>
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"addChildTeam"}
                classes={{paper: classes.dialogSize}}>
                <DialogTitle>
                    Add Child Team
                </DialogTitle>
                <DialogContent>
                    <Grid container className={classes.gridChildren} spacing={1} direction={"row"}>
                        {nbOfNewChildTeam.map((childTeam) => (
                            <React.Fragment key={'addNewChildTeams' + childTeam.id}>
                                <Grid item className={classes.gridChildren} xs>
                                    <AddChildTeam members={members}/>
                                </Grid>
                                <Grid item>
                                    <Divider orientation="vertical" flexItem className={classes.gridChildren}/>
                                </Grid>
                            </React.Fragment>
                        ))}
                        {nbOfNewChildTeam.length < 6 ?
                            <Grid item xs>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    className={classes.gridChildren}
                                >
                                    <Grid item xs={12}>
                                        <Button fullWidth>
                                            <AddCircle
                                                style={{fontSize: 40}}
                                                onClick={handleAddOneMoreTeam}/>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            :
                            null
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        type={'button'}
                        size={'large'}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        size={'large'}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}
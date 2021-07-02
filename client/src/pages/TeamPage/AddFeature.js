import React,  from "react";
import Button from "@material-ui/core/Button";
import {AddCircle} from "@material-ui/icons";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";




export default function AddFeature({updateFeatures, features}) {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [name, setName] = React.useState();
    const [url, setUrl] = React.useState();


    const handleAddBtnClick = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFeature = {id: 1, name: name, url: url};
        updateFeatures([...features, newFeature]);
    }


    return (
        <div>
            <Button
                variant="contained"
                size={'large'}
                endIcon={<AddCircle/>}
                onClick={handleAddBtnClick}
            >
                Add feature
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"add-feature-form"}>
                <DialogTitle id={"add-feature-form"}>Add feature</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2} direction={"column"}>
                            <Grid item>
                                <TextField
                                    id={'name'}
                                    label={'Name'}
                                    onChange={e => setName(e.target.value)}
                                    fullWidth
                                    variant={'outlined'}/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id={'url'}
                                    label={'Url'}
                                    onChange={e => setUrl(e.target.value)}
                                    fullWidth
                                    variant={'outlined'}/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}
                                variant="contained"
                                type={'submit'}
                                size={'large'}>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
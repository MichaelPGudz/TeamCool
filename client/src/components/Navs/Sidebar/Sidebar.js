import React from 'react';
import clsx from 'clsx';
import {useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {ExpandLess, ExpandMore, PeopleAlt, PeopleAltOutlined, Settings} from "@material-ui/icons";
import {Avatar, Collapse} from "@material-ui/core";
import {Link} from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton'
import {UserContext} from "../../Store/Store";
import {Image, Transformation} from "cloudinary-react";


function Sidebar({addedClasses, openDrawer, menuClick}) {
    const classes = addedClasses;
    const theme = useTheme();
    const [openMyTeams, setOpenMyTeams] = React.useState(false);
    const [state, dispatch] = React.useContext(UserContext);


    const handleMyTeamsClick = () => {
        setOpenMyTeams(!openMyTeams);
    }

    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: openDrawer,
                    [classes.drawerClose]: !openDrawer,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: openDrawer,
                        [classes.drawerClose]: !openDrawer,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={menuClick}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button key={"My Teams"} onClick={handleMyTeamsClick}>
                        <ListItemIcon><PeopleAlt/></ListItemIcon>
                        <ListItemText primary={"My Teams"}/>
                        {openMyTeams ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={openMyTeams} timeout={"auto"} unmountOnExit>
                        <List>
                            {!state.active ?
                                <ListItem button className={classes.nested}>
                                    <Skeleton width={240} height={48} animation={'wave'}/>
                                </ListItem>
                                :
                                state.user.myTeams.map(({id, role, team}) => (
                                    <ListItem button className={classes.nested} key={id} component={Link}
                                              to={`/team/${team.id}`}>
                                        {team.logo ?
                                            <ListItemIcon>
                                                <Avatar style={{
                                                    width: theme.spacing(3),
                                                    height: theme.spacing(3),
                                                }}>
                                                    <Image publicId={team.logo}>
                                                        <Transformation width="24" height="24" crop="fill"/>
                                                    </Image>
                                                </Avatar>
                                            </ListItemIcon>
                                            :
                                            <ListItemIcon>
                                                <PeopleAltOutlined/>
                                            </ListItemIcon>
                                        }
                                        <ListItemText primary={team.name} secondary={role.name}/>
                                    </ListItem>
                                ))}
                        </List>
                    </Collapse>
                </List>
                <Divider/>
                <List>
                    <ListItem button key={"Settings"}>
                        <ListItemIcon><Settings/></ListItemIcon>
                        <ListItemText primary={"Settings"}/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}

export default Sidebar;

import React, {useEffect} from "react";
import {
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Switch
} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import {Image, Transformation} from "cloudinary-react";
import {UserContext} from "../../../components/Store/Store";


export default function Filter({team}) {

    const theme = useTheme();
    const [switchOn, setSwitchOn] = React.useState(true)
    const [state, dispatch] = React.useContext(UserContext);

    const getPostsFromTeam = (team) => {
        fetch(`https://localhost:5001/api/wall/${team.wall.id}`)
            .then(response => response.json())
            .then(data => {
                addDataToPosts(data.posts);
            });
    }

    const addDataToPosts = (newPosts) => {
        newPosts.forEach((post) => {
            post.teamId = team.id;
            post.teamName = team.name;
            post.postTime = Date.parse(post.postTime);
        })
        dispatch({type: "addPost", payload: {post : newPosts}})
    }

    const handleSwitchOn = () => {
        getPostsFromTeam(team);
    }

    const handleSwitchOff = () => {
        dispatch({type: "deleteTeamPosts", payload: {teamId : team.id}});
    }

    const handleSwitch = () => {
        setSwitchOn(!switchOn);
    }

    useEffect(() => {
        switchOn ? handleSwitchOn() : handleSwitchOff();
    }, [switchOn])


    return (
        <div>
            <ListItem>
                <ListItemIcon>
                    <Avatar
                        style={{
                            width: theme.spacing(3),
                            height: theme.spacing(3),
                        }}>
                        {team.logo ?
                            <Image publicId={team.logo}>
                                <Transformation width="24" height="24" crop="fill"/>
                            </Image>
                            :
                            team.name[0]}
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary={team.name}/>
                <ListItemSecondaryAction>
                    <Switch size={"small"}
                            color={"primary"}
                            checked={switchOn}
                            onChange={handleSwitch}/>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    )
}
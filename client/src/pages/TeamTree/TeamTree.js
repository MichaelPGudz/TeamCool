import React, {useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Tree from "react-d3-tree";
import {makeStyles} from "@material-ui/core/styles";
import {useCenteredTree} from "./helpers";


const useStyles = makeStyles(() => ({
    shape: {
        height: "100%",
        width: "100%",
        textAlign: "center"
    },
}));

export default function TeamTree() {
    const {teamId} = useParams();
    const [team, setTeam] = React.useState([]);
    const classes = useStyles();
    const [translate, containerRef] = useCenteredTree();
    const history = useHistory();


    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem('token'),
            },
        };
        fetch(`https://localhost:5001/api/team/${teamId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setTeam(data);
            })
    }, [teamId]);

    const [teamTree, setTeamTree] = React.useState({})

    useEffect(() => {
        if (team !== []) {
            setTeamTree({
                id: team.id,
                name: team.name,
                children: team.childTeams
            })
        }
    }, [team])

    return (
        <div id="treeWrapper" className={classes.shape} ref={containerRef}>
            <Tree data={teamTree}
                  translate={translate}
                  pathFunc={"step"}
                  onNodeClick={(node) => {history.push(`/team/${node.data.id}`)}}
                  orientation={"vertical"}/>
        </div>
    );
}

import React, {useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Tree from "react-d3-tree";
import {makeStyles} from "@material-ui/core/styles";
import {useCenteredTree} from "./helpers";
import {Button} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    shape: {
        height: "100%",
        width: "100%",
        textAlign: "center"
    },
}));

export default function TeamTree() {
    const {teamId} = useParams();
    const classes = useStyles();
    const [translate, containerRef] = useCenteredTree();
    const history = useHistory();
    const [teamTree, setTeamTree] = React.useState({});
    const nodeSize = {x: 200, y: 200};
    const foreignObjectProps = {width: nodeSize.x, height: nodeSize.y, x: -nodeSize.x / 2, y: -5};


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
                if (data.parentTeam) {
                    setTeamTree({...data.parentTeam, children: [{...data, children: data.childTeams}]})
                } else {
                    setTeamTree({...data, children: data.childTeams})
                }
            })
    }, [teamId]);

    const TreeNode = ({
                          nodeDatum,
                          foreignObjectProps,

                      }) => (
        <foreignObject {...foreignObjectProps}>
            <div>
                <Button onClick={() => {
                    history.push(`/team/${nodeDatum.id}`)
                }}
                variant={"contained"}>
                    {nodeDatum.name}
                </Button>

            </div>
        </foreignObject>
    )


    return (
        <div id="treeWrapper" className={classes.shape} ref={containerRef}>
            <Tree data={teamTree}
                  translate={translate}
                  onNodeClick={(node) => {
                      history.push(`/team/${node.data.id}`)
                  }}
                  orientation={"vertical"}
                  nodeSize={nodeSize}
                  renderCustomNodeElement=
                      {
                          (rd3tNodeProps) => TreeNode({...rd3tNodeProps, foreignObjectProps,})
                      }
            />
        </div>
    );
}

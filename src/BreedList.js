import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export default class BreedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState(prev => ({
      open: !prev.open
    }));
  };

  render() {
    return (
      <List>
        <ListItem button onClick={this.handleClick}>
          <ListItemText primary={this.props.item} />
          {this.props.exists ? (
            !this.state.open ? (
              <Icon>
                <ExpandMoreIcon />
              </Icon>
            ) : (
              <Icon>
                <ExpandLessIcon />
              </Icon>
            )
          ) : null}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.props.subBreed.map(elem => (
              <ListItem button>
                <ListItemText primary={elem} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    );
  }
}

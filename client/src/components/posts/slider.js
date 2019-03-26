import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
// import tileData from './tileData';

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 **/
const tileData = [
  {
    img: "https://images8.alphacoders.com/618/618469.jpg",
    title: "Image",
    author: "author"
  },
  {
    img:
      " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv4xLDe87MHve6Oy3tL1ktQmXE5nsJi2qZ52TXV1FLCae5n-lV",
    title: "Image",
    author: "author"
  },
  {
    img:
      "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?cs=srgb&dl=bench-carved-stones-cemetery-257360.jpg&fm=jpg",
    title: "Image",
    author: "author"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2017/12/29/18/47/nature-3048299_960_720.jpg",
    title: "Image",
    author: "author"
  }
];

function SingleLineGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleLineGridList);

import * as React from "react";
import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Fade from "@mui/material/Fade";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Backdrop from "@mui/material/Backdrop";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./MovieCard.css";
import { makeStyles } from "@mui/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  minWidth: 375,
  bgcolor: "background.paper",
  color: "background.#000",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function MovieCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const classes = useStyles();

  console.log(props.movie.genres.split(","));

  return (
    <Card sx={{ maxWidth: 345, height: "100%", position: "relative" }}>
      <CardActionArea
        // classes={{ focusHighlight: classes.focus }}
        // TouchRippleProps={{ className: classes.ripple }}
      >
        <CardContent>
          <Avatar
            alt={props.movie.title}
            src={`https://ui-avatars.com/api/?name=${props.movie.title}`}
          />
          <Typography mt={2} gutterBottom variant="h5" component="div">
            {props.movie.title}
          </Typography>
          <Typography mb={2} variant="body2" color="text.secondary">
            {`${props.movie.description.slice(0, 80)}....`}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {props.movie.genres !== "" ? "Genres:" : ""}
          </Typography> */}
          {props.movie.genres && (
            <>
              {props.movie.genres.split(",").map((genre) => {
                return <Chip label={genre} variant="outlined" />;
              })}
            </>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ bottom: 0 }}>
        <Button
          size="small"
          color="primary"
          onClick={handleOpen}
          sx={{ display: "block", position: "absolute", bottom: "0" }}
        >
          Know More
        </Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        // sx={{ height: "80%" }}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card sx={style}>
            <CardMedia
              component="img"
              height="194"
              image={`https://ui-avatars.com/api/?name=${props.movie.title}`}
              alt={props.movie.title}
            />
            <CardContent>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.movie.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.movie.description}
              </Typography>
              {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.movie.genres}
              </Typography> */}
              {props.movie.genres && (
                <>
                  {props.movie.genres.split(",").map((genre) => {
                    return <Chip label={genre} variant="outlined" />;
                  })}
                </>
              )}
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </Card>
  );
}

MovieCard.defaultProps = {
  movie: {},
};

MovieCard.propTypes = {
  movie: PropTypes.object,
};

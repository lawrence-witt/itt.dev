import { keyframes } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import Page from "components/organisms/Page";

import Typography from "components/atoms/Typography";
import { LoaderIcon } from "components/atoms/Icon";

import { FallbackProps } from "./Fallback.types";

const useStyles = makeStyles({ name: "FallbackPage" })((theme) => ({
  contain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  page: {
    color: theme.palette.primary.main,
    height: "100%",
    display: "flex",
    gap: theme.spacing(3),
    flexDirection: "column",
    alignItems: "center",
    margin: "unset",
    textAlign: "center",
  },
  spinner: {
    animation: `${keyframes`
      from { transform: rotateZ(0deg) }
      to { transform: rotateZ(360deg) }
    `} 2s infinite linear`,
  },
}));

export const Fallback: React.FC<FallbackProps> = (props) => {
  const { classes } = useStyles();

  return (
    <Page
      subtitle="loading..."
      classes={{ contain: classes.contain, page: classes.page }}
    >
      <LoaderIcon variant="lg" className={classes.spinner} />
      <Typography variant="h5">
        Please wait a moment while your page is generated...
      </Typography>
    </Page>
  );
};

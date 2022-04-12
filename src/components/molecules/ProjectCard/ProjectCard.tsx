import { makeStyles } from "utils/providers/ThemeProvider";

import Card from "components/atoms/Card";
import Typography from "components/atoms/Typography";
import { CircleIcon, ExternalLinkIcon } from "components/atoms/Icon";

import { ProjectCardProps } from "./ProjectCard.types";

const useStyles = makeStyles({ name: "ProjectCard" })((theme) => ({
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  repoLink: {
    color: theme.palette.text.secondary,
  },
  techList: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: theme.spacing(2.5),
    rowGap: theme.spacing(1),
  },
  techItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    width: "fit-content",
  },
}));

export const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const { title, description, technologies, repositoryURL } = props;

  const { classes } = useStyles();

  return (
    <Card component="article">
      <div className={classes.heading}>
        <Typography variant="h4" noWrap className="mb-1">
          {title}
        </Typography>
        <a
          className={classes.repoLink}
          href={repositoryURL}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLinkIcon variant="sm" />
        </a>
      </div>
      <Typography color="textTertiary" className="mb-3">
        {description}
      </Typography>
      {technologies.length > 0 && (
        <ul className={classes.techList}>
          {technologies.map(({ name, color }) => (
            <li key={name} className={classes.techItem}>
              <CircleIcon style={{ fill: color, height: 8, width: 8 }} />
              <Typography variant="body2" color="textTertiary">
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

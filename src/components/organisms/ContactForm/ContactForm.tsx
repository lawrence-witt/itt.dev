import React from "react";
import axios from "axios";

import { makeStyles } from "utils/providers/ThemeProvider";
import FormValidator from "utils/classes/FormValidator";

import Typography from "components/atoms/Typography";
import Form, { Fields } from "components/atoms/Form";
import Button from "components/atoms/Button";

import TextField from "components/molecules/TextField";

import { ContactFormProps } from "./ContactForm.types";

const useStyles = makeStyles({ name: "ContactForm" })((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    alignItems: "end",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    "& > *": {
      flex: 1,
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  footer: {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
  },
}));

const initialFields = {
  name: { value: "", valid: false },
  email: { value: "", valid: false },
  subject: { value: "", valid: true },
  message: { value: "", valid: false },
};

export const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { className } = props;

  const { classes, cx } = useStyles();

  const [status, setStatus] = React.useState<
    "pending" | "sending" | "success" | "fail"
  >("pending");
  const [message, setMessage] = React.useState("");

  const onSubmit = React.useCallback(
    async (fields: Fields<keyof typeof initialFields>) => {
      setStatus("sending");

      try {
        await axios.post("api/email", fields);
        setMessage("Thanks for your message. I'll be in touch soon!");
        setStatus("success");
      } catch (err: any) {
        setMessage(err.response?.data?.message || err.message);
        setStatus("fail");
      }
    },
    []
  );

  const buttonText = {
    pending: "SEND",
    sending: "SENDING",
    success: "SENT",
    fail: "ERROR",
  }[status];

  const messageColor = status === "fail" ? "error" : "textPrimary";

  return (
    <Form
      className={cx(classes.root, className)}
      initialFields={initialFields}
      onSubmit={onSubmit}
    >
      {(fields, onChange, invalid) => (
        <>
          <div className={classes.row}>
            <TextField
              id="contact_name"
              label="Name"
              required
              name={fields.name.name}
              value={fields.name.value}
              onChange={onChange}
              validators={[FormValidator.ofLengthRange(1, 25)]}
            />
            <TextField
              id="contact_email"
              label="Email"
              required
              name={fields.email.name}
              value={fields.email.value}
              onChange={onChange}
              validators={[FormValidator.isEmail]}
            />
          </div>
          <TextField
            id="contact_subject"
            label="Subject"
            name={fields.subject.name}
            value={fields.subject.value}
            onChange={onChange}
            validators={[FormValidator.ofMaxLength(25)]}
          />
          <TextField
            id="contact_message"
            label="Message"
            required
            textArea
            rows={7}
            name={fields.message.name}
            value={fields.message.value}
            onChange={onChange}
            validators={[FormValidator.ofMinLength(25)]}
          />
          <div className={classes.footer}>
            {message && <Typography color={messageColor}>{message}</Typography>}
            <Button type="submit" disabled={invalid || status !== "pending"}>
              {buttonText}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

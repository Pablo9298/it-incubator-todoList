import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { BaseResponseType } from "common/types";

type Props = {
  addItem: (title: string) => Promise<any>;
  disabled?: boolean;
};

export const AddItemForm = function ({ addItem, disabled = false }: Props) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title)
        .then((res) => {
          setTitle("");
        })
        .catch((err: BaseResponseType) => {
          setError(err.messages[0]);
        });
    } else {
      setError("Title is required");
    }
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const addItemOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={changeTitleHandler}
        onKeyPress={addItemOnKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  );
};

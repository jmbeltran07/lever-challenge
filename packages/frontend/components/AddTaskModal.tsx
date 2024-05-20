import React, { memo, useMemo } from "react";

import { css } from "@emotion/react";
import { Button, Dropdown, Input, Modal } from "semantic-ui-react";

import { CategoriesQuery } from "@/graphql/generated";
import { useAddTaskModal } from "@/hooks/useAddTaskModal";

export const AddTaskModal = memo<{
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchTasks: () => Promise<unknown>;
  categories: CategoriesQuery["categories"];
}>(({ open, setOpen, refetchTasks, categories }) => {
  const { title, categoryIds, dispatch, handleAddTask } = useAddTaskModal({ setOpen, refetchTasks });

  const categoryOptions = useMemo(() => categories.map(({ id, name }) => ({ value: id, text: name })), [categories]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Create New</Modal.Header>
      <Modal.Content>
        <div>
          <div>Title</div>
          <Input
            value={title}
            onChange={(e, d) => dispatch({ type: "setTitle", payload: d.value })}
            css={css`
              &&& {
                margin-top: 4px;
                width: 100%;
              }
            `}
          />
        </div>
        <div
          css={css`
            margin-top: 8px;
          `}
        >
          <div>Category</div>
          <Dropdown
            options={categoryOptions}
            search
            selection
            fluid
            multiple
            value={categoryIds}
            onChange={(e, d) => dispatch({ type: "setCategoryIds", payload: d.value as number[] })}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Create" color="blue" disabled={!title} onClick={handleAddTask} />
        <Button content="Cancel" onClick={() => setOpen(false)} />
      </Modal.Actions>
    </Modal>
  );
});

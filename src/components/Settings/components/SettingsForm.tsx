import React, { useRef } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Box, TextInput, PasswordInput, Textarea, Button, Title } from '@mantine/core';

import { detailsFormStyles, detailsInputStyles } from '../styles/articleContentStyles';
import { ConfirmationModal } from './ConfirmationModal';

type TFormControls = {
  type?: string;
  label: string;
  inputProp: string;
};

type TFormDetailsList = {
  title: string;
  formControls: TFormControls[];
};

interface ISettingsFormPropsType {
  children?: string | JSX.Element | JSX.Element[];
  settingsForm: UseFormReturnType<any>;
  formDetailsList: TFormDetailsList[];
  onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

const getTypeInputs = {
  text: TextInput,
  password: PasswordInput,
  textarea: Textarea,
};

export const SettingsForm: React.FC<ISettingsFormPropsType> = ({
  children,
  settingsForm,
  formDetailsList,
  onSubmitHandler,
}): JSX.Element => {
  const { classes: formClasses } = detailsFormStyles();
  const { classes: inputClasses } = detailsInputStyles();

  const [opened, { open, close }] = useDisclosure(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <form ref={formRef} className={formClasses.detailsForm} onSubmit={onSubmitHandler}>
        {formDetailsList.map((formDetail, idx) => {
          const { title, formControls } = formDetail;

          return (
            <Box key={idx} className={formClasses.detailsCategory}>
              <Title order={3} className={formClasses.detailsCategoryTitle}>
                {title}
              </Title>
              {formControls.map((control, idx) => {
                const typeInput = control.type
                  ? (control.type as keyof typeof getTypeInputs)
                  : ('text' as keyof typeof getTypeInputs);

                const Input = getTypeInputs[typeInput];

                return (
                  <React.Fragment key={idx}>
                    <Input
                      label={control.label}
                      classNames={inputClasses}
                      className={formClasses.textarea}
                      {...settingsForm.getInputProps(control.inputProp)}
                    />
                  </React.Fragment>
                );
              })}
            </Box>
          );
        })}

        {children}

        <Button
          className={formClasses.formSubmitBtn}
          onClick={open}
          size="sm"
          type="button"
          radius="xl"
          color="teal"
        >
          Save
        </Button>
      </form>
      <ConfirmationModal formRef={formRef} modalOpened={opened} modalClose={close} />
    </>
  );
};

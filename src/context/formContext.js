'use client';

import { createContext, useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
// initialize context
export const FormContext = createContext({
  form: {},
  addForm: () => {},
});

function FormContextProvider({ children }) {
  // states

  const [form, setForm] = useState({
    head: '',
    question: [
      {
        id: uuidv4(),
        questionTitle: '',
        field: [
          {
            id: uuidv4(),
            fieldTitle: '',
            type: '', //text' || 'multiChoice' || 'multiAnswers'
            options: [],
            prompt: '', // Prompt for adding video or image
            fileSize: 0,
            isFieldVisible: false,
          },
        ],
        emails: [],
        pin: '',
        responses: [
          {
            id: uuidv4(),
            email: '',
            answers: [],
          },
        ],
      },
    ],
  });

  // Functions to update the form
  const addForm = (userData) => setForm(userData);

  // to update head property in our form object
  const updateHead = (head) => {
    addForm((prevForm) => ({ ...prevForm, head }));
  };

  // to update questionTitle property in our form object
  const updateQuestionTitle = (questionId, title) => {
    addForm((prevForm) => ({
      ...prevForm,
      // you can also use .find here
      question: prevForm.question.map((q) =>
        q.id === questionId ? { ...q, questionTitle: title } : q
      ),
    }));
  };

  // to add question Fields, we can add 3 types of fields
  // text, multiOptions and Media
  const addField = (questionId, fieldType) => {
    const newField = {
      id: uuidv4(),
      fieldTitle: '',
      type: fieldType,
      options: fieldType === 'multiOptions' ? [''] : [],
      prompt: fieldType === 'media' ? '' : null,
      fileSize: fieldType === 'media' ? 0 : null,
      isFieldVisible: true,
    };

    addForm((prevForm) => ({
      ...prevForm,
      question: prevForm.question.map((q) =>
        q.id === questionId
          ? { ...q, field: [...q.field, newField] }
          : q
      ),
    }));
  };

  // To handle fieldTitle update. set fieldTitle(Questions)
  const handleFieldTitleChange = (questionId, fieldId, title) => {
    addForm((prevForm) => ({
      ...prevForm,
      question: prevForm.question.map((q) =>
        q.id === questionId
          ? {
              ...q,
              field: q.field.map((f) =>
                f.id === fieldId ? { ...f, fieldTitle: title } : f
              ),
            }
          : q
      ),
    }));
  };

  // To add more options to fieldTitle(questions) that is a multiOptions type.

  const addOption = (questionId, fieldId) => {
    addForm((prevForm) => ({
      ...prevForm,
      question: prevForm.question.map((q) =>
        q.id === questionId
          ? {
              ...q,
              field: q.field.map((f) =>
                f.id === fieldId
                  ? { ...f, options: [...f.options, ''] }
                  : f
              ),
            }
          : q
      ),
    }));
  };

  // To handle inputting the Options.

  const handleOptionsChange = (questionId, fieldId, index, value) => {
    addForm((prevForm) => ({
      ...prevForm,
      question: prevForm.question.map((q) =>
        q.id === questionId
          ? {
              ...q,
              field: q.field.map((f) =>
                f.id === fieldId
                  ? {
                      ...f,
                      options: f.options.map((o, i) =>
                        i === index ? value : o
                      ),
                    }
                  : f
              ),
            }
          : q
      ),
    }));
  };

  // To handle fieldPrompt update. for media type fieldTitle(question)

  const handleFieldPromptChange = (questionId, fieldId, prompt) => {
    addForm((prevForm) => ({
      ...prevForm,
      question: prevForm.question.map((q) =>
        q.id === questionId
          ? {
              ...q,
              field: q.field.map((f) =>
                f.id === fieldId ? { ...f, prompt } : f
              ),
            }
          : q
      ),
    }));
  };
  //   // Handle input changes for field fileSize
  const handleFieldFileSizeChange = (
    questionId,
    fieldId,
    fileSize
  ) => {
    addForm((prevForm) => ({
      ...prevForm,
      question: prevForm.question.map((q) =>
        q.id === questionId
          ? {
              ...q,
              field: q.field.map((f) =>
                f.id === fieldId ? { ...f, fileSize } : f
              ),
            }
          : q
      ),
    }));
  };

  //------------ context Values
  const value = {
    form,

    addForm,
    updateHead,
    updateQuestionTitle,
    addField,
    handleFieldTitleChange,
    addOption,
    handleOptionsChange,
    handleFieldPromptChange,
    handleFieldFileSizeChange,
  };
  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

export default FormContextProvider;

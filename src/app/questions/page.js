'use client';
import React, { useEffect, useState } from 'react';
import { getQuestions, handleUpdateData } from '@/firebase';

import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Button,
} from '@mui/material';
import ImageUpload from '@/components/ImageUpload';
import Layout from '@/components/navbarLayout';
export default function FormComponent() {
  const [formData, setFormData] = useState([]);
  const [state, setState] = useState({});

  useEffect(() => {
    // Fetch data when the component mounts
    async function fetchData() {
      const questionsData = await getQuestions();
      setFormData(questionsData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(formData[0]?.question[0]?.responses[0]?.answers);
  }, [formData]);

  const updateFormResponses = (fieldId, value, fieldTitle) => {
    // Create a deep copy of the form data
    const updatedFormData = JSON.parse(JSON.stringify(formData));

    // Find the question and response for the field
    const questionIndex = updatedFormData.findIndex((formItem) =>
      formItem.question.some((question) =>
        question.field.some((field) => field.id === fieldId)
      )
    );

    if (questionIndex !== -1) {
      const fieldIndex = updatedFormData[
        questionIndex
      ].question[0].field.findIndex((field) => field.id === fieldId);

      if (fieldIndex !== -1) {
        // Update the response answers
        const response =
          updatedFormData[questionIndex].question[0].responses[0];

        // Check if the fieldId already exists in answers, if so, update its value
        const existingAnswerIndex = response.answers.findIndex(
          (answer) => Object.keys(answer)[0] === fieldId
        );

        if (existingAnswerIndex !== -1) {
          response.answers[existingAnswerIndex] = {
            fieldTitle,
            answer: value,
          };
        } else {
          response.answers.push({ fieldTitle, answer: value });
        }
      }
    }

    // Update state with the modified form data
    setFormData(updatedFormData);
  };

  const handleTextChange = (fieldId, value, fieldTitle) => {
    updateFormResponses(fieldId, value, fieldTitle);
  };

  const handleRadioChange = (fieldId, value, fieldTitle) => {
    updateFormResponses(fieldId, value, fieldTitle);
  };

  const handleImageUploadChange = (fieldId, value, fieldTitle) => {
    updateFormResponses(fieldId, value, fieldTitle);
    setState((prevState) => ({
      ...prevState,
      [fieldId]: value,
    }));
  };

  const handleSubmit = () => {
    handleUpdateData(formData);
  };

  return (
    <>
      <Layout />
      <Box
        sx={{
          width: { xs: '100%', md: '600px' },
          margin: '100px auto',
          padding: '20px',
          backgroundColor: 'white',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {formData.map((formItem) => (
          <div key={formItem.id}>
            {/* Render the form header */}
            <h1
            // style={{
            //   padding: '20px'
            // }}
            >
              {formItem.head}
            </h1>

            {formItem?.question?.map((question) => (
              <div key={question.id}>
                {/* Render the question title */}
                <Box
                  sx={{
                    my: '20px',
                  }}
                >
                  <h2>{question.questionTitle}</h2>
                </Box>

                {question?.field.map((field) => (
                  <div key={field.id} style={{ padding: '30px 0' }}>
                    {/* Render fields based on type */}
                    {field.type === 'text' && (
                      <>
                        <p> {field.fieldTitle}</p>
                        <TextField
                          sx={{
                            width: '100%',
                            my: '20px',
                          }}
                          label={field.fieldTitle}
                          variant="outlined"
                          onChange={(e) =>
                            handleTextChange(
                              field.id,
                              e.target.value,
                              field.fieldTitle
                            )
                          }
                        />
                      </>
                    )}

                    {field.type === 'multiOptions' && (
                      <>
                        <p>{field.fieldTitle}</p>
                        <RadioGroup
                          sx={{
                            my: '20px',
                          }}
                        >
                          {field.options.map((option, index) => (
                            <FormControlLabel
                              key={index}
                              value={option}
                              control={<Radio />}
                              label={option}
                              onChange={(e) =>
                                handleRadioChange(
                                  field.id,
                                  e.target.value,
                                  field.fieldTitle
                                )
                              }
                            />
                          ))}
                        </RadioGroup>
                      </>
                    )}

                    {field.type === 'media' && (
                      <>
                        <p>{field.fieldTitle}</p>
                        <Box
                          sx={{
                            border: '1px solid gray',
                            width: '100px',
                            height: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            my: '20px',
                          }}
                        >
                          <ImageUpload
                            value={state[field.id] || ''}
                            onChange={(value) =>
                              handleImageUploadChange(
                                field.id,
                                value,
                                field.fieldTitle
                              )
                            }
                          />
                        </Box>
                        <Box>
                          <p>{`supported upload file type: ${field.prompt}`}</p>

                          <p
                            style={{
                              padding: '20px 0',
                            }}
                          >
                            {` File size: max size of ${field.fileSize} mb`}
                          </p>
                        </Box>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}

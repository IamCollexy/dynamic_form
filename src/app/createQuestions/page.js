'use client';
import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
  IconButton,
  Box,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { FormContext } from '@/context/formContext';
import { addQuestion } from '@/firebase';
import Layout from '@/components/navbarLayout';
export default function Home() {
  const {
    form,
    updateHead,
    updateQuestionTitle,
    addField,
    handleFieldTitleChange,
    handleOptionsChange,
    handleFieldPromptChange,
    handleFieldFileSizeChange,
    addOption,
  } = useContext(FormContext);

  const router = useRouter();
  const [select, setSelect] = useState('');
  const addQuestionToFirestore = async () => {
    await addQuestion(form);
    router.push('/questions');
  };
  return (
    <>
      <Layout />
      <div
        style={{
          width: '500px',
          margin: '100px auto',
          // boxShadow:
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            padding: '30px',
          }}
        >
          Customize Questions
        </h1>

        {/* Update Head */}

        <TextField
          sx={{
            width: '100%',
          }}
          label="Question Head"
          variant="outlined"
          value={form.head}
          onChange={(e) => updateHead(e.target.value)}
        />

        {form.question.map((q) => (
          <div key={q.id}>
            {/* Update Question Title */}
            <TextField
              sx={{
                width: '100%',
                my: '20px',
              }}
              label="Question Title"
              variant="outlined"
              value={q.questionTitle}
              onChange={(e) =>
                updateQuestionTitle(q.id, e.target.value)
              }
            />

            {/* Field Type Select and Add Button */}
            <Box
              sx={{
                width: { xs: '12%', md: '10%' },
                height: '150px',
                position: 'fixed',
                textAlign: { xs: 'end', md: 'center' },
                bottom: '300px',
                right: { xs: '20px', md: '50px' },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                }}
              >
                select and add a Field
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'absolute',
                  top: '40px',
                  width: '100%',
                }}
              >
                <Select
                  label="choose field type"
                  value={select}
                  onChange={(e) => setSelect(e.target.value)}
                  sx={{
                    margin: '10px 0',
                  }}
                >
                  <MenuItem value="text">Text</MenuItem>

                  <MenuItem value="multiOptions">
                    MultiOptions
                  </MenuItem>
                  <MenuItem value="media">Media</MenuItem>
                </Select>
                <IconButton
                  aria-label="Add Field"
                  onClick={() => addField(q.id, select)}
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Render Fields */}
            {q.field.map((f) => (
              <div key={f.id}>
                {/* Field Title */}

                {f.isFieldVisible && (
                  <>
                    <TextField
                      sx={{
                        width: '100%',
                        mb: '20px',
                      }}
                      label="Field Title"
                      variant="outlined"
                      value={f.fieldTitle}
                      onChange={(e) =>
                        handleFieldTitleChange(
                          q.id,
                          f.id,
                          e.target.value
                        )
                      }
                    />
                  </>
                )}

                {/* Render Options for MultiOptions */}
                {f.type === 'multiOptions' ? (
                  <div>
                    {f.options.map((option, index) => (
                      <div key={index}>
                        <TextField
                          sx={{
                            width: '70%',
                            my: '20px',
                          }}
                          label={`Option ${index + 1}`}
                          variant="outlined"
                          value={option}
                          onChange={(e) =>
                            handleOptionsChange(
                              q.id,
                              f.id,
                              index,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}

                    {f.options.length < 5 && (
                      <Box
                        sx={{
                          mb: '20px',
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => addOption(q.id, f.id)}
                        >
                          Add Option
                        </Button>
                      </Box>
                    )}
                  </div>
                ) : null}

                {/* Render Media Fields */}
                {f.type === 'media' && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TextField
                      label="Prompt"
                      variant="outlined"
                      value={f.prompt}
                      onChange={(e) =>
                        handleFieldPromptChange(
                          q.id,
                          f.id,
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      label="File Size"
                      variant="outlined"
                      type="number"
                      value={f.fileSize}
                      onChange={(e) =>
                        handleFieldFileSizeChange(
                          q.id,
                          f.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Create Button */}
        <Box
          sx={{
            padding: '30px 0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {select !== '' ? (
            <Button
              variant="outlined"
              sx={{
                width: '30%',
                padding: '10px 0',
                textTransform: 'none',
              }}
              onClick={addQuestionToFirestore}
            >
              Create
            </Button>
          ) : null}
        </Box>
      </div>
    </>
  );
}

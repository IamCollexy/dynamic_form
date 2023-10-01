'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/navbarLayout';
import { getQuestions } from '@/firebase';
const page = () => {
  const [formData, setFormData] = useState([]);
  const [response, setResponses] = useState([]);
  useEffect(() => {
    // Fetch data when the component mounts
    async function fetchData() {
      const questionsData = await getQuestions();
      setFormData(questionsData);
    }
    fetchData();
    formData.map((form) => {
      setResponses(form.newQuestion);
    });
  }, [formData]);
  // useEffect(() => {

  // }, []);
  console.log(response);
  return (
    <>
      <Layout />
      {/* {response?.question[0]map((res) => {
        <Container key={res.id}>
          <Box>
            <Typography variant="caption">
              {res.fieldTitle}
            </Typography>
            <Typography variant="caption">{res.answer}</Typography>
          </Box>
        </Container>;
      })} */}
    </>
  );
};

export default page;

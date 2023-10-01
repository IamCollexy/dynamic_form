import SideBar from '@/components/sideNav';
import { Box, Typography } from '@mui/material';
import React from 'react';

const page = () => {
  return (
    <>
      <Box
        sx={{
          p: '20px',
        }}
      >
        <SideBar />
        <Typography
          fontWeight="bold"
          sx={{
            color: '#1976D2',
          }}
          variant="body1"
        >
          InterviewPro
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: '800px' },
          margin: '100px auto',
          bgcolor: '#fff',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',

          padding: '20px',
        }}
      >
        <h1>
          Welcome to InterviewPro: Streamlining Interviews, Elevating
          Success
        </h1>
        <Box
          sx={{
            py: '20px',
          }}
        >
          <h2>Unlock the Future of Recruitment</h2>
        </Box>

        <p>
          Are you ready to revolutionize your hiring process?
          InterviewPro is your all-in-one solution for conducting
          seamless interviews and finding the perfect candidates.
        </p>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            py: '20px',
          }}
        >
          <Box>
            <h3>For Admins:</h3>
            <ol>
              <li>Create Customized Interview Questions</li>
              <li>Receive and Review Applicant Responses</li>
              <li>Streamline Your Hiring Workflow</li>
              <li>Gain Deep Insights into Candidates</li>
            </ol>
          </Box>
          <Box>
            <h3>For Applicants:</h3>
            <ol>
              <li>Respond to Tailored Interview Questions</li>
              <li>Showcase Your Skills and Personality</li>
              <li> Ensure Fair and Structured Evaluations</li>
              <li>Get Noticed by Top Employers</li>
            </ol>
          </Box>
        </Box>
        <Box
          sx={{
            py: '20px',
          }}
        >
          <p>
            Join thousands of satisfied companies and applicants who
            trust InterviewPro to make interviews efficient, fair, and
            insightful.
          </p>
        </Box>
        <em>
          Ready to experience the future of hiring? Get started today!
        </em>
      </Box>
    </>
  );
};

export default page;

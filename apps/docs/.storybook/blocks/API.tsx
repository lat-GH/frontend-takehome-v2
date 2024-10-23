import React, { FunctionComponent, ReactNode, useState } from 'react';
import { CodeBlock, Code, rainbow } from 'react-code-blocks';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Stack,
  useTheme,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface APIProps {
  path: string;
  method: string;
  responses: Array<{ status: number; result: Record<string, unknown> }>;
  parameters?: Array<{ name: string; description: string }>;
  query?: Array<{ name: string; description: string; required?: boolean }>;
}

interface InfoProps {
  name: ReactNode;
  description: string;
  required?: boolean;
}

const responseStatusText = (status: number) => {
  switch (true) {
    case status < 400:
      return 'Successful response';
    case status < 500:
      return 'Validation error';
    default:
      return 'Server error';
  }
};

const responseColors = (status: number) => {
  switch (true) {
    case status < 400:
      return {
        color: '#1d8127',
        bgcolor: '#1d812712',
      };
    case status < 500:
    default:
      return {
        color: '#d41f1c',
        bgcolor: '#d41f1c12',
      };
  }
};

const Info: FunctionComponent<InfoProps> = ({
  name,
  description,
  required,
}) => {
  const theme = useTheme();

  return (
    <Stack flexDirection="row" gap={3}>
      <Box sx={{ color: theme.palette.grey[600] }}>
        <Stack flexDirection="column">
          <strong style={{ marginTop: '2px', fontSize: '15px' }}>{name}</strong>
          {required ? (
            <Typography fontSize={14} color={theme.palette.error.main}>
              required
            </Typography>
          ) : null}
        </Stack>
      </Box>
      <Box sx={{ color: theme.palette.grey[600] }}>{description}</Box>
    </Stack>
  );
};

const API: FunctionComponent<APIProps> = ({
  path,
  method,
  responses,
  parameters,
  query,
}) => {
  const [openedResponses, setOpenedResponses] = useState<Array<number>>([]);
  const theme = useTheme();

  const toggleResponse = (key: number) => {
    setOpenedResponses((state) => {
      const newState = state.slice();

      if (newState.includes(key)) {
        newState.splice(newState.indexOf(key), 1);
      } else {
        newState.push(key);
      }

      return newState;
    });
  };

  return (
    <div>
      <Paper sx={{ px: 1, py: 1, mb: 1, bgcolor: '#F8F8F8' }} elevation={0}>
        <Stack alignItems="center" flexDirection="row" gap={0.5}>
          <Box
            sx={{
              px: 1,
              py: 0.5,
              bgcolor: theme.palette.primary.light,
              color: '#fff',
              borderRadius: 1,
              fontSize: 12,
            }}>
            {method}
          </Box>
          <Code
            customStyle={{
              width: '100%',
              padding: '4px 8px',
              fontSize: '12px',
              fontStyle: 'italic',
            }}
            text={path}
            language="json"
            showLineNumbers={false}
          />
        </Stack>
      </Paper>
      {parameters && (
        <Box sx={{ my: 2 }}>
          <h3>Parameters</h3>
          <Stack gap={1}>
            {parameters.map((parameter) => (
              <Info key={parameter.name} {...parameter} />
            ))}
          </Stack>
        </Box>
      )}
      {query && (
        <Box sx={{ my: 2 }}>
          <h3>Query</h3>
          <Stack gap={1}>
            {query.map((item) => (
              <Info key={item.name} {...item} />
            ))}
          </Stack>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <h3>Responses</h3>
        {responses.map((response) => (
          <Box sx={{ my: 1 }}>
            <Accordion
              expanded={openedResponses.includes(response.status)}
              onChange={() => toggleResponse(response.status)}
              elevation={0}
              disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${response.status}-header`}
                id={`panel-${response.status}-header`}
                sx={responseColors(response.status)}>
                <Typography sx={{ color: 'inherit', fontSize: '14px' }}>
                  <strong>{response.status}</strong>{' '}
                  {responseStatusText(response.status)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <CodeBlock
                  text={JSON.stringify(response.result, null, 4)}
                  customStyle={{
                    borderRadius: '0',
                    fontSize: '12px !important',
                  }}
                  showLineNumbers={false}
                  language="json"
                  theme={rainbow}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default API;

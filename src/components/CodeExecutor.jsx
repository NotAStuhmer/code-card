import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { theme } from '../theme';

const CodeExecutor = ({ initialCode = '', onCodeChange = null }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const outputRef = useRef(null);
  const iframeRef = useRef(null);

  // Update local code when initialCode prop changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  // Create a sandboxed iframe for code execution
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.sandbox = 'allow-scripts allow-same-origin';
    iframe.title = 'code-execution-sandbox';
    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    return () => {
      document.body.removeChild(iframe);
    };
  }, []);

  // Auto-scroll to bottom of output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const copyOutput = () => {
    const outputText = output.map(item => {
      if (item.type === 'error') {
        return `ERROR: ${item.content}`;
      }
      return item.content;
    }).join('\n');
    
    navigator.clipboard.writeText(outputText);
  };

  const executeCode = async () => {
    setIsExecuting(true);
    clearOutput();
    
    try {
      // Execute in sandbox iframe
      const iframe = iframeRef.current;
      const iframeWindow = iframe.contentWindow;
      
      // Reset iframe content with a more robust execution environment
      iframe.srcdoc = `
        <!DOCTYPE html>
        <html>
          <head>
            <script>
              // Setup execution environment
              window.executeCode = function() {
                try {
                  // Override console methods to capture output
                  const originalConsole = { ...console };
                  const capturedOutput = [];
                  
                  console.log = function() {
                    const args = Array.from(arguments);
                    const formatted = args.map(arg => 
                      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ');
                    capturedOutput.push({ type: 'log', content: formatted });
                    originalConsole.log(...arguments);
                  };
                  
                  console.error = function() {
                    const args = Array.from(arguments);
                    const formatted = args.map(arg => 
                      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ');
                    capturedOutput.push({ type: 'error', content: formatted });
                    originalConsole.error(...arguments);
                  };
                  
                  console.warn = function() {
                    const args = Array.from(arguments);
                    const formatted = args.map(arg => 
                      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ');
                    capturedOutput.push({ type: 'warn', content: formatted });
                    originalConsole.warn(...arguments);
                  };
                  
                  // Execute the code directly
                  const userCode = ${JSON.stringify(code)};
                  const result = eval(userCode);
                  
                  // If there's a return value and it's not captured in a variable, show it
                  if (result !== undefined && !userCode.includes('return')) {
                    capturedOutput.push({ 
                      type: 'result', 
                      content: 'Result: ' + (typeof result === 'object' ? 
                        JSON.stringify(result, null, 2) : String(result)) 
                    });
                  }
                  
                  return { success: true, output: capturedOutput };
                } catch (error) {
                  return { 
                    success: false, 
                    output: [{ type: 'error', content: error.toString() }]
                  };
                }
              };
            </script>
          </head>
          <body>
            <div id="result"></div>
          </body>
        </html>
      `;

      // Wait for iframe to load
      await new Promise(resolve => {
        iframe.onload = resolve;
      });

      // Execute with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Execution timed out (5s)')), 5000);
      });

      const executionPromise = new Promise(resolve => {
        const result = iframeWindow.executeCode();
        resolve(result);
      });

      const result = await Promise.race([executionPromise, timeoutPromise]);
      
      if (result.success) {
        setOutput(prev => [...prev, ...result.output]);
      } else {
        setOutput(prev => [...prev, ...result.output]);
      }
    } catch (error) {
      setOutput(prev => [...prev, { type: 'error', content: error.toString() }]);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 1, color: theme.palette.primary.light, fontWeight: 500 }}>
        Code Editor
      </Typography>
      
      <TextField
        value={code}
        onChange={handleCodeChange}
        multiline
        fullWidth
        variant="outlined"
        rows={16}
        sx={{ 
          mb: 2,
          fontFamily: 'monospace',
          '& .MuiInputBase-input': {
            fontFamily: 'monospace',
            backgroundColor: 'rgba(30, 33, 41, 0.6)',
            color: '#E9ECEF',
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(30, 33, 41, 0.6)',
            borderRadius: theme.shape.borderRadius,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 167, 38, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            }
          }
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="contained" 
          color="success" 
          onClick={executeCode}
          disabled={isExecuting}
          startIcon={isExecuting ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
          sx={{
            borderRadius: theme.shape.borderRadius,
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(76, 175, 80, 0.3)',
            }
          }}
        >
          {isExecuting ? 'Running...' : 'Run Code'}
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.light, fontWeight: 500 }}>
          Console Output
        </Typography>
        <Box>
          <Tooltip title="Copy Output">
            <IconButton onClick={copyOutput} size="small" sx={{ color: theme.palette.text.secondary }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear Console">
            <IconButton onClick={clearOutput} size="small" sx={{ color: theme.palette.text.secondary }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          backgroundColor: '#1E1E1E',
          color: '#CCCCCC',
          fontFamily: 'monospace',
          height: '200px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          borderRadius: theme.shape.borderRadius,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.2)'
        }}
        ref={outputRef}
      >
        {output.length === 0 ? (
          <Typography sx={{ color: '#666', fontStyle: 'italic' }}>
            Run code to see output...
          </Typography>
        ) : (
          output.map((item, index) => (
            <Typography 
              key={index} 
              sx={{ 
                color: item.type === 'error' ? '#FF6B6B' : 
                       item.type === 'warn' ? '#FFCC00' : 
                       item.type === 'result' ? '#4CAF50' : '#CCCCCC',
                mb: 0.5,
                fontFamily: 'monospace'
              }}
            >
              {item.content}
            </Typography>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default CodeExecutor; 
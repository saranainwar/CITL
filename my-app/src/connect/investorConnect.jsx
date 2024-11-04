import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress
} from '@mui/material';

const InvestorConnectj = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startups, setStartups] = useState([]);
  const [connectedStartups, setConnectedStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/startups');
        if (!response.ok) {
          throw new Error('Failed to fetch startups');
        }
        const data = await response.json();
        // Ensure we're working with an array
        setStartups(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching startups:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  const handleConnect = (startup) => {
    setConnectedStartups(prev => [...prev, { ...startup, status: 'pending' }]);
    setStartups(prev => prev.filter(s => s._id !== startup._id));
  };

  const handleAccept = (startup) => {
    setConnectedStartups(prev => 
      prev.map(s => s._id === startup._id ? { ...s, status: 'accepted' } : s)
    );
  };

  const handleReject = (startup) => {
    setConnectedStartups(prev => prev.filter(s => s._id !== startup._id));
    setStartups(prev => [...prev, { ...startup, status: null }]);
  };

  const filteredStartups = startups.filter(startup =>
    startup?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Investor Connect
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search startups by name"
            sx={{ mb: 3 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Startups
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Valuation</TableCell>
                      <TableCell>ROI</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStartups.length > 0 ? (
                      filteredStartups.map((startup) => (
                        <TableRow key={startup._id}>
                          <TableCell>{startup.title || 'N/A'}</TableCell>
                          <TableCell>{startup.shortDescription || 'N/A'}</TableCell>
                          <TableCell>{startup.location || 'N/A'}</TableCell>
                          <TableCell>
                            ${startup.companyValuation?.toLocaleString() || 'N/A'}
                          </TableCell>
                          <TableCell>
                            {startup.returnOnInvestment ? `${startup.returnOnInvestment}%` : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="contained" 
                              color="primary"
                              onClick={() => handleConnect(startup)}
                            >
                              Connect
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No startups found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Connection Requests
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {connectedStartups.length > 0 ? (
                      connectedStartups.map((startup) => (
                        <TableRow key={startup._id}>
                          <TableCell>{startup.title || 'N/A'}</TableCell>
                          <TableCell>{startup.shortDescription || 'N/A'}</TableCell>
                          <TableCell>{startup.status}</TableCell>
                          <TableCell>
                            {startup.status === 'pending' && (
                              <>
                                <Button 
                                  variant="contained" 
                                  color="success"
                                  onClick={() => handleAccept(startup)}
                                  sx={{ mr: 1 }}
                                >
                                  Accept
                                </Button>
                                <Button 
                                  variant="contained" 
                                  color="error"
                                  onClick={() => handleReject(startup)}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No connection requests
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvestorConnectj;
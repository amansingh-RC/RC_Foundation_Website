import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import { Link } from 'react-router-dom'

const contact = () => {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [open, setOpen] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setOpen(true)
    setForm({ name: '', email: '', topic: '', message: '' })
  }

  return (
    <>
    <Box>
      <Box sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <AnimatedReveal animation="fadeUp">
            <Typography sx={{ color: 'var(--accent)', fontWeight: 800 }} variant="overline">
              Contact
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 2,
                color: 'var(--text)',
                fontWeight: 950,
                letterSpacing: -1.1,
                lineHeight: 1.04,
                fontSize: { xs: 32, md: 50 },
              }}
            >
              Let’s build impact together.
            </Typography>
            <Typography sx={{ mt: 2, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 650 }}>
              Send a message to learn about partnerships, volunteering, or upcoming community support.
            </Typography>
          </AnimatedReveal>
        </Container>
      </Box>

      <Section sx={{ pt: 0 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <AnimatedReveal animation="fadeUp">
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    background: 'rgba(255,255,255,0.96)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
                    alt="Support team"
                    sx={{ width: '100%', height: 220, objectFit: 'cover' }}
                  />
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ color: 'var(--text)', fontWeight: 950, fontSize: 18 }}>
                      Our response time
                    </Typography>
                  <Typography sx={{ mt: 1, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                    We typically respond within 1–2 business days. If your request is urgent, include that in your message.
                  </Typography></Box>

                  <Box sx={{ mt: 2.5 }}>
                    <Typography sx={{ color: 'var(--accent)', fontWeight: 950, fontSize: 14 }}>
                      Contact details
                    </Typography>
                    <Typography sx={{ mt: 1.2, color: 'var(--text-muted)' }}>
                      Email: <Box component="span" sx={{ fontWeight: 800, color: 'var(--text)' }}>hello@royalcare.org</Box>
                    </Typography>
                    <Typography sx={{ mt: 0.8, color: 'var(--text-muted)' }}>
                      Phone: <Box component="span" sx={{ fontWeight: 800, color: 'var(--text)' }}>+1 (000) 123-4567</Box>
                    </Typography>
                    <Typography sx={{ mt: 0.8, color: 'var(--text-muted)' }}>
                      Location: <Box component="span" sx={{ fontWeight: 800, color: 'var(--text)' }}>Community Partnerships Office</Box>
                    </Typography>
                  </Box>
                </Paper>
              </AnimatedReveal>
            </Grid>

            <Grid item xs={12} md={7}>
              <AnimatedReveal animation="fadeUp" delay={0.05}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 4,
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    background: 'rgba(255,255,255,0.96)',
                  }}
                >
                  <Typography sx={{ color: 'var(--text)', fontWeight: 950, fontSize: 18 }}>
                    Send a message
                  </Typography>

                  <Box component="form" onSubmit={submit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      {[
                        { label: 'Your name', value: form.name, field: 'name', type: 'text' },
                        { label: 'Email', value: form.email, field: 'email', type: 'email' },
                      ].map((field) => (
                        <Grid item xs={12} sm={6} key={field.field}>
                          <TextField
                            required
                            label={field.label}
                            type={field.type}
                            value={field.value}
                            onChange={(e) => setForm((s) => ({ ...s, [field.field]: e.target.value }))}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ style: { color: 'rgba(15, 23, 42, 0.7)' } }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(243, 244, 246, 0.95)',
                                color: 'var(--text)',
                                borderColor: 'rgba(15, 23, 42, 0.12)',
                              },
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15, 23, 42, 0.12)' },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15, 23, 42, 0.2)' },
                              '& .MuiInputBase-input': { color: 'var(--text)' },
                            }}
                          />
                        </Grid>
                      ))}

                      <Grid item xs={12}>
                        <TextField
                          label="Topic"
                          value={form.topic}
                          onChange={(e) => setForm((s) => ({ ...s, topic: e.target.value }))}
                          fullWidth
                          variant="outlined"
                          InputLabelProps={{ style: { color: 'rgba(15, 23, 42, 0.7)' } }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(243, 244, 246, 0.95)',
                              color: 'var(--text)',
                              borderColor: 'rgba(15, 23, 42, 0.12)',
                            },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15, 23, 42, 0.12)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15, 23, 42, 0.2)' },
                            '& .MuiInputBase-input': { color: 'var(--text)' },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          label="Message"
                          value={form.message}
                          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                          fullWidth
                          multiline
                          rows={5}
                          variant="outlined"
                          InputLabelProps={{ style: { color: 'rgba(15, 23, 42, 0.7)' } }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(243, 244, 246, 0.95)',
                              color: 'var(--text)',
                              borderColor: 'rgba(15, 23, 42, 0.12)',
                            },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15, 23, 42, 0.12)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15, 23, 42, 0.2)' },
                            '& .MuiInputBase-input': { color: 'var(--text)' },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2.2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          borderRadius: 999,
                          bgcolor:
                            'linear-gradient(135deg, rgba(236, 210, 74, 0.95), rgba(181, 138, 31, 0.95))',
                          boxShadow: '0 14px 40px rgba(181, 138, 31, 0.16)',
                          color: '#08101d',
                          '&:hover': {
                            bgcolor:
                              'linear-gradient(135deg, rgba(236, 210, 74, 1), rgba(181, 138, 31, 1))',
                          },
                        }}
                      >
                        Send message
                      </Button>
                      <Button
                        component={Link}
                        to="/pillars"
                        sx={{
                          borderRadius: 999,
                          color: 'var(--text)',
                          border: '1px solid rgba(15, 23, 42, 0.16)',
                          bgcolor: 'rgba(243, 244, 246, 0.95)',
                          '&:hover': { bgcolor: 'rgba(229, 231, 235, 0.95)' },
                        }}
                      >
                        Learn our pillars
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </AnimatedReveal>
            </Grid>
          </Grid>
        </Container>
      </Section>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpen(false)}>
          Message sent! (Demo) We’ll reach out shortly.
        </Alert>
      </Snackbar>
    </Box>
    </>
  )
}

export default contact


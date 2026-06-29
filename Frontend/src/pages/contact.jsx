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

const contact = () => {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [open, setOpen] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    // Placeholder submit; can be wired to backend later.
    setOpen(true)
    setForm({ name: '', email: '', topic: '', message: '' })
  }

  return (
    <Box>
      <Box sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <AnimatedReveal animation="fadeUp">
            <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 800 }} variant="overline">
              Contact
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 2,
                color: 'white',
                fontWeight: 950,
                letterSpacing: -1.1,
                lineHeight: 1.04,
                fontSize: { xs: 32, md: 50 },
              }}
            >
              Let’s build impact together.
            </Typography>
            <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, maxWidth: 650 }}>
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
                    p: 3,
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  }}
                >
                  <Typography sx={{ color: 'white', fontWeight: 950, fontSize: 18 }}>
                    Our response time
                  </Typography>
                  <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.74)', lineHeight: 1.8 }}>
                    We typically respond within 1–2 business days. If your request is urgent, include that in your message.
                  </Typography>

                  <Box sx={{ mt: 2.5 }}>
                    <Typography sx={{ color: 'rgba(33, 203, 255, 0.95)', fontWeight: 950, fontSize: 14 }}>
                      Contact details
                    </Typography>
                    <Typography sx={{ mt: 1.2, color: 'rgba(255,255,255,0.84)' }}>
                      Email: <Box component="span" sx={{ fontWeight: 800 }}>hello@royalcare.org</Box>
                    </Typography>
                    <Typography sx={{ mt: 0.8, color: 'rgba(255,255,255,0.84)' }}>
                      Phone: <Box component="span" sx={{ fontWeight: 800 }}>+1 (000) 123-4567</Box>
                    </Typography>
                    <Typography sx={{ mt: 0.8, color: 'rgba(255,255,255,0.84)' }}>
                      Location: <Box component="span" sx={{ fontWeight: 800 }}>Community Partnerships Office</Box>
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
                    border: '1px solid rgba(255,255,255,0.10)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  }}
                >
                  <Typography sx={{ color: 'white', fontWeight: 950, fontSize: 18 }}>
                    Send a message
                  </Typography>

                  <Box component="form" onSubmit={submit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Your name"
                          value={form.name}
                          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                          fullWidth
                          variant="outlined"
                          InputLabelProps={{ style: { color: 'rgba(255,255,255,0.75)' } }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(255,255,255,0.03)',
                              color: 'white',
                              borderColor: 'rgba(255,255,255,0.14)',
                            },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.14)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.22)' },
                            '& .MuiInputBase-input': { color: 'white' },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                          fullWidth
                          variant="outlined"
                          InputLabelProps={{ style: { color: 'rgba(255,255,255,0.75)' } }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(255,255,255,0.03)',
                              color: 'white',
                              borderColor: 'rgba(255,255,255,0.14)',
                            },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.14)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.22)' },
                            '& .MuiInputBase-input': { color: 'white' },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Topic"
                          value={form.topic}
                          onChange={(e) => setForm((s) => ({ ...s, topic: e.target.value }))}
                          fullWidth
                          variant="outlined"
                          InputLabelProps={{ style: { color: 'rgba(255,255,255,0.75)' } }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(255,255,255,0.03)',
                              color: 'white',
                              borderColor: 'rgba(255,255,255,0.14)',
                            },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.14)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.22)' },
                            '& .MuiInputBase-input': { color: 'white' },
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
                          InputLabelProps={{ style: { color: 'rgba(255,255,255,0.75)' } }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(255,255,255,0.03)',
                              color: 'white',
                              borderColor: 'rgba(255,255,255,0.14)',
                            },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.14)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.22)' },
                            '& .MuiInputBase-input': { color: 'white' },
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
                            'linear-gradient(135deg, rgba(33, 203, 255, 0.95), rgba(140, 90, 255, 0.95))',
                          boxShadow: '0 14px 40px rgba(110, 160, 255, 0.25)',
                          '&:hover': {
                            bgcolor:
                              'linear-gradient(135deg, rgba(33, 203, 255, 1), rgba(140, 90, 255, 1))',
                          },
                        }}
                      >
                        Send message
                      </Button>
                      <Button
                        href="/pillers"
                        sx={{
                          borderRadius: 999,
                          color: 'rgba(255,255,255,0.92)',
                          border: '1px solid rgba(255,255,255,0.16)',
                          bgcolor: 'rgba(255,255,255,0.06)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.10)' },
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
  )
}

export default contact


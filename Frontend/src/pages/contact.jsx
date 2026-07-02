import { useState } from 'react'
import { Box, Grid, Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import SeoTags from '../components/SeoTags'
import PageHero from '../components/PageHero'
import { usePageContent, CMS_BASE_URL } from '../lib/usePageContent'
import { Link } from 'react-router-dom'

const FALLBACK = {
  hero: {
    eyebrow: 'Contact',
    title: 'Let’s build impact together.',
    description: 'Send a message to learn about partnerships, volunteering, or upcoming community support.',
  },
  infoCard: {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    responseTitle: 'Our response time',
    responseText: 'We typically respond within 1–2 business days. If your request is urgent, include that in your message.',
    email: 'info@royalcarefoundation.com',
    phone: '+91 98765 43210',
    location: '123 Royal Street, Mahape',
  },
  form: {
    heading: 'Send a message',
    submitLabel: 'Send message',
    secondaryCtaLabel: 'Learn our pillars',
    secondaryCtaLink: '/pillars',
    successMessage: 'Message sent! We’ll reach out shortly.',
  },
}

const fieldSx = {
  '& .MuiOutlinedInput-root': { bgcolor: '#fff', borderRadius: 2 },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-strong)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--accent)' },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--accent)' },
  '& .MuiInputBase-input': { color: 'var(--text)' },
  '& .MuiInputLabel-root': { color: 'var(--text-muted)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--accent-deep)' },
}

const InfoRow = ({ label, value, href }) => (
  <Box sx={{ mt: 1.5 }}>
    <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-faint)' }}>{label}</Typography>
    {href ? (
      <Typography component="a" href={href} sx={{ color: 'var(--text)', fontWeight: 600, '&:hover': { color: 'var(--accent-deep)' } }}>{value}</Typography>
    ) : (
      <Typography sx={{ color: 'var(--text)', fontWeight: 600 }}>{value}</Typography>
    )}
  </Box>
)

const Contact = () => {
  const { content, seo } = usePageContent('contact')
  const c = { ...FALLBACK, ...(content || {}) }
  const { hero, infoCard, form } = c

  const [values, setValues] = useState({ name: '', email: '', topic: '', message: '' })
  const [toast, setToast] = useState({ open: false, ok: true, msg: '' })
  const [sending, setSending] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const message = values.topic ? `Topic: ${values.topic}\n\n${values.message}` : values.message
      const res = await fetch(`${CMS_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, message }),
      })
      if (!res.ok) throw new Error('Could not send your message. Please try again.')
      setToast({ open: true, ok: true, msg: form.successMessage || 'Message sent!' })
      setValues({ name: '', email: '', topic: '', message: '' })
    } catch (err) {
      setToast({ open: true, ok: false, msg: err.message })
    } finally {
      setSending(false)
    }
  }

  return (
    <Box>
      <SeoTags seo={seo} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      <Section>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <AnimatedReveal animation="fadeUp">
              <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                {infoCard.image && <Box component="img" src={infoCard.image} alt="Support team" sx={{ width: '100%', height: 220, objectFit: 'cover' }} />}
                <Box sx={{ p: 4 }}>
                  <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 20 }}>{infoCard.responseTitle}</Typography>
                  <Typography sx={{ mt: 1, color: 'var(--text-muted)', lineHeight: 1.8 }}>{infoCard.responseText}</Typography>
                  <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid var(--border)' }}>
                    <InfoRow label="Email" value={infoCard.email} href={`mailto:${infoCard.email}`} />
                    <InfoRow label="Phone" value={infoCard.phone} href={`tel:${(infoCard.phone || '').replace(/\s/g, '')}`} />
                    <InfoRow label="Location" value={infoCard.location} />
                  </Box>
                </Box>
              </Paper>
            </AnimatedReveal>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <AnimatedReveal animation="fadeUp" delay={0.05}>
              <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid var(--border)', background: 'var(--panel)', boxShadow: 'var(--shadow-sm)' }}>
                <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 22 }}>{form.heading}</Typography>
                <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField required label="Your name" value={values.name} onChange={(e) => setValues((s) => ({ ...s, name: e.target.value }))} fullWidth sx={fieldSx} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField required type="email" label="Email" value={values.email} onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))} fullWidth sx={fieldSx} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField label="Topic" value={values.topic} onChange={(e) => setValues((s) => ({ ...s, topic: e.target.value }))} fullWidth sx={fieldSx} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField required label="Message" value={values.message} onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))} fullWidth multiline rows={5} sx={fieldSx} />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button type="submit" disabled={sending} variant="contained" disableElevation
                      sx={{ borderRadius: 999, px: 4, py: 1.3, background: 'linear-gradient(135deg, #d4a24e, #b58a1f)', color: '#fff', fontWeight: 700, '&:hover': { background: 'linear-gradient(135deg, #dcae5a, #c2962a)' }, '&.Mui-disabled': { color: '#fff', opacity: 0.6 } }}>
                      {sending ? 'Sending…' : form.submitLabel}
                    </Button>
                    <Button component={Link} to={form.secondaryCtaLink || '/pillars'}
                      sx={{ borderRadius: 999, px: 3, color: 'var(--text)', border: '1px solid var(--border-strong)', fontWeight: 600, '&:hover': { borderColor: 'var(--accent)', bgcolor: 'var(--accent-soft)' } }}>
                      {form.secondaryCtaLabel}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </AnimatedReveal>
          </Grid>
        </Grid>
      </Section>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast((t) => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={toast.ok ? 'success' : 'error'} variant="filled" onClose={() => setToast((t) => ({ ...t, open: false }))}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Contact

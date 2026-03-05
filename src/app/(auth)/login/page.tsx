'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const router   = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#080808',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        padding: '40px',
        background: '#111',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <h1 style={{ color: '#C9A84C', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Sign in
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 32 }}>
          Welcome back to Iconoir
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: 'block',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 8
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#161616',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                color: '#fff',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 8
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#161616',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                color: '#fff',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(230,57,70,0.1)',
              border: '1px solid rgba(230,57,70,0.3)',
              borderRadius: 10,
              color: '#E63946',
              fontSize: 13,
              marginBottom: 16
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? 'rgba(201,168,76,0.5)' : '#C9A84C',
              color: '#000',
              border: 'none',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: 12
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          
          <a  href="/register"
            style={{
              display: 'block',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
              textDecoration: 'none'
            }}
          >
            No account yet?{' '}
            <span style={{ color: '#C9A84C' }}>Sign up</span>
          </a>
        </form>
      </div>
    </div>
  )
}

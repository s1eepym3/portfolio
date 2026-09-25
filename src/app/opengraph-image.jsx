import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mohammad Haykhal - Backend Developer & Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E0D0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#EDE8DC',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          Mohammad Haykhal
        </div>
        <div style={{ fontSize: 40, color: '#C9A961', fontStyle: 'italic', fontFamily: 'serif' }}>
          Backend Developer & Software Engineer
        </div>
      </div>
    ),
    { ...size }
  )
}

'use client';

interface EmailButtonProps {
  mailtoLink: string;
}

export default function EmailButton({ mailtoLink }: EmailButtonProps) {
  return (
    <a
      href={mailtoLink}
      className="what-cta-button"
      style={{
        display: 'inline-block',
        padding: '14px 28px',
        backgroundColor: '#D43225',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '17px',
        fontWeight: 600,
        transition: 'all 0.2s',
        border: 'none',
        cursor: 'pointer',
        marginTop: '48px'
      }}
    >
      Send Email
    </a>
  );
}

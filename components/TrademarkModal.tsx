'use client';

interface TrademarkModalProps {
  onClose: () => void;
}

export default function TrademarkModal({ onClose }: TrademarkModalProps) {
  return (
    <div
      className="modal active"
      style={{
        display: 'flex',
        position: 'fixed',
        zIndex: 1000,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: '#fafafa',
          padding: '48px',
          borderRadius: '8px',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          animation: 'slideUp 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="modal-close"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            fontSize: '32px',
            fontWeight: 300,
            color: '#666',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'color 0.2s'
          }}
          onClick={onClose}
        >&times;</span>

        <h3 style={{ fontFamily: '"Passion One", sans-serif', fontSize: '32px', marginBottom: '24px' }}>
          Why the ™ matters
        </h3>

        <p style={{ marginBottom: '16px' }}>
          Anyone can offer "consulting" or "strategy." But the Pioneers of Purpose Assessment™? The ESI Framework™? The Transaction Architecture™? The Strategic Triptych Assessment™? These are systems we built over twenty-five years. Tested hundreds of iterations and snippets. Refined until they work every time.
        </p>

        <p style={{ margin: 0 }}>
          Others might try similar approaches. We can't speak to their results. We can only guarantee ours.
        </p>
      </div>
    </div>
  );
}

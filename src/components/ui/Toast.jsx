import React, { useEffect, useState } from 'react';

export default function Toast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const flag = sessionStorage.getItem('order_processing_toast');
    if (!flag) return;
    // clear flag so it only shows once
    sessionStorage.removeItem('order_processing_toast');
    // small delay so navigation feels complete
    const showTimer = setTimeout(() => {
      setMessage('Order processing');
      setVisible(true);
      // auto-dismiss after 3s
      const hide = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(hide);
    }, 400);

    return () => clearTimeout(showTimer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed right-4 bottom-6 z-50">
      <div className="vintage-card px-4 py-3 shadow-vintage">
        <div className="text-deepBrown">{message}</div>
      </div>
    </div>
  );
}

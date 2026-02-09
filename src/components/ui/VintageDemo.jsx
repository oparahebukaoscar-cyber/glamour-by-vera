import React from 'react';

export default function VintageDemo() {
  return (
    <div className="p-6 bg-beige rounded-lg shadow-vintage">
      <h2 className="vintage-heading text-3xl mb-3">Vintage Luxury</h2>
      <p className="text-deepBrown mb-4">A quick preview of the vintage theme tokens and utilities.</p>
      <div className="flex gap-3">
        <button className="vintage-btn">Shop the Look</button>
        <button className="vintage-btn bg-transparent border border-cocoa text-deepBrown">Learn More</button>
      </div>
    </div>
  );
}

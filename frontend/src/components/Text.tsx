import  { useState } from 'react';

function MyComponent() {
  const [name, setName] = useState("Aditya");

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

export default MyComponent;
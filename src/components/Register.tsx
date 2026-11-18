import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '../firebase';

function Register() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

async function handleRegister() {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log('Account created:', userCredential.user.uid);
  } catch (error) {
    console.log('Registration error:', error);
  }
}

  return (
    <div>
        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<button onClick={() => void handleRegister()}>
  Create account
</button>
    </div>
  );
}

export default Register;
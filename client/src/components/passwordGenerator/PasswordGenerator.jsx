import React, { useState } from 'react';

const PasswordGenerator = ({ onGeneratePassword }) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const generatePassword = () => {
    let characters = '';

    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSpecialChars) characters += '!@#$%^&*()_+';

    let newPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters.charAt(randomIndex);
    }

    setPassword(newPassword);
    setIsCopied(false);
    onGeneratePassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
  };

  return (
    <div>
      <h2>Password Generator</h2>
      <form>
        <label>
          Length:
          <input
            type="number"
            min="8"
            max="204"
            value={length}
            onChange={(e) => setLength(Math.max(8, Math.min(204, e.target.value)))}
          />
        </label>
        <br />
        <label>
          Include Uppercase:
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
        </label>
        <label>
          Include Lowercase:
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
        </label>
        <label>
          Include Numbers:
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
        </label>
        <label>
          Include Special Characters:
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
          />
        </label>
        <br />
        <button type="button" onClick={generatePassword}>
          Generate Password
        </button>
      </form>
      {password && (
        <div>
          <h3>Generated Password:</h3>
          <div>{password}</div>
          <button type="button" onClick={copyToClipboard}>
            Copy to Clipboard
          </button>
          {isCopied && <div>Successfully copied to clipboard!</div>}
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
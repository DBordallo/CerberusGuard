import crypto from 'crypto';

const secretKey = crypto.randomBytes(32).toString('hex');
('Generated Key:', secretKey);
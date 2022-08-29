const hours = 24,
  minutes = 60,
  seconds = 60,
  milliseconds = 1000;
const oneDay = hours * minutes * seconds * milliseconds;
export default {
  httpOnly: true,
  sameSite: 'none',
  secure: process.env.NODE_ENV === 'production',
  maxAge: oneDay
}
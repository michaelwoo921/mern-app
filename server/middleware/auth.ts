import jwt from 'jsonwebtoken';

export async function auth(req: any, res: any, next: Function) {
  // get token from authorization header bearer token
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(400).json({ msg: 'unauthorized' });
  }
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2) {
    return res.status(400).json({ msg: 'unauthorized' });
  }

  const [tokenType, tokenValue] = tokenParts;
  if (tokenType.toLowerCase() === 'bearer') {
    try {
      jwt.verify(
        tokenValue,
        process.env.jwtKey as string,
        (error: any, decoded: any) => {
          if (error) {
            return res.status(400).json({ msg: 'invalid token' });
          }
          req.user = decoded.user;
          next();
        }
      );
    } catch (err: any) {
      console.error(err.message);
      return res.json(500).send('server error');
    }
  } else {
    return res.json(400).json({ message: 'invalid token' });
  }

  // verify token  then attach user to req
}

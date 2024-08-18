import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

// This returns a promise that can be true or false.
export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

export const createJWT = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json({ message: 'Not authorized' });
        return;
    }

    // The header looks like this: Bearer tokenstring -- split returns an array -- array[1] is the token.
    const [, token] = bearer.split(' ');

    if (!token) {
        res.status(401);
        res.json({ message: 'Invalid token' });
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next();
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({ message: 'Invalid token' })
        return
    }
}
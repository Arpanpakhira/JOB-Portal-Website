import JWT from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // check header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: 'Auth Failed!',
            });
        }

        // extract token
        const token = authHeader.split(' ')[1];

        // verify token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        // attach user to request
        req.user = { userId: decoded.userId };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Authentication Failed!',
        });
    }
};

export default userAuth;

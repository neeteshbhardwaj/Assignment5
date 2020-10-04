const validUserSession = req => req.session.user && req.cookies.user_sid;

module.exports = {
    isUserSessionExists: (req) => {
        return validUserSession(req);
    },
    validate: (req, res, next) => {
        if (validUserSession(req)) {
            res.redirect('/dashboard');
        } else {
            next();
        }
    },
    invalidate: (req, res, next) => {
        if (validUserSession(req)) {
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    }
};
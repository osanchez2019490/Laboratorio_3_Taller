export const validateRole = (...roles) => {
    return (req, res, next) => {
        if(!req.admin) {
            return res.status(500).json({
                msg:"You want to verify a role without validating the token first"
            })
        }

        if(!roles.includes(req.admin.role)){
            return res.status(401).json({
                msg: `Unauthorized user, has a role ${req.usuario.role}, authorized roles are ${ roles }`
            })
        }
    }
}
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  // Authorization: {token}
  const token = req.headers['authorization']

  if (token === null)
    return res.sendStatus(401)

  jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      (err, payload) => {
          if (err) return res.sendStatus(403)
          if (payload.exp <= Date.now()) return res.sendStatus(401)
          req.payload = payload
          next()
      }
  )
}
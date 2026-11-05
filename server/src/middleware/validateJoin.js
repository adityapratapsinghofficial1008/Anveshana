import { validateJoin } from '../../../shared/join.js'
import { AppError } from '../utils/AppError.js'

export function validateJoinRequest(req, res, next) {
  const { valid, data, errors } = validateJoin(req.body)

  if (!valid) {
    return next(new AppError(400, 'Please check the highlighted fields.', errors))
  }

  req.joinRequest = data
  next()
}

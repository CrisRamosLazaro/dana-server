import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Schema, model } from "mongoose"

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'The email is required']
  },
  phone: {
    type: String,
    unique: true,
    required: false
  },
  password: {
    type: String,
    required: [true, 'the password is required'],
    minlength: [4, 'The password is too short'],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'AFFECTED', 'HELPER'],
    default: 'CLIENT'
  },
  affectedId: {
    type: Schema.Types.ObjectId,
    ref: 'Affected',
    required: function () { return this.role === 'AFFECTED' }
  },
  helperId: {
    type: Schema.Types.ObjectId,
    ref: 'Helper',
    required: function () { return this.role === 'HELPER' }
  }
}, {
  timestamps: true
})

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword
  next()
})

userSchema.methods.signToken = function () {
  const { _id, email, role } = this
  const payload = { _id, email, role }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )
  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

export default model("User", userSchema)
import { Schema, model, models } from 'mongoose'

// criamos um schema com todos os campos daquele 
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already existes'],
        required: [true, 'Email is requerid']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    image: {
        type: String
    },
    bookmarks: [
        {
            // o array de favoritos vem a partir do ID das propriedades
            type: Schema.Types.ObjectId,
            // a coleção de onde vamos tirar os IDs
            ref: 'Property'
        }
    ]
}, {
    // adição do createdAt e updatedAt -> não precisa ser "manual"
    timestamps: true
})

const User = models.User || model('User', UserSchema)

export default User

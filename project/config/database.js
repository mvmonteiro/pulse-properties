import mongoose from 'mongoose'

// flag que verifica a conexão com o banco
let connected = false

// o objeto do mongoose retorna uma promise -> um objeto assincrono
const connectDB = async () => {
    // strict query -> assegura que somente os campos especificados no schema serão salvos no banco
    mongoose.set('strictQuery', true)

    // if the db is already connected, dont connect again
    if (connected) {
        console.log('MongoDB is already connected...')
        return
    }

    // connect to MongoDB
    try {
        // passa a url do projeto que deve ser conectado ao banco
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
        console.log('MongoDB connected...')
    }
    catch (err) {
        console.log(err)
    }
}

export default connectDB
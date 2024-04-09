import {getServerSession} from 'next-auth'
import {authOptions} from '@/utils/auth/authOptions'

export const getSessionUser = async () => {
    try{
        const session = await getServerSession(authOptions)
        
        if (!session || session.user === null) {
            return null
        }
        
        return {
            user: session.user,
            userId: session.user.id
        }
    }
    catch (err) {
        console.error(err)
        return null
    }
}
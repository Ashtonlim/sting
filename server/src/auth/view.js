import {router} from express;

const router = Router()

router.get('/', (req, res) => {
    console.log('test auth')
    console.log(req.body)
})

export default router
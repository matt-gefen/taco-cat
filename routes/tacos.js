import {Router} from 'express'
import tacosCtrl from '../controllers/tacos.js'

const router = Router()

router.get('/', tacosCtrl.index)

export {
  router
}
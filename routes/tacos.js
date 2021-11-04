import {Router} from 'express'
import * as tacosCtrl from '../controllers/tacos.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', tacosCtrl.index)
router.post('/', isLoggedIn, tacosCtrl.create)
router.get('/:id', tacosCtrl.show)
router.patch('/:id/flip-tasty', isLoggedIn, tacosCtrl.flipTasty)

export {
  router
}
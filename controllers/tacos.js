import {Taco} from '../models/taco.js'

function index(req, res) {
  // find all tacos
  Taco.find({})
    .then(tacos => {
      // do something with the tacos
      res.render("tacos/index", {
        title: "🌮",
        tacos
      })
    })
    .catch(
      error => {
        console.log(error)
        res.redirect("/tacos")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
	req.body.tasty = !!req.body.tasty
  Taco.create(req.body)
    .then(res.redirect('/tacos'))
    .catch(error => {
      console.log(error)
      res.redirect("/tacos")
    }) 
}

export {
  index,
  create
}
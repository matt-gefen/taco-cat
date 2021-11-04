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

function show(req,res) {
  Taco.findById(req.params.id)
  .populate("owner")
    .then(taco =>
      {
        res.render("tacos/show", {
          taco,
          title: `🌮 ${taco.name}`
        })
      }
    )
    .catch(error => {
      console.log(error)
      res.redirect("/tacos")
    })
}

function flipTasty(req, res) {
  console.log(req.params)
  Taco.findById(req.params.id) 
    .then(taco => {
      taco.tasty = !taco.tasty
      taco.save()
    })
    .then(()=> {
      res.redirect(`/tacos/${taco._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/tacos/${req.params.id}`)
    })
}

export {
  index,
  create,
  show,
  flipTasty
}
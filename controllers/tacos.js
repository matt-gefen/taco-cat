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

function edit(req, res) {

  Taco.findById(req.params.id)
  .then(taco => {
    res.render("tacos/edit",{
      title: 'Edit 🌮',
      taco
    })
  })
  .catch((error) => {
    console.log(error)
    res.redirect('/tacos')
  })
}

function update(req, res) {
  Taco.findById(req.params.id)
  .then(taco => {
    if (taco.owner.equals(req.user.profile._id)) {
      req.body.tasty = !!req.body.tasty
      // this matters for react
      taco.update(req.body, {new: true})
      .then(() => {
        res.redirect(`/tacos/${taco._id}`)
        }
      )
    }
    else {
      // the person that created the taco isn't the editor
      throw new Error ('You dont own this taco')
    }
  })
  // new true ensures that the taco grabbed here is the new version of the taco
  .catch((error) => {
    res.redirect(`/tacos`)
  }
  )
  
}

function deleteTaco(req, res) {
  Taco.findById(req.params.id) 
  .then(taco => {
    if (taco.owner.equals(req.user.profile._id)) {
      taco.delete()
      .then(() => {
        res.redirect("/tacos")
      })
    }
    else {
      throw new Error ("You don't own this taco")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

export {
  index,
  create,
  show,
  flipTasty,
  edit,
  update,
  deleteTaco as delete
}
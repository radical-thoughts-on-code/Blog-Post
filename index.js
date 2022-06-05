const express = require("express")
const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

const posts = []

// Placeholder Contents
const homeContent =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea obcaecati repellendus a saepe mollitia, error natus sequi odio recusandae distinctio laboriosam, inventore eligendi, dignissimos laborum esse dolor aspernatur fugiat consectetur harum fuga? Doloribus, sed reiciendis placeat nostrum libero ex adipisci?"
const aboutContent =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos blanditiis provident earum at quos reiciendis nobis amet distinctio! Velit eveniet veniam tenetur ut dolorem inventore ullam hic culpa consectetur exercitationem?"
const contactContent =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, beatae accusantium quia, impedit quam perferendis nulla fuga odio perspiciatis fugit consectetur mollitia libero placeat, quidem corrupti eos vel dolorum labore. Libero, esse. Corporis recusandae adipisci aut nobis dolore numquam soluta."

app.get("/", (req, res) => {
  res.render("home", { header: "Home", content: homeContent, newPosts: posts })
})

app.get("/about", (req, res) => {
  res.render("about", { header: "About", content: aboutContent })
})

app.get("/contact", (req, res) => {
  res.render("contact", { header: "Contact", content: contactContent })
})

app.get("/compose", (req, res) => {
  res.render("compose", { header: "Compose" })
})

app.post("/compose", (req, res) => {
  const tilte = req.body.postTitle
  const content = req.body.postMsg
  const postObject = {
    postTitle: "",
    postMessage: "",
  }

  if (tilte && content) {
    postObject.postTitle = tilte
    postObject.postMessage = content
    posts.unshift(postObject)
    res.redirect("/")
  } else if (req.body.postMsg) {
    postObject.postMessage = content
    posts.unshift(postObject)
    res.redirect("/")
  }
})

app.listen(2500, () => {
  console.log("App is running at port: 2500")
})

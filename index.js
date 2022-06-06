const express = require("express")
const _ = require("lodash")
const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

const posts = []

// Placeholder Contents for Home, about and contact pages
const homeContent =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea obcaecati repellendus a saepe mollitia, error natus sequi odio recusandae distinctio laboriosam, inventore eligendi, dignissimos laborum esse dolor aspernatur fugiat consectetur harum fuga? Doloribus, sed reiciendis placeat nostrum libero ex adipisci?"
const aboutContent =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos blanditiis provident earum at quos reiciendis nobis amet distinctio! Velit eveniet veniam tenetur ut dolorem inventore ullam hic culpa consectetur exercitationem?"
const contactContent =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, beatae accusantium quia, impedit quam perferendis nulla fuga odio perspiciatis fugit consectetur mollitia libero placeat, quidem corrupti eos vel dolorum labore. Libero, esse. Corporis recusandae adipisci aut nobis dolore numquam soluta."

//Get request to home route
app.get("/", (req, res) => {
  res.render("home", { header: "Home", content: homeContent, newPosts: posts })
})

//Get request to about route
app.get("/about", (req, res) => {
  res.render("about", { header: "About", content: aboutContent })
})

//Get contact to home route
app.get("/contact", (req, res) => {
  res.render("contact", { header: "Contact", content: contactContent })
})

// Hidden route to compose page
app.get("/compose", (req, res) => {
  res.render("compose", { header: "Compose" })
})

// Post route from compose page
app.post("/compose", (req, res) => {
  const title = req.body.title
  const content = req.body.message
  const postObject = {
    title: "",
    message: "",
  }

  /**Control flow for blog post content */
  if (title && content) {
    postObject.title = title
    postObject.message = content
    posts.unshift(postObject)
    res.redirect("/") // Redirect user to hompage after blog post is updated
  } else if (content) {
    postObject.message = content
    posts.unshift(postObject)
    res.redirect("/") // Redirect user to hompage after blog post is updated
  }
})

app.get("/posts/:postName", (req, res) => {
  const postTitle = _.lowerCase(req.params.postName)

  const findPost = posts.find((post) => {
    const title = _.lowerCase(post.title)
    return title === postTitle
  })
  if(findPost){
    res.render("posts", { header: findPost.title, content: findPost.message })
  }else{
    res.render('posts', {header: "SORRY!", content: "Please try another post"})
    console.log( "Could not get post. \nReading: " + findPost)
  }
  
})


app.listen(2500, () => {
  console.log("App is running at port: 2500")
})

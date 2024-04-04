import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/:user",(c)=>{
  const user = c.req.param("user")
  return c.text(`hello ${user}`)
})

//export default app

export default{
  port : 5000,
  fetch : app.fetch
}

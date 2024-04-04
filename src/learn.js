import {Hono} from 'hono'
import { v4 as uuidv4} from "uuid";
import { stream, streamText, streamSSE } from 'hono/streaming'
const app =new Hono()

let videos = []

app.get('/',(c)=>{
    return c.html(<h1>Hey this hono crash cousre</h1>)
})

app.post('/video',async (c)=>{
    const {videoId,videoName,videoDescrition} = await c.req.json();

    const newVideo = {
        id: uuidv4(),
        videoName,
        videoDescrition,
        videoId
    }

    videos.push(newVideo)
    return c.json(newVideo)

})


// try to stream a data from first time:
app.get('/videos',(c)=>{
    return streamText(c, async(stream) => {
        for (const video of videos) {
            await stream.writeln(JSON.stringify(video));
            await stream.sleep(100);
        }
    })
})
//this is working Yeah!!


export default app;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const {Videos, VideoDetails} = require('./Models/pfxVideos')

const app = express();
app.use(express.json());
app.use(cors())

const port = 4003 || process.env.PORT;

mongoose.connect('mongodb+srv://giribabu83567:Giribabu8829@cluster0.93oh4kh.mongodb.net/pfxWatch?retryWrites=true&w=majority')
    .then(()=> console.log('Database connected'))
    .catch((error)=> console.log(error))

// app.get('/', (request, response)=> {
//     response.send('PFX WATCH')
// });

/* Store data in database */
const addVideos = async ()=>{
    try 
    {
       const videoDetails = new  VideoDetails({
            video_url: 'https://www.youtube.com/watch?v=fpmSOInFj4A',
            video_title: 'Neeraj Chopras Golden Moment! 🥇 Full Mens Javelin Final | Tokyo Replays',
            description: `We throw it back to Tokyo 2020 when India’s Neeraj Chopra threw 87.58m early in the competition to take the gold in the men’s javelin final, with Czechs Jakub Vadlejch and Vítězslav Veselý going silver and bronze respectively with season-best throws.`,
            views_count: '5M views',
            published_date: 'Sep 23, 2021',
            channel_logo: 'https://yt3.ggpht.com/ytc/AIf8zZTwbFDlM-J3M6s0Bj8G3wR7CRYj5j-v_8VgSl_3W_U=s88-c-k-c0x00ffffff-no-rj',
            channel_name: 'Olympics',
            subscribers: '10.6M subscribers',
            category: 'Gaming'
       });
       const storeVideoDetails = await videoDetails.save();

       const videos = new Videos({
            _id: storeVideoDetails._id,
            thumbnail_url: 'https://i.ytimg.com/vi/fpmSOInFj4A/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC2if8BFpEjomVBCu3fdsNKt5fM5Q',
            title: 'Neeraj Chopras Golden Moment! 🥇 Full Mens Javelin Final | Tokyo Replays',
            channel_logo: 'https://yt3.ggpht.com/ytc/AIf8zZTwbFDlM-J3M6s0Bj8G3wR7CRYj5j-v_8VgSl_3W_U=s88-c-k-c0x00ffffff-no-rj',
            channel_name: 'Olympics',
            publishedDate: 'Sep 23, 2021',
            views_count: '5M views',
            category: 'Gaming'
       });
       await videos.save();
       await mongoose.disconnect();
    } 
    catch (error) 
    {
        console.log(`Error at Sending data to DB : ${error}`)
    }
};
// addVideos();

app.use('/auth', require('./Routes/authentication'))
app.use('/api', require('./Routes/videosAPI'))

app.listen(port, ()=> {
    console.log(`Server running at ${port}`)
});
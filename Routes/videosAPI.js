const express = require('express');
const router = express.Router();

const tokenAuthentication = require('../Middleware/tokenAuthen')
const {Videos, VideoDetails} = require('../Models/pfxVideos')

/* all videos API */
router.get('/home', tokenAuthentication, async (request, response)=> {
    
    try 
    {
        const {search, category} = request.query;
        const query = {}

        if(search){
            query.title = { $regex: search, $options: 'i'}
        }

        if(category){
            query.category = {$regex: category, $options: 'i'}
        }

        const filteredVideos = await Videos.find(query)
        if(filteredVideos.length === 0){
            return response.json({message: 'No videos found'})
        }

        return response.status(200).json({message: filteredVideos})
    } 
    catch (error) 
    {
        console.log(`Error at Videos API : ${error}`)
        return response.status(500).json({message: 'Internal Server Error at All-Videos API'})
    }
});

/* Video Details API */
router.get('/videos/:videoId', tokenAuthentication, async (request, response)=> {
    try 
    {
        const {videoId} = request.params
        const getVideoDetails = await VideoDetails.findOne({_id: videoId})

        return response.status(200).json({VideoDetails: getVideoDetails})
    } 
    catch (error) 
    {
        console.log(`Error at Individual Video API : ${error}`);
        return response.status(500).json({message: 'Internal Server Error at Video Details API'})
    }
});

/* Trending Videos */
router.get('/trending', tokenAuthentication, async(request, response)=> {
    try 
    {
        const trendingVideos = await Videos.find({category: 'Trending'})
        return response.status(200).json({Trending: trendingVideos})
    } 
    catch (error)
    {
        console.log(error)
        return response.status(500).json({message: 'Internal Server Error Trending API'})
    }
});

/* Gaming Videos */
router.get('/gaming', tokenAuthentication, async (request, response)=> {
    try 
    {
        const gamingVideos = await Videos.find({category: 'Gaming'})
        return response.status(200).json({Gaming: gamingVideos})
    } 
    catch (error) {
        console.log(`Error at Gaming API: ${error}`)
        return response.status(500).json({message: 'Internal Server Error at Gaming API'})
    }
});

/* Store Saved Videos */
router.put("/saved/:videoId", tokenAuthentication, async(req, res)=>{
   
    try
    {
        const {videoId} = req.params
        const {saved} = req.body;
        const savedVideos = await VideoDetails.findOne({_id:videoId})
        if(!savedVideos)
        {
            return res.status(400).json({message:"video not found"})
        }
        savedVideos.saved = saved; // Assuming 'saved' is a boolean value

        await savedVideos.save();
        return res.status(200).json({saved:savedVideos})
    }
    catch (error) {
        console.log(`Error at saved videos API: ${error}`)
        return response.status(500).json({message: 'Internal Server Error at saved videos API'})
    }
});

/* Saved Videos */
router.get("/savedVideos", tokenAuthentication, async (req,res)=>{
    try
    {
        const savedVideos = await VideoDetails.find({ saved: 'true' });
        return res.status(200).json({savedVideos});

        // const savedVideos = await VideoDetails.find({ saved: true });
        // const savedVideoIds = savedVideos.map(video => video._id);
        // const savedVideoDetails = await Videos.find({ _id: { $in: savedVideoIds } });
        // return res.status(200).json({ savedVideoDetails, savedVideos });
    }
    catch (error) {
        console.log(`Error at Gaming API: ${error}`)
        return response.status(500).json({message: 'Internal Server Error at Gaming API'})
    }
});

module.exports = router;
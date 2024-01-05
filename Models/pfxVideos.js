const mongoose = require('mongoose')
const {Schema} = mongoose;

const allVideosSchema = new Schema({
    thumbnail_url: String,
    title: String,
    channel_logo: String,
    channel_name: String,    
    publishedDate: String,
    views_count: String,
    category: String, 
});
const Videos = mongoose.model('Videos', allVideosSchema);

const individualVideoSchema = new Schema({
    video_url: String,
    video_title: String,
    description: String,
    views_count: String,
    published_date: String,
    channel_logo: String,
    channel_name: String,
    subscribers: String,
    category: String,
    thumbnail_url: String,
    saved:String
});
const VideoDetails = mongoose.model('VideoDetails', individualVideoSchema);

module.exports = {Videos, VideoDetails};
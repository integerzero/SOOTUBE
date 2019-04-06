import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        // Search All videos in Database.
        const videos = await Video.find({});
        res.render("home", { pageTitle: "Home", videos});
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: []});
    }
    
}

export const search = (req, res) => {
    // ES6때 방법은 아래와 같다.
    // const searchingBy = req.query.term;

    // 최신 버젼
    const {
        query: { term : searchingBy }
    } = req;
    console.log(searchingBy);

    res.render("search", { pageTitle: "Search", searchingBy: searchingBy, videos});
}
export const upload = (req, res) => res.render("upload", { pageTitle: "Upload"});

export const postUpload = async (req, res) => {
    const { 
        body: { title, description }, 
        file: { path }
    } = req;
    
    const newVideo = await Video.create({
        fileUrl: path,
        title: title,
        description: description
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = (req, res) => res.render("videoDetail",  { pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video"});
import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        // Search All videos in Database.
        const videos = await Video.find({}).sort({_id: -1});
        res.render("home", { pageTitle: "Home", videos});
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: []});
    }
}

export const search = async(req, res) => {
    // ES6때 방법은 아래와 같다.
    // const searchingBy = req.query.term;

    // 최신 버젼
    const {
        query: { term : searchingBy }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: {$regex:searchingBy, $options:"i"}
        });
    } catch(error) {
        console.log(error);
    }
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

export const videoDetail = async (req, res) => {
    const {
        params: {id}
    } = req;

    try {
        const video = await Video.findById(id);
        res.render("videoDetail",  { pageTitle: video.title, video:video});
        //res.render("videoDetail",  { pageTitle: "Video Detail"});
    } catch(error) {
        console.log(error);
        res.render(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});
    } catch(error) {
        res.redirect(routes.home);
    }
    res.render("editVideo", { pageTitle: "Edit Video"});
};

export const postEditVideo = async (req, res) => {
    const {
        params: {id},
        body: {title, description}
    } = req;
    try {
        // pug name이랑 model의 이름을 맞춰 주면 아래와 같이 코딩가능.
        // await Video.findOneAndUpdate({id}, {title, description});
        await Video.findOneAndUpdate({ _id: id}, {title: title, description: description});
        res.redirect(routes.videoDetail(id));
    } catch(error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: {id}
    } = req;
    try {
        await Video.findOneAndRemove({_id: id});
    } catch(error) {}
    res.redirect(routes.home);
}
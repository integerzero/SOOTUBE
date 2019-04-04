import {videos} from "../db";
import routes from "../routes";

export const home = (req, res) => {
    res.render("home", { pageTitle: "Home", videos});
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

export const postUpload = (req, res) => {
    const {
        body: { file, title, description }
    } = req;
    // TODO: Upload and save video

    res.redirect(routes.videoDetail(324696));
}

export const videoDetail = (req, res) => res.render("videoDetail",  { pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video"});
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { removeUserFromFeed } from "../utils/feedSlice";


const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

const getFeed = async () => {
    if (feed?.length > 0) return;
    try {
        const res = await axios.get(BASE_URL + "feed", { withCredentials: true });
        dispatch(addFeed(res.data));
    } catch (err) {
        console.log(err);
    }
};

const handleSendRequest = async (status, _id) => {
    try{
        const res = await axios.post(BASE_URL + "request/send/"+ status+"/"+ _id, {}, { withCredentials: true });
        console.log(res.data);
        dispatch(removeUserFromFeed(_id));

    }catch(err){
        console.log(err);
    }
};


    useEffect(() => {
        getFeed();
    }, []);

    return(
         feed && (
        <div>
            {feed.length > 0 ? (
                <UserCard user={feed[0]} handleSendRequest={handleSendRequest} />
            ) : (
                <h1 className="text-xl font-bold my-10 text-center">
                    No new users right now
                </h1>
            )}
        </div>
    )
);
};

export default Feed;
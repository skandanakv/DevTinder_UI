
import axious from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useSelector } from "react-redux";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);


    const fetchRequests = async () => {
        try{
            const res = await axious.get(BASE_URL + "user/requests", {
                withCredentials: true
            })

            console.log(res.data.data);
            dispatch(addRequest(res.data.data));

        }catch(err){
            console.log(err);
        }
    }

    const reviewRequest = async (status, _id)=>{
        try{
            const res = await axious.post(BASE_URL + "request/review/" + status +"/" + _id ,{},{withCredentials: true}  )

            console.log(res.data.data);
            dispatch(removeRequest(_id));

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

 const validRequests = (requests || []).filter(
        (r) => r && typeof r === "object"
    );
 
    if (validRequests.length === 0) {
        return (
            <div className="max-w-md mx-auto my-24 px-4 text-center">
                <h1 className="text-2xl font-semibold">No requests yet</h1>
                <p className="mt-2 text-base-content/60">
                    When someone wants to connect, they'll show up here.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 px-4">
            <div className="flex items-baseline gap-3 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Connection requests
                </h1>
                <span className="badge badge-primary badge-lg">
                    {validRequests.length}
                </span>
            </div>

            <ul className="flex flex-col gap-3">
                {validRequests.map((request) => {
                    // the sender is usually nested in fromUserId; fall back to the item itself
                    const sender = request.fromUserId || request;
                    const { firstName, lastName, photoUrl, age, gender, about } = sender;

                    return (
                        <li
                            key={request._id}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 bg-base-200 rounded-2xl p-4 sm:p-5 border border-transparent hover:border-base-content/10 transition-colors"
                        >
                            <img
                                src={photoUrl}
                                alt={firstName}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shrink-0 ring-2 ring-primary/40 ring-offset-2 ring-offset-base-200"
                            />

                            <div className="flex-1 min-w-0">
                                <h2 className="text-lg font-semibold leading-tight truncate">
                                    {firstName} {lastName}
                                </h2>
                                <p className="text-sm text-base-content/60 mt-0.5">
                                    {age}
                                    {age && gender && ", "}
                                    <span className="capitalize">{gender}</span>
                                </p>
                                <p className="text-sm text-base-content/70 mt-2 line-clamp-2">
                                    {about}
                                </p>
                            </div>

                            <div className="flex gap-2 sm:flex-col shrink-0">
                                <button className="btn btn-success btn-sm rounded-full px-6 flex-1"
                                onClick={() => reviewRequest("accepted", request._id)}>
                                    Accept
                                </button>
                                <button className="btn btn-ghost btn-sm rounded-full px-6 flex-1 text-base-content/70 hover:text-error" 
                                onClick={() => reviewRequest("rejected", request._id)}>
                                    Reject
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
 
export default Requests;
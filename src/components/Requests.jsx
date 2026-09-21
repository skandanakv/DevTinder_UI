
import axious from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRequest } from "../utils/requestSlice";
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

    useEffect(() => {
        fetchRequests();
    }, [])

 const validRequests = (requests || []).filter(
        (r) => r && typeof r === "object"
    );
 
    if (validRequests.length === 0) {
        return (
            <h1 className="text-xl font-bold my-10 text-center">
                No requests found
            </h1>
        );
    }
 
    return (
        <div className="max-w-2xl mx-auto my-10 px-4">
            <h1 className="text-xl font-semibold mb-6">
                Requests
                <span className="badge badge-primary ml-3">{validRequests.length}</span>
            </h1>
 
            <div className="flex flex-col gap-4">
                {validRequests.map((request) => {
                    // the sender is usually nested in fromUserId; fall back to the item itself
                    const sender = request.fromUserId || request;
                    const { firstName, lastName, photoUrl, age, gender, about } = sender;
 
                    return (
                        <div
                            key={request._id}
                            className="flex items-center gap-4 bg-base-300 rounded-2xl p-4 shadow-lg"
                        >
                            <img
                                src={photoUrl}
                                alt={firstName}
                                className="w-20 h-20 rounded-full object-cover ring ring-primary ring-offset-2 ring-offset-base-300"
                            />
 
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {firstName} {lastName}
                                </h2>
                                <p className="text-sm text-base-content/60">
                                    {age} · <span className="capitalize">{gender}</span>
                                </p>
                                <p className="text-sm mt-1">{about}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
 
export default Requests;
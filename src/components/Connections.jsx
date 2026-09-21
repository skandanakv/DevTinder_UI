import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "user/connections",
                {
                    withCredentials: true
                }
            );

            console.log(res.data.data);
            dispatch(addConnection(res.data.data));

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    // ignore anything that isn't a user object (e.g. a stray id string from the API)
    const validConnections = (connections || []).filter(
        (c) => c && typeof c === "object"
    );

    if (validConnections.length === 0) {
        return (
            <h1 className="text-xl font-bold my-10 text-center">
                No connections found
            </h1>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 px-4">
            <h1 className="text-xl font-semibold mb-6">
                Connections
                <span className="badge badge-primary ml-3">{validConnections.length}</span>
            </h1>

            <div className="flex flex-col gap-4">
                {validConnections.map((connection) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

                    return (
                        <div
                            key={_id}
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

export default Connections;
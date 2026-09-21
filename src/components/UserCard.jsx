const UserCard = ({ user, onInterested, onIgnore }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  const skillList = (skills || [])
    .flatMap((s) => s.split(","))
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="card bg-base-300 w-96 overflow-hidden shadow-2xl ring-1 ring-white/10">

        <figure className="relative h-96">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-base-300/30 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <h2 className="text-3xl font-bold leading-tight">
              {firstName} {lastName}
            </h2>
            <p className="text-sm text-base-content/70">
              {age && `${age} years old`}
              {age && gender && " · "}
              {gender && <span className="capitalize">{gender}</span>}
            </p>
          </div>
        </figure>

        <div className="card-body gap-4 pt-3">

          {about && (
            <p className="text-sm text-base-content/80 border-l-2 border-primary pl-3">
              {about}
            </p>
          )}


          {skillList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skillList.map((skill) => (
                <span
                  key={skill}
                  className="badge badge-primary badge-outline badge-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}


          <div className="card-actions mt-2 grid grid-cols-2 gap-3">
            <button
              className="btn btn-outline btn-error"
              onClick={onIgnore}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={onInterested}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
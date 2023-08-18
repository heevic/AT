import {connectDB} from "@/utils/mongoDb";
import {ObjectId} from "mongodb";
import {Comment} from "@/components/Board/Comment/Comment";
import DetailsIndex from "@/components/Board/Forum/Details/DetailsIndex";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import LoadingForum from "@/components/UI/Loading/LoadingForum";
import React from "react";

const ForumPost = async (props: any): Promise<JSX.Element> => {
    const USER_SESSION = await getServerSession(authOptions);
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').findOne({
        _id: new ObjectId(props.params.id)
    })
    if (!result) return <LoadingForum/>;

    return (
        <>
            <DetailsIndex
                result={result}
                USER_SESSION={USER_SESSION}
            />
            <Comment _id={result._id.toString()}/>
        </>
    )
}

export default ForumPost;
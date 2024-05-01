import PostCreator from "@components/PostCreator";

import { Link, useParams } from "react-router-dom";

import SendMessageButton from "@components/Utilities/SendMessageButton";
import CustomShareButton from "@components/Utilities/CustomShareButton";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import axios from "axios";

import DeletePost from "./DeletePost";
import { CircularProgress } from "@chakra-ui/react";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      // console.log(currentUser?.id)
      // console.log(post.author)
      // console.log(post)
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/posts/${id}`
        );
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchPost();
  }, []);

  if (loading)
    return (
      <CircularProgress
        isIndeterminate
        size="100px"
        thickness="7px"
        aria-label="cargando"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );

  return (
    <section className="flex flex-col justify-center items-center">
      {error && (
        <p className=" bg-red-500 text-white text-medium px-3 py-3 block mb-2">
          {error}
        </p>
      )}
      {post && (
        <>
         
          <img
            src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${
              post.image
            }`}
            alt=""
            className="w-full h-full mt-20 rounded-md md:w-[35rem]"
          />

          <div className="flex flex-col justify-around items-baseline">
            <h1 className=" text-xl m-auto mt-4 mb-4">{post.title}</h1>

            <div className="flex items-center gap-14">
              <PostCreator authorId={post.author} createdAt={post.createdAt} />
              <Link to={`/posts/location/${location}`}>
                <small className="border py-2 px-3 rounded-md bg-color-btn text-white hover:bg-color-btnHover w-full whitespace-nowrap">
                  {post.location}
                </small>
              </Link>
            </div>
            <div className="flex justify-center items-center m-auto w-full mb-4 mt-4">
              <SendMessageButton
                size={{ base: "xs", md: "sm", lg: "sm", xl: "sm" }}
              />
              <CustomShareButton
                size={{ base: "xs", md: "sm", lg: "sm", xl: "sm" }}
                title={post.title}
                url={`/post/${post.postId}/detail`}
                className="contact-button"
              />
            </div>

            <p
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="mb-5"
            ></p>
          </div>
        </>
      )}
    </section>
  );
};

export default PostDetail;

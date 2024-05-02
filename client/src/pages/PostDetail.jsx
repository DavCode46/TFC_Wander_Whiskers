import PostCreator from "@components/PostCreator";

import { Link, useParams } from "react-router-dom";

import SendMessageButton from "@components/Utilities/SendMessageButton";
import CustomShareButton from "@components/Utilities/CustomShareButton";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import { CircularProgress } from "@nextui-org/react";
import DeletePost from "./DeletePost";

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
        <section>
          <div className="max-w-full mt-[7rem] md:ml-[5rem]">
            <div className=" px-5 py-3">
              <PostCreator authorId={post.author} createdAt={post.createdAt} />
            </div>
            <img
              src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${
                post.image
              }`}
              alt=""
              className="w-full h-auto"
            />

            <div className="flex items-center justify-between">
              <div>
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
              <div className="px-5">
                <Link to={`/posts/location/${post.location}`}>
                  <small className="border py-2 px-3 rounded-md bg-color-btn text-white hover:bg-color-btnHover w-full whitespace-nowrap">
                    {post.location}
                  </small>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-5 px-5 w-full mt-5 mb-5 md:mt-[3rem] md:mb-[4rem]">
            <h1 className=" font-bold">{post.title}</h1>
              <p
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="mb-5"
              ></p>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default PostDetail;

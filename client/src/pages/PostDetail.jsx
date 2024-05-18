import PostCreator from "@components/PostCreator";
import { Link, useParams } from "react-router-dom";
import SendMessageButton from "@components/Utilities/SendMessageButton";
import CustomShareButton from "@components/Utilities/CustomShareButton";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { CircularProgress } from "@nextui-org/react";
import DeletePost from "./DeletePost";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import Yanimation from "@/components/Animations/Yanimation/Yanimation";
import useTheme from "@context/ThemeContext";
import PostDrawer from "@/components/PostDrawer";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const { themeMode } = useTheme();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/posts/${id}`
        );
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
    <section className="flex flex-col items-center justify-center min-h-screen py-10 px-5 bg-gray-100 dark:bg-gray-900">
      {error && (
        <p className="bg-red-500 text-white text-medium px-3 py-3 block mb-2">
          {error}
        </p>
      )}
      {post && (
        <section className="w-full md:w-3/4 max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <FadeAnimation>
              <img
                src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${
                  post.image
                }`}
                alt=""
                className="w-full h-96 object-cover"
              />
            </FadeAnimation>
            <Yanimation>
              <div className="flex items-center justify-between px-3 mt-2">
                <PostCreator
                  authorId={post.author}
                  createdAt={post.createdAt}
                  className="absolute bottom-0 left-0 p-5 bg-black bg-opacity-50 text-white"
                />
                <Link
                  to={`/posts/location/${post.location}`}
                  className={`${
                    themeMode === "dark"
                      ? "bg-a-5 hover:bg-a-6"
                      : "bg-color-btn hover:bg-color-btnHover "
                  } text-white py-2 px-4 rounded-md transition duration-300 hover:text-white`}
                >
                  <small>{post.location}</small>
                </Link>
              </div>
            </Yanimation>
          </div>
          <div className="p-5">
            <h1
              className={`text-2xl font-bold ${
                themeMode === "dark" ? "text-gray-300" : "text-gray-900"
              } mb-5`}
            >
              {post.title}
            </h1>
            <p
              className={`text-lg font-grotesk ${
                themeMode === "dark" ? "text-gray-400" : "text-gray-700"
              } mb-5`}
            >
              {post.content}
            </p>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-3">
                <SendMessageButton size="sm" />
                <CustomShareButton
                  size="sm"
                  title={post.title}
                  url={`/post/${post.postId}/detail`}
                />
              </div>
            </div>
            {currentUser?.id === post.author && (
              <div className="flex items-center justify-end space-x-3">
                <PostDrawer isEditing postId={post._id} />
                <DeletePost postID={post._id} />
              </div>
            )}
          </div>
        </section>
      )}
    </section>
  );
};

export default PostDetail;

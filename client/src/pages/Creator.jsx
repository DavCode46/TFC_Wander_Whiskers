import FilterProvince from "@/components/FilterProvince";
import Post from "@/components/Post";
import useTheme from "@/context/ThemeContext";
import { locationData } from "@/data/data";
import { CircularProgress } from "@chakra-ui/react";
import { Divider, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Creator = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { themeMode } = useTheme();
  const { id } = useParams();

  useEffect(() => {
    const fetchingPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/posts/users/${id}`
        );
        setPosts(res?.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchingPosts();
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

  const handleFilterChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setCurrentPage(1); // Restablecer a la primera página cuando cambian las opciones
  };

  const filteredPosts = selectedOptions.length
    ? posts.filter((post) =>
        selectedOptions.some((option) => post.location === option[1].label)
      )
    : posts;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); // Cambiar a la primera página cuando cambie el tamaño de la página
  };

  // Calcula el índice de inicio y fin de las publicaciones para la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Limita el número de publicaciones a mostrar por página
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <section className="p-[5rem] lg:ml-[7rem]">
      <div>
        <FilterProvince
          options={locationData.map(({ key, label }) => ({
            label,
            value: key,
          }))}
          onChange={(value, selectedOptions) =>
            handleFilterChange(selectedOptions)
          }
        />
      </div>
      <Divider />
      {paginatedPosts.length ? (
        <div className="card-container grid md:grid-cols-1 xl:grid-cols-2 lg:gap-4">
          {paginatedPosts.map(
            (
              {
                _id: postId,
                image,
                title,
                content,
                creatorId,
                createdAt,
                location,
                specie,
                condition,
              },
              index
            ) => (
              <Post
                key={index}
                postId={postId}
                image={image}
                title={title}
                content={content}
                creatorId={creatorId}
                createdAt={createdAt}
                location={location}
                specie={specie}
                condition={condition}
              />
            )
          )}
        </div>
      ) : (
        <h1 className="text-center">No se encontraron publicaciones</h1>
      )}
      <Pagination
        className={`${themeMode === "dark" ? "dark" : ""}`}
        current={currentPage}
        onChange={onPageChange}
        onShowSizeChange={onShowSizeChange}
        total={filteredPosts.length}
        showSizeChanger
        pageSize={pageSize}
        pageSizeOptions={[1, 5, 10, 20, 30]}
        style={{ textAlign: "center", marginTop: "1rem" }}
      />
    </section>
  );
};

export default Creator;

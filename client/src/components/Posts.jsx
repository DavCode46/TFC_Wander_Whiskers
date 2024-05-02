import { useEffect, useState } from "react";
import axios from "axios";
import Post from "@components/Post";
import FilterProvince from "@components/FilterProvince";
import { Pagination } from "antd";
import { Divider } from "antd";
import { locationData } from "@/data/data.js";
import { CircularProgress } from "@chakra-ui/react";
import CustomSearch from "./CustomSearch";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchingPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/posts`
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

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Restablecer a la primera página cuando se realiza una nueva búsqueda
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

  const searchedPosts = searchTerm
    ? filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredPosts;

  // Calcula el índice de inicio y fin de las publicaciones para la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Limita el número de publicaciones a mostrar por página
  // const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  const paginatedPosts = searchedPosts.slice(startIndex, endIndex);

  return (
    <section className="p-[5rem] lg:ml-[7rem]">
       <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
        <div className="md:order-1">
          <CustomSearch onSearch={handleSearch} />
        </div>
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

export default Posts;

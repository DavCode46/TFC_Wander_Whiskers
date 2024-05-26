import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import Yanimation from "@/components/Animations/Yanimation/Yanimation";
import CustomSearch from "@/components/CustomSearch";
import FilterProvince from "@/components/FilterProvince";
import Post from "@/components/Post";
import useTheme from "@/context/ThemeContext";
import { locationData } from "@/data/data";
import { CircularProgress } from "@chakra-ui/react";
import { Divider, Empty, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const LocationPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const {themeMode} = useTheme()
  const { location } = useParams();

  useEffect(() => {
    const fetchingPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/posts/location/${location}`
        );
        setPosts(res?.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchingPosts();
  }, [location]);
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
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Restablecer a la primera página cuando se realiza una nueva búsqueda
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
  const paginatedPosts = searchedPosts.slice(startIndex, endIndex);
  // const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <section className="p-[5rem] lg:ml-[7rem]">
      <Xanimation duration={0.8}>
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
      </Xanimation>

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
              <FadeAnimation delay={index * 0.3} key={crypto.randomUUID()}>
                <Post
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
              </FadeAnimation>
            )
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <Yanimation>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
              description={
                <div>
                  <span className="mt-[3rem]">
                    No se han encontrado{" "}
                    <span className="text-color-btn">anuncios</span>
                  </span>
                  <div className="mt-[3rem]">
                    {" "}
                    {/* Espaciado entre el texto y el botón */}
                    <Link
                      className="bg-color-btn text-white px-3 py-2 rounded-md hover:bg-color-btnHover hover:text-white transition-all duration-300"
                      to="/create-post"
                    >
                      Publicar anuncio
                    </Link>
                  </div>
                </div>
              }
            />
          </Yanimation>
        </div>
      )}
      <Pagination
        className={`${themeMode === 'dark' ? 'dark' : ''}`}
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

export default LocationPosts;

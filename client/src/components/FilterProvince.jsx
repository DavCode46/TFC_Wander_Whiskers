import { Cascader } from "antd";
import { locationData } from "@/data/data.js";
import useTheme from "@context/theme";
import { ArrowRightOutlined, ArrowDownOutlined } from '@ant-design/icons';

const FilterProvince = ({ onChange }) => {
  const { themeMode } = useTheme();

  
  return (
    <Cascader
      options={locationData}
      placeholder="Filtros"
      onChange={onChange}
      multiple
      maxTagCount="responsive"
      dropdownStyle= {{
        backgroundColor: themeMode === "dark" ? "#001529" : "",
        color: themeMode === "dark" ? "white" : "",
      }}
     
      expandIcon={<ArrowRightOutlined className={`${themeMode === 'dark' ? 'text-white' : ''}`}/>} // Aplica el estilo al icono de flecha
      suffixIcon={<ArrowDownOutlined className={`${themeMode === 'dark' ? 'text-white' : ''}`}/>} // Aplica el estilo al icono de flecha
    />
  );
};

export default FilterProvince;

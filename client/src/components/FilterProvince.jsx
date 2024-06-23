import { Cascader } from "antd";
import { selectData } from "@/data/data.js";
import useTheme from "@context/ThemeContext";
import { ArrowRightOutlined, ArrowDownOutlined } from '@ant-design/icons';

const FilterProvince = ({ onChange }) => {
  const { themeMode } = useTheme();

  
  return (
    <Cascader
      className={`${themeMode === 'dark' ? 'dark' : ''}`}
      options={selectData}
      placeholder="Filtros"
      onChange={onChange}
      multiple
      maxTagCount="responsive"
      dropdownStyle= {{
        backgroundColor: themeMode === "dark" ? "#001529" : "",
        color: themeMode === "dark" ? "white" : "",
      }}
     
      expandIcon={<ArrowRightOutlined className={`${themeMode === 'dark' ? 'text-white' : ''}`}/>} 
      suffixIcon={<ArrowDownOutlined className={`${themeMode === 'dark' ? 'text-white' : ''}`}/>} 
    />
  );
};

export default FilterProvince;

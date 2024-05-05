
import { Cascader } from 'antd';
import { locationData } from '@/data/data.js';

const FilterProvince = ({ onChange }) => {
  
  return (
    <Cascader
      options={locationData}
      placeholder='Filtros'
      onChange={onChange}
      multiple
      maxTagCount="responsive"
    />
  );
};

export default FilterProvince;

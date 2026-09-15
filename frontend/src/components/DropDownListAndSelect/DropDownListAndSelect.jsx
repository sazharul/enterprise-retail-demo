import {Select} from "antd";
import cn from "../../utils/cn";
import './DropDownListAndSelect.scss'

const DropDownListAndSelect = ({className, defaultValue, placeholder, options, setSelectedValue, setRemoveValue}) => {
    const onChange = (value, option) => {
        if (value) {
            setSelectedValue({
                selected_item_id: value,
                selected_item_name: option?.label,
            });
            setRemoveValue({});
        }
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <div className="address-select">
            <Select
                className={cn("w-full h-10", className)}
                defaultValue={defaultValue}
                showSearch
                placeholder={placeholder}
                optionFilterProp="children"
                onChange={onChange}
                options={options}
                filterOption={filterOption}
            />
        </div>
    );
};

export default DropDownListAndSelect;

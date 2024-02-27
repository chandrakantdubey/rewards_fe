import { Button } from "@carbon/react";
import { Close, FilterEdit } from "@carbon/icons-react";
import "./filterModal.scss";
import { useDispatch } from "react-redux";
import { toggleFilterOverlay } from "../../redux/toggleSlice/toggleSlice";
export default function FilterModal({
  child1,
  child2,
  child3,
  child4,
  filterFunction,
  clearFilterFunction,
}) {
  const dispatch = useDispatch();
  return (
    <div className="filter__modal">
      <div className="filter__modal__icons">
        <span onClick={() => dispatch(toggleFilterOverlay())}>
          <Close size={20} />
        </span>
        <span onClick={clearFilterFunction} title="Clear Filter">
          <FilterEdit size={20} />
        </span>
      </div>
      {child1 && <div className="filter__modal__dropdown">{child1}</div>}
      {child2 && <div className="filter__modal__dropdown">{child2}</div>}
      {child3 && <div className="filter__modal__dropdown">{child3}</div>}
      {child4 && <div className="filter__modal__dropdown">{child4}</div>}
      <Button kind="primary" onClick={filterFunction}>
        Apply Filters
      </Button>
    </div>
  );
}

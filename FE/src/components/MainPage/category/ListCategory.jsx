import CategoryItem from "./CategoryItem";
import styled from "styled-components";
import PropTypes from "prop-types";

const ListCategory = ({ events }) => {
  if (!events || events.length === 0) {
    return <NoEvents>No events available</NoEvents>;
  }

  return (
    <ListLayout>
      <ListItem>
        {events.map((event) => (
          <CategoryItem key={event.id} {...event} />
        ))}
      </ListItem>
    </ListLayout>
  );
};

ListCategory.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListCategory;

const ListLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const ListItem = styled.div`
  height: auto;
  width: 90%;
  background-color: #fff;
  border-radius: 0.625rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoEvents = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #666;
`;

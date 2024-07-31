import CategoryItem from "./CategoryItem";
import styled from "styled-components";

const ListCategory = ({ events }) => {
  return (
    <ListLayout>
      <ListItem>
        {events.map((event) => {
          return <CategoryItem key={event.id} {...event} />;
        })}
      </ListItem>
    </ListLayout>
  );
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
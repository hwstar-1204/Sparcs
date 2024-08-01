import styled from "styled-components";

const ClassificationCategory = ({ category, onClick, isSelected }) => {
  return (
    <ClassificationLayout>
      <Classification onClick={onClick} isSelected={isSelected}>
        <div>{category}</div>
      </Classification>
    </ClassificationLayout>
  );
};

export default ClassificationCategory;

const ClassificationLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.6875rem;
`;

const Classification = styled.div`
  width: auto;
  height: 1.625rem;
  background-color: ${(props) => (props.isSelected ? "#566CC7" : "#e8e8e8")};
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  div {
    color: ${(props) => (props.isSelected ? "#FFFFFF" : "#a0a0a0")};
    font-size: 0.75rem;
    margin: 0.7rem;
  }
`;

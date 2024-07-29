import styled from "styled-components";

const ClassificationCategory = () => {
  return (
    <ClassificationLayout>
      <Classification>
        <div></div>
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
  width: 3rem;
  height: 1.625rem;
  background-color: #e8e8e8;
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    color: #a0a0a0;
    font-size: 0.75rem;
  }
`;

import styled from "styled-components";

const ClassificationCategory = () => {
  return (
    <ClassificationLayout>
      <Classification>{}</Classification>
    </ClassificationLayout>
  );
};

export default ClassificationCategory;

const ClassificationLayout = styled.div`
  width: 3rem;
  height: 1.625rem;
  background-color: #e8e8e8;
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Classification = styled.div`
  color: #a0a0a0;
  font-size: 0.75rem;
`;

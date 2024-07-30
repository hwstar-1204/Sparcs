import styled from "styled-components";
import { useEffect, useState } from "react";

const ClassificationCategory = ({ category, onClick }) => {
  return (
    <ClassificationLayout>
      <Classification onClick={onClick}>
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
  background-color: #e8e8e8;
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  div {
    color: #a0a0a0;
    font-size: 0.75rem;
    margin: 0.7rem;
  }
`;

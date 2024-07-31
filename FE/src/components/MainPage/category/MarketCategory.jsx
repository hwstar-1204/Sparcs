import styled from "styled-components";
import ClassificationCategory from "./ClassificationCategory";
import ListCategory from "./ListCategory";
import { useEffect, useState } from "react";
import axios from "axios";

const MarketCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://101.79.10.180:8000/store_info/category_list/" +
          selectedCategory +
          "/"
      )
      .then((res) => {
        const fetchedEvents = res.data.map((event) => ({
          id: event.id,
          title: event.name,
          category: event.category,
          address: event.address,
          roadAddress: event.roadAddress,
          telephone: event.telephone,
          link: event.link,
          description: event.description,
          mapx: event.mapx,
          mapy: event.mapy,
        }));
        setEvents(fetchedEvents);
        console.log(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [selectedCategory]);

  return (
    <MarketCategoryLayout>
      <CategoryItem>
        <ClassificationCategory
          category={"떡/전"}
          onClick={() => {
            setSelectedCategory("떡,전");
          }}
        />
        <ClassificationCategory
          category={"분식"}
          onClick={() => {
            setSelectedCategory("분식");
          }}
        />
        <ClassificationCategory
          category={"베이커리"}
          onClick={() => {
            setSelectedCategory("베이커리");
          }}
        />
        <ClassificationCategory
          category={"육류"}
          onClick={() => {
            setSelectedCategory("육류");
          }}
        />
        <ClassificationCategory
          category={"해산물"}
          onClick={() => {
            setSelectedCategory("해산물");
          }}
        />
      </CategoryItem>
      <ListCategory events={events} />
    </MarketCategoryLayout>
  );
};

export default MarketCategory;

const MarketCategoryLayout = styled.div`
  height: 100vh;
  background-color: #f3f4f9;
`;
const CategoryItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

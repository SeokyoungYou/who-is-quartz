import styled from "styled-components";
import { DocumentData } from "@google-cloud/firestore";
const ScrollWrapper = styled.div`
  background-color: white;
  /* width: 500px; */
  display: grid;
  height: 500px;
  grid-template-columns: repeat(5, 1fr);
  align-content: start;
  /* grid-template-columns: repeat(auto-fill, minmax(20%, auto)); */
  grid-gap: 30px;
  border-radius: 10px;
  padding: 10px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  @media screen and (max-width: 500px) {
    height: 300px;
    grid-template-columns: repeat(2, 1fr);
    font-size: 14px;
  }
`;
const UserWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
const UserName = styled.h1`
  @media screen and (max-width: 500px) {
    width: 100px;
  }
`;
const UserScore = styled.h1`
  @media screen and (max-width: 500px) {
    width: 22px;
  }
`;

interface DBResultCompProps {
  users: DocumentData[];
}
const DBResultComp: React.FC<DBResultCompProps> = ({ users }) => {
  return (
    <>
      <ScrollWrapper>
        {users.map((u, i) => {
          return (
            <UserWrapper key={i}>
              <UserName>{u.user}</UserName>
              <UserScore>{u.score} 점</UserScore>
            </UserWrapper>
          );
        })}
      </ScrollWrapper>
    </>
  );
};
export default DBResultComp;

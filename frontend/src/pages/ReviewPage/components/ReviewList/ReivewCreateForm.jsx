import styled from "styled-components";
import tw from "twin.macro";
import { useReducer, useState } from "react";
import axios from "axios";

const ReviewCreateForm = () => {
    const reducer = (state, action) => {
        return {
          ...state,
          [action.name]: action.value,
        };
      };

      const useInputs = (initialForm) => {
        const [state, dispatch] = useReducer(reducer, initialForm);
        const onChange = (e) => {
          dispatch(e.target);
        };
        return [state, onChange];
      };
      const [files, setFiles] = useState([]);
      const [state, onChange] = useInputs({
        subject: "",
        description: "",
        difficultyLevel: "",
        category: "",
        usersVolunteerProjectId: ""
      });

      const {
        subject,
        description,
        difficultyLevel,
        category,
        usersVolunteerProjectId,
      } = state;

      const reviewSubmit = () => {
        let testData = {
            subject: state.subject,
            description: state.description,
            difficultyLevel: state.difficultyLevel,
            category: state.category,
            usersVolunteerProjectId: state.usersVolunteerProjectId,
          };

      const formData = new FormData();
      formData.append(
        "article",
        new Blob([JSON.stringify(testData)], {
          type: "application/json",
        })
      );
      formData.append("file", files);
      console.log('폼데이터',formData);
      axios
        .post("/api/article", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("accessToken"),
            refresh: localStorage.getItem("refreshToken"),
          },
        })
        .then((res) => {
          console.log(res);
          alert("작성되었습니다");
        })
        .catch((error) => {
          const response = error.response.data;
          console.log(response);
        });
    };

        
    return (<>
        <Container>
            <InnerContainer>
                <div>
                    <Heading>인증후기작성</Heading>
                </div>

                <ReviewForm action="#" method="POST">
                    <div>
                    <Heading>글작성</Heading>
                    </div>
                    <InputGroup>
                        <InputDiv>
                        <InputText htmlFor="subject">제목 : </InputText>
                        <ReviewInput
                        id="subject"
                        name="subject"
                        type="text"
                          value={subject}
                          onChange={onChange}
                          />
                        </InputDiv>
                    </InputGroup>
                    <InputGroup>
                        <InputDiv>
                        <InputText htmlFor="description">내용 : </InputText>
                        <ReviewInput
                        id="description"
                        name="description"
                        type="text"
                          value={description}
                          onChange={onChange}
                        />
                        </InputDiv>
                    </InputGroup>
                    <InputGroup>
                    <InputDiv>
                        <InputText htmlFor="difficultyLevel">난이도 </InputText>
                        <ReviewInput
                        id="difficultyLevel"
                        name="difficultyLevel"
                        type="int"
                          value={difficultyLevel}
                          onChange={onChange}
                        />
                        </InputDiv>
                    </InputGroup>
                    <InputGroup>
                    <InputDiv>
                        <InputText htmlFor="category">카테고리 : </InputText>
                        <ReviewInput
                        id="category"
                        name="category"
                        type="text"
                          value={category}
                          onChange={onChange}
                        />
                        </InputDiv>
                    </InputGroup>
                    <InputGroup>
                    <InputDiv>
                        <InputText htmlFor="usersVolunteerProjectId">userVolunteerPJTID : </InputText>
                        <ReviewInput
                        id="usersVolunteerProjectId"
                        name="usersVolunteerProjectId"
                        type="int"
                          value={usersVolunteerProjectId}
                          onChange={onChange}
                        />
                        </InputDiv>
                    </InputGroup>

                    <InputGroup>
                    <div>
                    <Heading>파일 첨부</Heading>
                    </div>
                    {/* <InputText htmlFor="files">files</InputText> */}
                      <ReviewInput
                        id="files"
                        name="files"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            setFiles([...files, e.target.files[0]]);
                            console.log(files);
                          }
                        }}
                      />
                      <ReviewInput
                        id="files"
                        name="files"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            setFiles([...files, e.target.files[0]]);
                            console.log(files);
                          }
                        }}
                      />
                      <ReviewInput
                        id="files"
                        name="files"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            setFiles([...files, e.target.files[0]]);
                            console.log(files);
                          }
                        }}
                      />
                      <ReviewInput
                        id="files"
                        name="files"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            setFiles([...files, e.target.files[0]]);
                            console.log(files);
                          }
                        }}
                      />
                      <ReviewInput
                        id="files"
                        name="files"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            setFiles([...files, e.target.files[0]]);
                            console.log(files);
                          }
                        }}
                      />
                      </InputGroup>

                    <div>
                    <SubmitButton
                      type="submit"
                      onClick={(e) => {
                        console.log(e)
                        e.preventDefault();
                        reviewSubmit();
                      }}
                    >
                      제출하기
                    </SubmitButton>
                  </div>
                </ReviewForm>
            </InnerContainer>
        </Container>

        <hr></hr>

    </>)
}


export default ReviewCreateForm;

const Container = styled.div`
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 
  `}
`;

const InnerContainer = styled.div`
  ${tw`
  w-full max-w-md space-y-8
  `}
`;

const Heading = styled.h2`
  ${tw`
  mt-6 text-center text-3xl font-bold tracking-tight text-gray-900
  `}
`;

const ReviewForm = styled.form`
  ${tw`
  mt-8 space-y-6
  `}
`;

const InputGroup = styled.div`
  ${tw`
  -space-y-px rounded-md shadow-sm
  `}
`;

const InputText = styled.label`
  ${tw`
  block text-sm font-medium leading-6 text-gray-900
  `}
`;

const ReviewInput = styled.input`
  ${tw`
  relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
  
  `}
`;

const InputDiv = styled.div`
    display:flex;
    flex-direction : row;
`

const SubmitButton = styled.button`
  ${tw`
  w-full h-full bg-yellow-600 py-2 px-10 font-semibold text-black
  `}
`;
